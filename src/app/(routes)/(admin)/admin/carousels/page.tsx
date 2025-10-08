import React from "react";
import LabelAndCreateBtn from "@/components/admin/LabelOfPage/LabelAndCreateBtn";
import CarouselsList from "./_components/CarouselsList";
import { CarouselType } from "@/types";

const data: CarouselType[] = [];
const CarouselsPage = async () => {
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
