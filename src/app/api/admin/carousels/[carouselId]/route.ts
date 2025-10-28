import { NextRequest, NextResponse } from "next/server";
import { carouselFormSchema } from "@/app/(routes)/(admin)/admin/carousels/_form_schema";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { deleteImage, moveImage } from "@/lib/r2-client";
import backgroundJob from "@/app/api/_helpers";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ carouselId: string }> }
) {
  const { carouselId } = await params;
  if (!carouselId) {
    return NextResponse.json({ error: "Missing carouselId" }, { status: 400 });
  }
  const existing = await prisma.carousel.findUnique({
    where: { id: carouselId },
    include: { image: true },
  });
  if (!existing) {
    return NextResponse.json({ error: "Carousel not found" }, { status: 404 });
  }
  const body = await req.json();
  const parsed = carouselFormSchema.safeParse(body);
  if (!parsed.success) {
    const tree = z.treeifyError(parsed.error);
    return NextResponse.json(
      { error: tree, message: "Invalid input" },
      { status: 400 }
    );
  }
  const { image, url } = parsed.data;
  if (!image) {
    return NextResponse.json({ error: "Missing image" }, { status: 400 });
  }

  if (
    existing.image!.href === image.href &&
    existing.image!.alt === image.alt &&
    existing.url === url
  ) {
    return NextResponse.json(
      { message: "No changes detected" },
      { status: 200 }
    );
  }
  try {
    await prisma.$transaction(async (tx) => {
      // If image href has changed, delete the old image from Cloudflare R2
      if (existing.image && existing.image.href !== image.href) {
        // Update new image record in DB
        await tx.image.update({
          where: { id: existing.image.id },
          data: { href: image.href, alt: image.alt },
        });
      } else if (existing.image && existing.image.alt !== image.alt) {
        // Only alt text changed, update alt text in DB
        await tx.image.update({
          where: { id: existing.image.id },
          data: { alt: image.alt },
        });
      }
      // Update carousel record in DB
      const carousel = await tx.carousel.update({
        where: { id: carouselId },
        data: { url },
      });
      return carousel;
    });
    const response = NextResponse.json(
      { success: true, carouselId },
      { status: 200 }
    );
    backgroundJob(async () => {
      // Move new image from /temp to /carousel
      const newhRef = await moveImage(image.href);
      await prisma.image.update({
        where: { id: existing.image!.id },
        data: { href: newhRef, alt: image.alt },
      });
      // Xóa image ở temp
      await deleteImage(image.href);
    });
    return response;
  } catch (error) {
    backgroundJob(async () => {
      // thêm includes để tránh xóa nhầm href nếu fail mà giá trị href ng dùng không thay đổi?
      if (image.href.includes("/temp")) await deleteImage(image.href);
    });
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ carouselId: string }> }
) {
  try {
    const { carouselId } = await params;
    if (!carouselId) {
      return NextResponse.json(
        { error: "Missing carouselId" },
        { status: 400 }
      );
    }
    const existing = await prisma.carousel.findUnique({
      where: { id: carouselId },
      select: { image: true },
    });
    if (!existing) {
      return NextResponse.json(
        { error: "Carousel not found" },
        { status: 404 }
      );
    }
    // Delete carousel and image of carousel (Xóa Carousel trước mới xóa image bởi vì Carousel vẫn đang referencing imageId)
    await prisma.carousel.delete({ where: { id: carouselId } });
    backgroundJob(async () => {
      // Delete Image Cloudflare
      await deleteImage(existing.image!.href);
    });
    return NextResponse.json({ message: "Carousel deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
