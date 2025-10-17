"use server";
import { prisma } from "@/lib/db";
import { Mass } from "@prisma/client";

export async function getMasses(): Promise<Mass[]> {
  return prisma.mass.findMany({
    orderBy: {
      value: "asc",
    },
  });
}

export async function getMassById(id: string): Promise<Mass | null> {
  return prisma.mass.findUnique({
    where: {
      id,
    },
    include: {
      productMass: true,
    },
  });
}
