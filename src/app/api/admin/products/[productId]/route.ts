import { NextRequest, NextResponse } from "next/server";
import { productFormSchema } from "@/app/(routes)/(admin)/admin/products/_form schema";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { deleteImage, moveImage, uploadImage } from "@/lib/r2-client";

/*
- Ưu điểm:
+ Code đơn giản, dễ đọc, dễ maintain.
+ Dữ liệu DB luôn khớp với client, dễ debug.
+ Phù hợp với các trường hợp update toàn bộ (ví dụ user chỉnh sửa hẳn một sản phẩm, xóa ảnh cũ, thêm ảnh mới).
- Nhược điểm:
+ DB transaction lớn hơn: mỗi lần update → delete + create tất cả records, bất kể thay đổi nhiều hay ít.
+ Không giữ ID cũ → ảnh mới, notion mới, productMass mới sẽ có ID mới, không thể giữ lịch sử (audit) hay relation khác (nếu có).
+ Nếu sản phẩm nhiều ảnh, nhiều description → transaction nặng → client sẽ chờ lâu hơn.
+ Complexity tính toán thấp (O(n) cho map delete + create), nhưng DB phải xử lý toàn bộ delete + insert → I/O cao.
*/
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  const { productId } = await params;
  if (!productId)
    return NextResponse.json({ error: "Missing productId" }, { status: 400 });

  const existing = await prisma.product.findFirst({
    where: { id: productId },
    include: {
      category: true,
      images: true,
      productMass: true,
      notion: true,
      description: { include: { image: true } },
    },
  });
  if (!existing)
    return NextResponse.json({ error: "Product not found" }, { status: 404 });

  const body = await req.json();
  const parsed = productFormSchema.safeParse(body);
  if (!parsed.success) {
    const tree = z.treeifyError(parsed.error);
    return NextResponse.json(
      { error: tree, message: "Invalid input" },
      { status: 400 }
    );
  }

  const { label, images, category, productMass, notion, description } =
    parsed.data;

  // Lưu tất cả href cũ để xóa sau khi update DB thành công
  const oldProductImages = existing.images.map((img) => img.href);
  const oldDescImages = existing.description
    .map((d) => d.image?.href)
    .filter(Boolean) as string[];

  try {
    // 1. Transaction update DB
    const productUpdated = await prisma.$transaction(async (tx) => {
      return tx.product.update({
        where: { id: productId },
        data: {
          label,
          category: { connect: { id: category.id } },
          images: {
            deleteMany: {},
            create: images.map((img) => ({ href: img.href, alt: img.alt })),
          },
          productMass: {
            deleteMany: {},
            create: productMass.map((mass) => ({
              price: mass.price,
              discount: mass.discount,
              mass: { connect: { id: mass.massId } },
            })),
          },
          notion: {
            deleteMany: {},
            create: notion.map((n) => ({ title: n.title, content: n.content })),
          },
          description: {
            deleteMany: {},
            create: description.map((d) => ({
              title: d.title,
              content: d.content,
              image: d.image
                ? { create: { href: d.image.href, alt: d.image.alt } }
                : undefined,
            })),
          },
        },
        include: {
          category: true,
          images: true,
          productMass: true,
          notion: true,
          description: { include: { image: true } },
        },
      });
    });

    // 2. Xóa hình cũ trên Cloudflare (không còn trong danh sách mới)
    const newImageHrefs = images.map((img) => img.href);
    const newDescHrefs = description
      .map((d) => d.image?.href)
      .filter(Boolean) as string[];
    const imagesToDelete = oldProductImages.filter(
      (href) => !newImageHrefs.includes(href)
    );
    const descImagesToDelete = oldDescImages.filter(
      (href) => !newDescHrefs.includes(href)
    );
    await Promise.all([
      ...imagesToDelete.map((href) => deleteImage(href)),
      ...descImagesToDelete.map((href) => deleteImage(href)),
    ]);

    // 3. Move hình mới từ /temp → folder chính
    const moveTasks: Promise<void>[] = [];
    productUpdated.images.forEach((img) => {
      moveTasks.push(
        (async () => {
          try {
            const newHref = await moveImage(img.href);
            await prisma.image.update({
              where: { id: img.id },
              data: { href: newHref },
            });
          } catch (err) {
            console.error("Failed to move product image", img.href, err);
          }
        })()
      );
    });

    productUpdated.description.forEach((desc) => {
      if (desc.image) {
        moveTasks.push(
          (async () => {
            try {
              const newHref = await moveImage(desc.image!.href);
              await prisma.image.update({
                where: { id: desc.image!.id },
                data: { href: newHref },
              });
            } catch (err) {
              console.error(
                "Failed to move description image",
                desc.image!.href,
                err
              );
            }
          })()
        );
      }
    });

    await Promise.all(moveTasks);

    // 4. Xóa temp images
    await Promise.all([
      ...images.map((img) => deleteImage(img.href)),
      ...description
        .filter((d) => d.image)
        .map((d) => deleteImage(d.image!.href)),
    ]);

    return NextResponse.json(productUpdated, { status: 200 });
  } catch (error) {
    // Nếu transaction fail → dọn sạch temp images
    await Promise.all([
      ...images.map((img) => deleteImage(img.href)),
      ...description
        .filter((d) => d.image)
        .map((d) => deleteImage(d.image!.href)),
    ]);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const { productId } = await params;
    if (!productId) {
      return NextResponse.json(
        { error: "Missing categoryId" },
        { status: 400 }
      );
    }
    const existing = await prisma.product.findFirst({
      where: { id: productId },
      include: {
        images: true,
        description: {
          include: {
            image: true,
          },
        },
      },
    });
    if (!existing) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    await prisma.product.delete({
      where: {
        id: productId,
      },
    });
    await Promise.all([
      await Promise.all(existing.images.map((img) => deleteImage(img.href))),
      await Promise.all(
        existing.description.map((d) => {
          if (d.image) deleteImage(d.image.href);
        })
      ),
    ]);
    return NextResponse.json({ message: "Product deleted" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

/*
- Ưu điểm:
+ DB xử lý ít hơn: chỉ delete/create những record thực sự thay đổi → transaction nhỏ hơn → nhanh hơn.
+ Giữ lại ID cũ nếu không đổi → lịch sử, relation khác không bị mất.
+ Tối ưu khi chỉ update một vài field (thêm 1 ảnh, sửa 1 notion) → client nhận response nhanh hơn.
- Nhược điểm:
+ Tính toán diff bên JS → phải map/filter qua array → time complexity tăng: O(n*m) cho mỗi relation, nếu n là số record cũ, m là số record mới.
+ Nếu sản phẩm có nhiều record (ví dụ 50+ ảnh, 20+ description), diff calculation bên JS có thể tốn CPU client/server hơn.
+ Code phức tạp hơn → khó maintain.*/
/*
// Helper xóa ảnh trong Cloudflare, chỉ dùng sau khi DB transaction thành công
async function deleteImages(hrefs: string[]) {
  await Promise.all(hrefs.map(deleteImage));
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const { productId } = await params;
    if (!productId) {
      return NextResponse.json({ error: "Missing productId" }, { status: 400 });
    }

    const existing = await prisma.product.findFirst({
      where: { id: productId },
      include: {
        category: true,
        images: true,
        productMass: true,
        notion: true,
        description: { include: { image: true } },
      },
    });

    if (!existing) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const body = await req.json();
    const parsed = productFormSchema.safeParse(body);

    if (!parsed.success) {
      const treeError = z.treeifyError(parsed.error);
      return NextResponse.json(
        { error: treeError, message: "Invalid input" },
        { status: 400 }
      );
    }

    const { label, images, category, productMass, notion, description } = parsed.data;

    // Tính toán diff cho images
    const oldImages = existing.images;
    const oldImageHrefs = oldImages.map((i) => i.href);
    const toDeleteImages = oldImages.filter((i) => !images.some((n) => n.href === i.href));
    const toCreateImages = images.filter((n) => !oldImageHrefs.includes(n.href));

    // Tính toán diff cho description
    const oldDescriptions = existing.description;
    const toDeleteDescriptions = oldDescriptions.filter(
      (d) => !description.some((n) => n.title === d.title && n.content === d.content)
    );
    const toCreateDescriptions = description.filter(
      (n) =>
        !oldDescriptions.some((d) => d.title === n.title && d.content === n.content)
    );

    // Tính toán diff cho productMass
    const oldMassIds = existing.productMass.map((m) => m.id);
    const toDeleteMass = oldMassIds.map((id) => ({ id }));
    const toCreateMass = productMass.map((m) => ({
      price: m.price,
      discount: m.discount,
      mass: { connect: { id: m.massId } },
    }));

    // Tính toán diff cho notion
    const oldNotionIds = existing.notion.map((n) => n.id);
    const toDeleteNotion = oldNotionIds.map((id) => ({ id }));
    const toCreateNotion = notion.map((n) => ({ title: n.title, content: n.content }));

    // Transaction Prisma
    const updatedProduct = await prisma.$transaction(async (tx) => {
      const product = await tx.product.update({
        where: { id: productId },
        data: {
          label,
          category: { connect: { id: category.id } },
          images: {
            delete: toDeleteImages.map((i) => ({ id: i.id })),
            create: toCreateImages,
          },
          description: {
            delete: toDeleteDescriptions.map((d) => ({ id: d.id })),
            create: toCreateDescriptions.map((d) => ({
              title: d.title,
              content: d.content,
              image: d.image
                ? { create: { href: d.image.href, alt: d.image.alt } }
                : undefined,
            })),
          },
          productMass: {
            delete: toDeleteMass,
            create: toCreateMass,
          },
          notion: {
            delete: toDeleteNotion,
            create: toCreateNotion,
          },
        },
        include: {
          category: true,
          images: true,
          productMass: true,
          notion: true,
          description: { include: { image: true } },
        },
      });

      return product;
    });

    // Xóa ảnh Cloudflare **sau khi transaction thành công**
    await deleteImages([
      ...toDeleteImages.map((i) => i.href),
      ...toDeleteDescriptions
        .filter((d) => d.image)
        .map((d) => d.image!.href),
    ]);

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
*/
