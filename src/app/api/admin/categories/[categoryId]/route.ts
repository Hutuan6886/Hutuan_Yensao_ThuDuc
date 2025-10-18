import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { Category } from "@prisma/client";
import { CategoryType } from "@/types";
import {
  buildChildrenCategoryPut,
  normalize,
} from "../_utils/category.service";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ categoryId: string }> }
) {
  /*
  Khi client gửi một object category parent (có name và children)
    - Cập nhật parent name (nếu đổi).
    - Với children ở request:
      + Nếu child mới → create.
      + Nếu child tồn tại → update.
      + Nếu child bị xóa (không còn nằm trong request) → delete.
    Không để duplicate (vì normalizedName là @unique).
    Giới hạn depth tối đa là 3 cấp (parent -> child -> grandchild).
  */
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
      include: {
        children: {
          include: {
            children: true,
          },
        },
      },
    });
    if (!existing) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }
    /*Check input children with existing children to get items for creating, updating or deleting
    - DB hiện có [A, B, C].
    - Request gửi [B, C, D].
    --> toCreate = [D], toUpdate = [B, C], toDelete = [A].
    */
    //* Tạo mới các phần tử children có id không trùng với các id hoặc (normalizedName) của các phần tử trong DB
    const toCreate = children.filter(
      (ic: CategoryType) =>
        !existing.children.some((ec) => ec.normalizedName === ic.normalizedName)
    );
    //* Cập nhật các phần tử gửi lên khi có id trùng với các phần tử  id của children trong DB
    const toUpdate = children.filter((ic: CategoryType) =>
      existing.children.some((ec) => ec.id === ic.id)
    );
    //* Xóa đi các phần tử trong DB có id không trùng với các id của children từ client gửi lên (vì nếu trong DB còn tồn tại phần tử có id không khớp với client, thì phần tử trong DB đó là rác)
    const toDelete = existing.children.filter(
      (ec) => !children.some((ic: CategoryType) => ic.id === ec.id)
    );

    const updated = await prisma.category.update({
      where: {
        id: categoryId,
      },
      data: {
        name,
        normalizedName: normalize(name),
        children: {
          create: toCreate.map((c: CategoryType) =>
            buildChildrenCategoryPut(c)
          ),
          update: toUpdate.map((c: CategoryType) => ({
            where: {
              id: c.id,
            },
            data: {
              name: c.name,
              normalizedName: c.normalizedName,
              // optionally handle grandchildren here
              children:
                c.children && c.children.length
                  ? {
                      upsert: c.children.map((gc) => ({
                        where: { id: gc.id ?? "" }, // hoặc normalizedName nếu unique trong cùng parent
                        update: {
                          name: gc.name,
                          normalizedName: normalize(gc.name),
                        },
                        create: buildChildrenCategoryPut(gc),
                      })),
                    }
                  : undefined,
            },
          })),
          delete: toDelete.map((c: any) => ({
            id: c.id,
          })),
        },
      },
      include: {
        children: true,
      },
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (error: any) {
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
