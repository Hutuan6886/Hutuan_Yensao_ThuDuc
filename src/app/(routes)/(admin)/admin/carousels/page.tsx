import React from "react";
import { getCarousels } from "@/servers/carousel";
import { CarouselType } from "@/types";
import CarouselsList from "./_components/CarouselsList";
import LabelAndCreateBtn from "@/components/admin/LabelOfPage/LabelAndCreateBtn";
import DataTableWrapper from "./_table/DataTableWrapper";
const CarouselsPage = async () => {
  const data: CarouselType[] = await getCarousels();
  return (
    <div className="flex flex-col gap-16">
      <LabelAndCreateBtn
        label="Danh Sách Ảnh Bìa"
        btnName="Thêm ảnh bìa"
        btnHref="/admin/carousels/new"
      />
      {/* <CarouselsList data={data} /> */}
      <DataTableWrapper data={data} />
    </div>
  );
};

export default CarouselsPage;
