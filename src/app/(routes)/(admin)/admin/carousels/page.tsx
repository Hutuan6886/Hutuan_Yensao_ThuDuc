import React from "react";
import LabelAndCreateBtn from "@/components/admin/LabelOfPage/LabelAndCreateBtn";
import CarouselsList from "./_components/CarouselsList";

const CarouselsPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <LabelAndCreateBtn
        label="Danh Sách Ảnh Bìa"
        btnName="Thêm ảnh bìa"
        // btnFunc={() => {}}
      />
      <CarouselsList />
    </div>
  );
};

export default CarouselsPage;
