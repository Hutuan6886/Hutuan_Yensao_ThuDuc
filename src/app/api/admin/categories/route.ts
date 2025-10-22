import { NextRequest, NextResponse } from "next/server";
import { categoryFormSchema } from "@/app/(routes)/(admin)/admin/categories/_form_schema";
import { z } from "zod";
import { prisma } from "@/lib/db";
import {
  buildChildrenCategoryPost,
  normalize,
} from "./_utils/category.service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = categoryFormSchema.safeParse(body);
    if (!parsed.success) {
      const tree = z.treeifyError(parsed.error);
      return NextResponse.json(
        { error: tree, message: "Invalid input" },
        { status: 400 }
      );
    }
    const { name, children } = parsed.data;
    const duplicate = await prisma.category.findFirst({
      where: {
        normalizedName: normalize(name),
      },
    });
    if (duplicate) {
      return NextResponse.json(
        { error: "Category name already exists" },
        { status: 403 }
      );
    }
    const newCategory = await prisma.category.create({
      data: {
        name,
        normalizedName: normalize(name),
        ...(children && children.length > 0
          ? { children: { create: buildChildrenCategoryPost(children) } }
          : {}),
      },
      include: {
        children: true,
      },
    });
    return NextResponse.json(newCategory, { status: 201 });
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Category already exists" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
