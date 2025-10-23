import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { massFormSchema } from "@/app/(routes)/(admin)/admin/masses/_form_schema";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
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
  try {
    await prisma.mass.create({
      data: {
        value: Number(value),
      },
      select: {
        id: true,
      },
    });
    return NextResponse.json({ sucees: true }, { status: 201 });
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
