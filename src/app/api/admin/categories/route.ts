import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import {
  buildChildrenCategoryPost,
  normalize,
} from "./_utils/category.service";

export async function POST(req: NextRequest) {
  try {
    const { name, children } = await req.json();
    if (!name) {
      return NextResponse.json(
        { error: "Missing category name" },
        { status: 400 }
      );
    }
    const duplicate = await prisma.category.findFirst({
      where: {
        normalizedName: normalize(name),
      },
    });
    if (duplicate) {
      return NextResponse.json(
        { error: "Category name already exists" },
        { status: 404 }
      );
    }
    console.log({ name, children });
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
