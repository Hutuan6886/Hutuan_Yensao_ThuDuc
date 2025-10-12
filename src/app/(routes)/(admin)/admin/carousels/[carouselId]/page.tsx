import React from "react";
import { prisma } from "@/libs/db";
import CarouselForm from "../_components/CarouselForm";
import { CarouselType } from "@/types";
import { unstable_noStore as noStore } from "next/cache";

const CarouselPage = async ({ params }: { params: { carouselId: string } }) => {
  noStore();
  const data: CarouselType | null = await prisma.carousel.findFirst({
    where: { id: params.carouselId },
    include: { image: true },
  });
  return (
    <div className="flex flex-col gap-16">
      <h1 className="text-3xl font-semibold">Chỉnh sửa ảnh bìa</h1>
      <CarouselForm formData={data} />
    </div>
  );
};

export default CarouselPage;
