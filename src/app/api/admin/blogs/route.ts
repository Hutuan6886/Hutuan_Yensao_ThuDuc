import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { blogFormSchema } from "@/app/(routes)/(admin)/admin/blogs/_form_schema";
import backgroundJob from "../../_helpers";
import { deleteImage, moveImage } from "@/lib/r2-client";

export async function POST(req: NextRequest) {
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
    const blog = await prisma.blog.create({
      data: {
        title,
        thumbnail: {
          create: {
            id: thumbnail.id,
            href: thumbnail.href,
            alt: thumbnail.alt,
          },
        },
        content,
      },
      select: {
        id: true,
        thumbnail: true,
      },
    });
    const response = NextResponse.json(
      { message: "Blog created", blogId: blog.id },
      { status: 201 }
    );
    // Return respose rồi xử lý clouflare trong background
    backgroundJob(async () => {
      // Carousel tạo thành công thì di chuyển image từ temp tới folder chính trên cloudflare
      const newhRef = await moveImage(thumbnail.href);
      // Cập nhật lại href của carousel sau khi di chuyển
      await prisma.image.update({
        where: {
          id: blog.thumbnail!.id,
        },
        data: {
          href: newhRef,
        },
      });
      // Xóa image ở temp
      await deleteImage(thumbnail.href);
    });
    return response;
  } catch (error: any) {
    backgroundJob(async () => {
      // Nếu transaction fail, xóa ảnh trong temp để tránh rác
      if (thumbnail) await deleteImage(thumbnail.href);
    });
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const { blogId } = await req.json();
  if (!Array.isArray(blogId) || blogId.length === 0) {
    return NextResponse.json({ error: "Missing blog ids" }, { status: 400 });
  }
  const blogs = await prisma.blog.findMany({
    where: { id: { in: blogId } },
    select: {
      thumbnail: true,
    },
  });
  const arrayThumbnailsNeedToDelete:string[] = []
  for(const blog of blogs){
    if(blog.thumbnail) arrayThumbnailsNeedToDelete.push(blog.thumbnail.href)
  }
  try {
    await prisma.$transaction(async (tx) => {
      await tx.blog.deleteMany({
        where: {
          id: { in: blogId },
        },
      });
    });
    backgroundJob(async () => {
      await Promise.all(arrayThumbnailsNeedToDelete.map((img) => deleteImage(img)));
    });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
