import { NextRequest, NextResponse } from "next/server";
import { massFormSchema } from "@/app/(routes)/(admin)/admin/masses/_form_schema";
import { z } from "zod";
import { prisma } from "@/lib/db";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ massId: string }> }
) {
  try {
    const { massId } = await params;
    if (!massId) {
      return NextResponse.json({ error: "Missing massId" }, { status: 404 });
    }
    const body = await req.json();
    const parsed = massFormSchema.safeParse(body);
    if (!parsed.success) {
      const tree = z.treeifyError(parsed.error);
      return NextResponse.json(
        { error: tree, message: "Invalid input" },
        { status: 400 }
      );
    }
    const { value } = parsed.data;
    const mass = await prisma.mass.update({
      where: {
        id: massId,
      },
      data: {
        value: Number(value),
      },
      include: {
        productMass: true,
      },
    });
    return NextResponse.json(mass, { status: 201 });
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "this mass value already exist" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ massId: string }> }
) {
  try {
    const { massId } = await params;
    if (!massId) {
      return NextResponse.json({ error: "Missing massId" }, { status: 404 });
    }
    await prisma.mass.delete({
      where: {
        id: massId,
      },
    });
    return NextResponse.json({ message: "Mass deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
