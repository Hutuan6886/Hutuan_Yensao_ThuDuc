import { prisma } from "@/lib/db";
import { ProductType } from "@/types";

export async function getProducts(): Promise<ProductType[]> {
  return prisma.product.findMany({
    include: {
      images: true,
      category: {
        include: {
          children: {
            include: {
              children: true,
            },
          },
        },
      },
      productMass: true,
      notion: true,
      description: {
        include: { image: true },
      },
    },
  });
}

export async function getProductById(id: string): Promise<ProductType | null> {
  return prisma.product.findFirst({
    where: {
      id,
    },
    include: {
      images: true,
      category: {
        include: {
          children: {
            include: {
              children: true,
            },
          },
        },
      },
      productMass: true,
      notion: true,
      description: {
        include: { image: true },
      },
    },
  });
}
