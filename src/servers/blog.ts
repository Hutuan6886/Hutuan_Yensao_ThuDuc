"use server";
import { prisma } from "@/lib/db";
import { BlogType } from "@/types";

export async function getBlogs(): Promise<BlogType[]> {
  return prisma.blog.findMany({
    include: { thumbnail: true },
    orderBy: { createdAt: "asc" },
  });
}
export async function getBlogById(id: string): Promise<BlogType | null> {
  return prisma.blog.findFirst({
    where: { id },
    include: {
      thumbnail: true,
    },
  });
}
