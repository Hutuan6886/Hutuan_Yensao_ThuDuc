import React from "react";
import Image from "next/image";

import { CarouselType } from "@/types";

import { X } from "lucide-react";
import { Copy } from "lucide-react";

interface CarouselItemProps {
  index: number;
  data: CarouselType;
}
const CarouselItem: React.FC<CarouselItemProps> = ({ index, data }) => {
  return (
    <div className="w-full h-auto flex flex-col justify-center bg-gray-100 rounded-lg overflow-hidden">
      <div className="flex flex-row item-center justify-between p-4">
        <div className="flex flex-row items-center justify-start gap-4">
          <h3 className="text-lg font-semibold">Ảnh bìa {index}</h3>
          <div className="flex flex-row items-center gap-2">
            <p>{data.url}</p>
            <Copy
              className="size-4 cursor-pointer"
              // onClick={() => {}}
            />
          </div>
        </div>
        <X
          className="size-4 cursor-pointer"
          // onClick={() => {}}
        />
      </div>
      <div className="relative w-full h-auto">
        <Image
          src={data.image.href}
          alt={data.image.alt}
          width={1200}
          height={900}
          className="w-full h-auto"
        />
      </div>
    </div>
  );
};

export default CarouselItem;
