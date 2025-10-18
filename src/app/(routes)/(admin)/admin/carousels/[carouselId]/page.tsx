import React from "react";
import { getCarouselById } from "@/servers/carousel";
import { CarouselType } from "@/types";
import CarouselForm from "../_components/CarouselForm";

const CarouselPage = async ({
  params,
}: {
  params: Promise<{ carouselId: string }>;
}) => {
  const { carouselId } = await params;
  const data: CarouselType | null = await getCarouselById(carouselId);
  return (
    <div className="flex flex-col gap-16">
      <h1 className="text-3xl font-semibold">Chỉnh sửa ảnh bìa</h1>
      <CarouselForm carouselData={data} />
    </div>
  );
};

export default CarouselPage;
