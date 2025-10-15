"use server";
import { prisma } from "@/lib/db";
import { CategoryWithSub } from "@/types";

export async function getCategories(): Promise<CategoryWithSub[]> {
  return prisma.category.findMany({
    where: {
      parentId: null,
    },
    include: {
      parent: true,
      children: {
        include: {
          parent: true,
          children: {
            include: {
              parent: true,
              children: true,
            },
          },
        },
      },
    },
  });
}

export async function getCategoryById(
  id: string
): Promise<CategoryWithSub | null> {
  return prisma.category.findUnique({
    where: {
      id,
    },
    /*Prisma không hỗ trợ include đệ quy vô hạn, nên chỉ có thể include thủ công - 3 cấp*/
    include: {
      parent: true,
      children: {
        include: {
          parent: true,
          children: {
            include: {
              parent: true,
              children: true,
            },
          },
        },
      },
    },
  });
}
