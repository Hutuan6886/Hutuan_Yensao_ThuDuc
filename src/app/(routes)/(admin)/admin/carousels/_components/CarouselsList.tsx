import React from "react";
import CarouselItem from "./CarouselItem";
import { CarouselType } from "@/types";

const CarouselsList = ({ data }: { data: CarouselType[] }) => {
  return (
    <div className="flex flex-col gap-16">
      {/* {data.map((carousel, i) => (
        <CarouselItem key={carousel.id} index={i + 1} data={carousel} />
      ))} */}
      <CarouselItem
        index={1}
        data={{
          id: "",
          image: { id: "1", href: "/images/slider_1.jpg", alt: "" },
          url: "/products",
        }}
      />
      <CarouselItem
        index={2}
        data={{
          id: "",
          image: { id: "2", href: "/images/slider_2.jpg", alt: "" },
          url: "/products",
        }}
      />
    </div>
  );
};

export default CarouselsList;
