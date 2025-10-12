import React from "react";
import LabelAndCreateBtn from "@/components/admin/LabelOfPage/LabelAndCreateBtn";
import CarouselsList from "./_components/CarouselsList";
import { CarouselType } from "@/types";
import { prisma } from "@/libs/db";
const CarouselsPage = async () => {
  const data = await prisma.carousel.findMany({
    include: { image: true },
    orderBy: { createdAt: "asc" },
  });
  const safeData: CarouselType[] = data.map((c) => {
    return {
      id: c.id,
      image: {
        id: c.image.id,
        href: c.image.href,
        alt: c.image.alt,
        createdAt: new Date(c.image.createdAt).toISOString(),
        updatedAt: new Date(c.image.updatedAt).toISOString(),
      },
      url: c.url,
      createdAt: new Date(c.createdAt).toISOString(),
      updatedAt: new Date(c.updatedAt).toISOString(),
    };
  });
  return (
    <div className="flex flex-col gap-16">
      <LabelAndCreateBtn
        label="Danh Sách Ảnh Bìa"
        btnName="Thêm ảnh bìa"
        btnHref="/admin/carousels/new"
      />
      <CarouselsList data={safeData} />
    </div>
  );
};

export default CarouselsPage;
