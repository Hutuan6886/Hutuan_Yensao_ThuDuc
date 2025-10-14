import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/db";
import { buildChildren } from "../route";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ categoryId: string }> }
) {
  try {
    const { categoryId } = await params;
    const { name, children } = await req.json();
    if (!categoryId) {
      return NextResponse.json(
        { error: "Missing categoryId" },
        { status: 400 }
      );
    }
    if (!name) {
      return NextResponse.json(
        { error: "Missing category name value" },
        { status: 404 }
      );
    }
    const existing = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });
    if (!existing) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }
    const duplicate = await prisma.category.findUnique({
      where: {
        normalizedName: name.trim().toLowerCase(),
      },
    });
    if (duplicate) {
      return NextResponse.json(
        { error: "Category name already exists" },
        { status: 404 }
      );
    }

    const categoryUpdated = await prisma.category.update({
      where: {
        id: categoryId,
      },
      data: {
        name,
        normalizedName: name.trim().toLowerCase(),
        ...(children && children.length > 0
          ? { children: { create: buildChildren(children) } }
          : {}),
      },
      include: {
        children: true,
      },
    });
    return NextResponse.json(categoryUpdated, { status: 200 });
  } catch (error: any) {
    if (error.code === "P2002") {
      // Trường hợp unique constraint failed (phòng ngừa thêm)
      return NextResponse.json({ error: "Duplicate name" }, { status: 400 });
    }
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ categoryId: string }> }
) {
  try {
    const { categoryId } = await params;
    if (!categoryId) {
      return NextResponse.json(
        { error: "Missing categoryId" },
        { status: 400 }
      );
    }
    await prisma.category.delete({
      where: {
        id: categoryId,
      },
    });
    return NextResponse.json({ message: "Category deleted" }, { status: 200 });
  } catch (error: any) {
    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
