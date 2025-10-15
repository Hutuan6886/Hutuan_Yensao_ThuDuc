import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { name, children } = await req.json();
    if (!name) {
      return NextResponse.json(
        { error: "Missing category name" },
        { status: 400 }
      );
    }
    const newCategory = await prisma.category.create({
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

export function buildChildren(
  children?: { name: string; children?: any[] }[]
): any {
  // Recursive
  // Check cấp con ở children để đảm bảo children là 1 [], không null hay undefine
  if (!children || children.length === 0) return []; // trả về array rỗng nếu null
  return children.map((child) => ({
    name: child.name,
    normalizedName: child.name.trim().toLowerCase(),
    ...(child.children && child.children.length > 0
      ? { children: { create: buildChildren(child.children) } }
      : {}),
  }));
}
