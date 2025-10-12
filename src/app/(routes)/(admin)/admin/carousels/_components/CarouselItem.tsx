"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { CarouselType } from "@/types";
import { deleteCarousel } from "@/services/carousel";
import { useCopyClipboard } from "@/hooks/useCopyClipboard";

import CloseButton from "@/components/ui/CloseButton";
import { Copy } from "lucide-react";

interface CarouselItemProps {
  index: number;
  data: CarouselType;
}
const CarouselItem: React.FC<CarouselItemProps> = ({ index, data }) => {
  const router = useRouter();
  const { copy } = useCopyClipboard();
  const navigateUpdatePage = () => {
    router.push(`/admin/carousels/${data.id}`);
  };
  const handleDelete = async () => {
    await deleteCarousel(data.id);
    router.refresh();
  };
  return (
    <div
      className="w-full h-auto flex flex-col justify-center bg-gray-100 rounded-lg overflow-hidden hover:bg-gray-200 transition cursor-pointer"
      onClick={navigateUpdatePage}
    >
      <div className="flex flex-row item-center justify-between p-4">
        <div className="flex flex-row items-center justify-start gap-4">
          <h3 className="text-lg font-semibold">Ảnh bìa {index}</h3>
          <div className="flex flex-row items-center gap-2">
            <p>{data.url}</p>
            <Copy
              className="size-4 cursor-pointer hover:*:text-blue-600 transition"
              onClick={(e?: React.MouseEvent<HTMLOrSVGElement>) => {
                if (e) e.stopPropagation();
                copy(data.url);
              }}
            />
          </div>
        </div>
        <CloseButton
          closeFunc={(e?: React.MouseEvent<HTMLElement>) => {
            if (e) e.stopPropagation();
            handleDelete();
          }}
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
