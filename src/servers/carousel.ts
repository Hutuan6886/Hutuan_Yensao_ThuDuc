"use server";
import { prisma } from "@/lib/db";
import { CarouselType } from "@/types";

export async function getCarousels(): Promise<CarouselType[]> {
  return prisma.carousel.findMany({
    include: { image: true },
    orderBy: { createdAt: "asc" },
  });
}
export async function getCarouselById(id: string): Promise<CarouselType | null> {
  return prisma.carousel.findFirst({
    where: { id },
    include: {
      image: true,
    },
  });
}
