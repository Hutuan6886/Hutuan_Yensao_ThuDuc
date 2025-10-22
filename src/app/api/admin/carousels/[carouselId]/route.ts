import { NextRequest, NextResponse } from "next/server";
import { carouselFormSchema } from "@/app/(routes)/(admin)/admin/carousels/_form_schema";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { deleteImage } from "@/lib/r2-client";

export async function PUT(
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
      include: { image: true },
    });
    if (!existing) {
      return NextResponse.json(
        { error: "Carousel not found" },
        { status: 404 }
      );
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
    const {
      image: { href, alt },
      url,
    } = parsed.data;
    if (
      existing.image.href === href &&
      existing.image.alt === alt &&
      existing.url === url
    ) {
      return NextResponse.json(
        { message: "No changes detected" },
        { status: 200 }
      );
    }

    const updatedCarousel = await prisma.$transaction(async (tx) => {
      // If image href has changed, delete the old image from Cloudflare R2
      if (existing.image.href !== href && existing.imageId) {
        await deleteImage(existing.image.href);
        // Update image record in DB
        await tx.image.update({
          where: { id: existing.imageId },
          data: { href, alt },
        });
      } else if (existing.image.alt !== alt && existing.imageId) {
        // Only alt text changed, update alt text in DB
        await tx.image.update({
          where: { id: existing.imageId },
          data: { alt },
        });
      }
      // Update carousel record in DB
      return await tx.carousel.update({
        where: { id: carouselId },
        data: { url },
        include: { image: true },
      });
    });

    return NextResponse.json(updatedCarousel, { status: 200 });
  } catch (error) {
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
      include: { image: true },
    });
    if (!existing) {
      return NextResponse.json(
        { error: "Carousel not found" },
        { status: 404 }
      );
    }
    // Delete Image Cloudflare
    await deleteImage(existing.image.href);
    // Delete carousel and image of carousel (Xóa Carousel trước mới xóa image bởi vì Carousel vẫn đang referencing imageId)
    await prisma.$transaction(async (tx) => {
      await tx.carousel.delete({ where: { id: carouselId } });
      await tx.image.delete({ where: { id: existing.imageId } });
    });
    return NextResponse.json({ message: "Carousel deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
