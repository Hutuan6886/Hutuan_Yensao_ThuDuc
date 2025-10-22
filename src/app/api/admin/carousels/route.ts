import { NextRequest, NextResponse } from "next/server";
import { carouselFormSchema } from "@/app/(routes)/(admin)/admin/carousels/_form_schema";
import { z } from "zod";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
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
    const newCarousel = await prisma.carousel.create({
      data: {
        image: { create: { href: image.href, alt: image.alt } },
        url,
      },
    });
    return NextResponse.json(newCarousel, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
