import React from "react";
import { CarouselWithImage } from "@/types";
import CarouselItem from "./CarouselItem";

const CarouselsList = ({ data }: { data: CarouselWithImage[] }) => {
  return (
    <div className="flex flex-col gap-16">
      {data.map((carousel, i) => (
        <CarouselItem key={carousel.id} index={i + 1} data={carousel} />
      ))}
    </div>
  );
};

export default CarouselsList;
