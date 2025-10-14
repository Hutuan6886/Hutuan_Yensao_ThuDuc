"use server";
import { prisma } from "@/libs/db";
import { CategoryWithSub } from "@/types";

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
