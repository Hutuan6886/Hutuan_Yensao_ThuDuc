import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { blogFormSchema } from "@/app/(routes)/(admin)/admin/blogs/_form_schema";
import { prisma } from "@/lib/db";
import { deleteImage, moveImage } from "@/lib/r2-client";
import backgroundJob from "@/app/api/_helpers";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ blogId: string }> }
) {
  const { blogId } = await params;
  if (!blogId) {
    return NextResponse.json({ error: "Missing blogId" }, { status: 400 });
  }
  const existing = await prisma.blog.findUnique({
    where: { id: blogId },
    select: { thumbnail: true },
  });
  if (!existing) {
    return NextResponse.json({ error: "Blog not found" }, { status: 404 });
  }
  const body = await req.json();
  const parsed = blogFormSchema.safeParse(body);
  if (!parsed.success) {
    const tree = z.treeifyError(parsed.error);
    return NextResponse.json(
      { error: tree, message: "Invalid input" },
      { status: 400 }
    );
  }
  const { title, thumbnail, content } = parsed.data;
  if (!thumbnail) {
    return NextResponse.json({ error: "Missing thumbnail" }, { status: 400 });
  }
  try {
    await prisma.$transaction(async (tx) => {
      // 1️⃣ Cập nhật title và content trước
      await tx.blog.update({
        where: { id: blogId },
        data: { title, content },
      });

      // 2️⃣ Nếu thumbnail thay đổi ID
      if (thumbnail.id !== existing.thumbnail!.id) {
        // Xóa ảnh cũ
        await tx.image.delete({
          where: { id: existing.thumbnail!.id },
        });

        // Tạo ảnh mới
        await tx.image.create({
          data: {
            id: thumbnail.id,
            href: thumbnail.href,
            alt: thumbnail.alt,
            blog: { connect: { id: blogId } },
          },
        });
      } else {
        // Nếu chỉ sửa thông tin alt/href
        await tx.image.update({
          where: { id: thumbnail.id },
          data: { href: thumbnail.href, alt: thumbnail.alt },
        });
      }
    });
    const response = NextResponse.json(
      { success: true, blogId },
      { status: 200 }
    );
    backgroundJob(async () => {
      // Move new image from /temp to /blog
      const newhRef = await moveImage(thumbnail.href);
      await prisma.image.update({
        where: { id: existing.thumbnail!.id },
        data: { href: newhRef, alt: thumbnail.alt },
      });
      // Xóa image ở temp
      await deleteImage(thumbnail.href);
    });
    return response;
  } catch (error) {
    backgroundJob(async () => {
      // thêm includes để tránh xóa nhầm href nếu fail mà giá trị href ng dùng không thay đổi?
      if (thumbnail.href.includes("/temp")) await deleteImage(thumbnail.href);
    });
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ blogId: string }> }
) {
  try {
    const { blogId } = await params;
    if (!blogId) {
      return NextResponse.json({ error: "Missing blogId" }, { status: 400 });
    }
    const existing = await prisma.blog.findUnique({
      where: { id: blogId },
      select: { thumbnail: true },
    });
    if (!existing) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    // Delete carousel and image of carousel (Xóa Carousel trước mới xóa image bởi vì Carousel vẫn đang referencing imageId)
    await prisma.carousel.delete({ where: { id: blogId } });
    backgroundJob(async () => {
      // Delete Image Cloudflare
      await deleteImage(existing.thumbnail!.href);
    });
    return NextResponse.json({ message: "Blog deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
