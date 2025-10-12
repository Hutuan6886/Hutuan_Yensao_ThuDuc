import React from "react";
import CarouselItem from "./CarouselItem";
import { CarouselType } from "@/types";

const CarouselsList = ({ data }: { data: CarouselType[] }) => {
  return (
    <div className="flex flex-col gap-16">
      {data.map((carousel, i) => (
        <CarouselItem key={carousel.id} index={i + 1} data={carousel} />
      ))}
    </div>
  );
};

export default CarouselsList;
