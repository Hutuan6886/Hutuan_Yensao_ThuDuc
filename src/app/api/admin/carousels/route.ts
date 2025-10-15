import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const {
      image: { href, alt },
      url,
    } = await req.json();
    if (!href || !alt) {
      return NextResponse.json({ error: "Missing image" }, { status: 400 });
    }
    if (!url) {
      return NextResponse.json({ error: "Missing url" }, { status: 400 });
    }
    const newCarousel = await prisma.carousel.create({
      data: {
        image: { create: { href, alt } },
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
