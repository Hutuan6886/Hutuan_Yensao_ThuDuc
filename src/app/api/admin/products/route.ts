import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { productFormSchema } from "@/app/(routes)/(admin)/admin/products/_form schema";
import { deleteImage, moveImage } from "@/lib/r2-client";
import backgroundJob from "../../_helpers";

export async function POST(req: NextRequest) {
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
  try {
    const productCreated = await prisma.$transaction(async (tx) => {
      const product = await tx.product.create({
        data: {
          label,
          category: {
            connect: { id: category.id },
          },
          images: {
            create: images.map((img) => ({
              href: img.href,
              alt: img.alt,
            })),
          },
          productMass: {
            create: productMass.map((mass) => ({
              price: mass.price,
              discount: mass.discount,
              mass: { connect: { id: mass.massId } },
            })),
          },
          notion: {
            create: notion.map((n) => ({
              title: n.title,
              content: n.content,
            })),
          },
          description: {
            create: description.map((d) => ({
              title: d.title,
              content: d.content,
              image: d.image
                ? {
                    create: {
                      href: d.image.href,
                      alt: d.image.alt,
                    },
                  }
                : undefined,
            })),
          },
        },
        select: {
          images: true,
          description: {
            include: { image: true },
          },
        },
      });
      return product;
    });
    backgroundJob(async () => {
      // Move all product images và description images nếu có
      await Promise.all([
        ...productCreated.images.map(async (img) => {
          const newHref = await moveImage(img.href);
          return prisma.image.update({
            where: { id: img.id },
            data: { href: newHref },
          });
        }),
        ...productCreated.description
          .filter((d) => d.image)
          .map(async (d) => {
            const newHref = await moveImage(d.image!.href);
            return prisma.image.update({
              where: { id: d.image!.id },
              data: { href: newHref },
            });
          }),
      ]);
      // Xóa image cũ trong /temp
      await Promise.all([
        ...images.map((img) => deleteImage(img.href)),
        ...description
          .filter((d) => d.image)
          .map((d) => deleteImage((d.image as { href: string }).href)),
      ]);
    });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    backgroundJob(async () => {
      await Promise.all([
        ...images.map((img) => deleteImage(img.href)),
        ...description
          .filter((d) => d.image)
          .map((d) => deleteImage(d.image!.href)),
      ]);
    });
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
