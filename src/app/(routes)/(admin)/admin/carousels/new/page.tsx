import React from "react";
import CarouselForm from "../_components/CarouselForm";

const CarouselPage = () => {
  return (
    <div className="flex flex-col gap-16">
      <h1 className="text-3xl font-semibold">Tạo ảnh bìa</h1>
      <CarouselForm formData={null} />
    </div>
  );
};

export default CarouselPage;
