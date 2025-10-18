"use server";
import { prisma } from "@/lib/db";
import { CategoryType } from "@/types";

export async function getCategories(): Promise<CategoryType[]> {
  return prisma.category.findMany({
    where: {
      parentId: null,
    },
    include: {
      children: {
        include: {
          children: true,
        },
      },
    },
  });
}

export async function getCategoryById(
  id: string
): Promise<CategoryType | null> {
  return prisma.category.findUnique({
    where: {
      id,
    },
    /*Prisma không hỗ trợ include đệ quy vô hạn, nên chỉ có thể include thủ công - 3 cấp*/
    include: {
      children: {
        include: {
          children: true,
        },
      },
    },
  });
}
