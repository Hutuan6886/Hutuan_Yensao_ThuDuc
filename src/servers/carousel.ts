"use server";
import { prisma } from "@/lib/db";
import { CarouselWithImage } from "@/types";

export async function getCarousels(): Promise<CarouselWithImage[]> {
  return prisma.carousel.findMany({
    include: { image: true },
    orderBy: { createdAt: "asc" },
  });
}
export async function getCarouselById(
  id: string
): Promise<CarouselWithImage | null> {
  return prisma.carousel.findFirst({
    where: { id },
    include: {
      image: true,
    },
  });
}
