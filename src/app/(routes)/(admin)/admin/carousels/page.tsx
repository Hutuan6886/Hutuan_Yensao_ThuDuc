import React from "react";
import { prisma } from "@/lib/db";
import { CarouselType } from "@/types";
import CarouselsList from "./_components/CarouselsList";
import LabelAndCreateBtn from "@/components/admin/LabelOfPage/LabelAndCreateBtn";
import { getCarousels } from "@/servers/carousel";
const CarouselsPage = async () => {
  const data: CarouselType[] = await getCarousels();
  return (
    <div className="flex flex-col gap-16">
      <LabelAndCreateBtn
        label="Danh Sách Ảnh Bìa"
        btnName="Thêm ảnh bìa"
        btnHref="/admin/carousels/new"
      />
      <CarouselsList data={data} />
    </div>
  );
};

export default CarouselsPage;
