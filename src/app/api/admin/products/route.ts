import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { productFormSchema } from "@/app/(routes)/(admin)/admin/products/_form schema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = productFormSchema.safeParse(body);

    if (!parsed.success) {
      const tree = z.treeifyError(parsed.error);
      return NextResponse.json(
        { error: tree, message: "Invalid input" },
        { status: 400 }
      );
    }
    const { label, images, category, productMass, notion, description } =
      parsed.data;
    const productCreated = await prisma.$transaction(async (tx) => {
      const product = await tx.product.create({
        data: {
          label,
          category: {
            connect: { id: category.id },
          },
          images: {
            create: images.map((img) => ({
              href: img.href,
              alt: img.alt,
            })),
          },
          productMass: {
            create: productMass.map((mass) => ({
              price: mass.price,
              discount: mass.discount,
              mass: { connect: { id: mass.massId } },
            })),
          },
          notion: {
            create: notion.map((n) => ({
              title: n.title,
              content: n.content,
            })),
          },
          description: {
            create: description.map((d) => ({
              title: d.title,
              content: d.content,
              image: d.image
                ? {
                    create: {
                      href: d.image.href,
                      alt: d.image.alt,
                    },
                  }
                : undefined,
            })),
          },
        },
        include: {
          category: true,
          images: true,
          productMass: true,
          notion: true,
          description: {
            include: { image: true },
          },
        },
      });
      return product;
    });
    return NextResponse.json(productCreated, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
