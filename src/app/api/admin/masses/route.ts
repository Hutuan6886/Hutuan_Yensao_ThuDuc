import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    let { value } = await req.json();
    value = Number(value);
    if (!value) {
      return NextResponse.json("Missing mass value", { status: 404 });
    }
    const mass = await prisma.mass.create({
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
