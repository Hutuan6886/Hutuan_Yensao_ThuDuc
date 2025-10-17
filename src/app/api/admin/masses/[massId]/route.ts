import { NextRequest, NextResponse } from "next/server";
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
    let { value } = await req.json();
    value = Number(value);
    if (!value) {
      return NextResponse.json(
        { error: "Missing mass value" },
        { status: 404 }
      );
    }
    const mass = await prisma.mass.update({
      where: {
        id: massId,
      },
      data: {
        value,
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
