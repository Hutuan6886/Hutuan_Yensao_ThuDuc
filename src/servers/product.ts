import { prisma } from "@/lib/db";
import { ProductType } from "@/types";

export async function getProducts(): Promise<ProductType[]> {
  return prisma.product.findMany({
    include: {
      images: {
        orderBy: {
          index: "asc",
        },
      },
      category: {
        include: {
          children: {
            include: {
              children: true,
            },
          },
        },
      },
      productMass: {
        include: {
          mass: true,
        },
        orderBy: {
          price: "asc",
        },
      },
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
      images: {
        orderBy: {
          index: "asc",
        },
      },
      category: {
        include: {
          children: {
            include: {
              children: true,
            },
          },
        },
      },
      productMass: {
        orderBy: {
          price: "asc",
        },
      },
      notion: true,
      description: {
        include: { image: true },
      },
    },
  });
}
