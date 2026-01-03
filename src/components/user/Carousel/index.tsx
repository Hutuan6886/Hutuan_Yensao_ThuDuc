"use client"
import { Button } from "@/components/ui/button";
import { CarouselType } from "@/types";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import React from "react";

interface CarouselProps {
  data: CarouselType[];
}
const Carousel: React.FC<CarouselProps> = ({ data }) => {
  console.log(data);

  return (
    <div className="relative
    w-screen h-[300px] mt-18 md:h-[400px] md:mt-0 lg:h-[600px]
    flex flex-row
  ">
      {data.map((item) => (
        <div key={item.id} className="w-full h-full flex-shrink-0">
          <Image
            src={item.image?.href || ""}
            alt={item.image?.alt || ""}
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
            priority
          />
        </div>
      ))}
      <Button className="absolute top-0 left-0 rounded-none h-full opacity-40 lg:opacity-0 bg-black/30 text-white hover:bg-black/50 hover:opacity-40 transition-all cursor-pointer">
        <ArrowLeft />
      </Button>
      <Button className="absolute top-0 right-0 rounded-none h-full opacity-40 lg:opacity-0 bg-black/30 text-white hover:bg-black/50 hover:opacity-40 transition-all cursor-pointer">
        <ArrowRight />
      </Button>
    </div>
  );
};

export default Carousel;
