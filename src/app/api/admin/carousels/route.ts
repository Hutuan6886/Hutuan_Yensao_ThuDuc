import { NextRequest, NextResponse } from "next/server";
import { carouselFormSchema } from "@/app/(routes)/(admin)/admin/carousels/_form_schema";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { deleteImage, moveImage } from "@/lib/r2-client";
import backgroundJob from "../../_helpers";

export async function POST(req: NextRequest) {
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
  try {
    // Tạo carousel
    const carousel = await prisma.carousel.create({
      data: {
        image: { create: { href: image.href, alt: image.alt } },
        url,
      },
      select: {
        id: true,
        image: true,
      },
    });
    const response = NextResponse.json(
      { message: "Carousel created", carouselId: carousel.id },
      { status: 201 }
    );
    // Return respose rồi xử lý clouflare trong background
    backgroundJob(async () => {
      // Carousel tạo thành công thì di chuyển image từ temp tới folder chính trên cloudflare
      const newhRef = await moveImage(image.href);
      // Cập nhật lại href của carousel sau khi di chuyển
      await prisma.image.update({
        where: {
          id: carousel.image!.id,
        },
        data: {
          href: newhRef,
        },
      });
      // Xóa image ở temp
      await deleteImage(image.href);
    });
    return response;
  } catch (error) {
    backgroundJob(async () => {
      // Nếu transaction fail, xóa ảnh trong temp để tránh rác
      if (image) await deleteImage(image.href);
    });
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
