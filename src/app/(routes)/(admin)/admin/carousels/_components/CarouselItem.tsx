"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { CarouselType } from "@/types";
import { deleteCarousel } from "@/services/carousel";
import { useCopyClipboard } from "@/hooks/useCopyClipboard";
import useLoading from "@/hooks/useLoading";
import { usePopup } from "@/stores/pop-up/usePopup";

import CloseButton from "@/components/ui/CloseButton";
import { Copy } from "lucide-react";
import Popup from "@/components/ui/Popup";

interface CarouselItemProps {
  index: number;
  data: CarouselType;
}
const CarouselItem: React.FC<CarouselItemProps> = ({ index, data }) => {
  const router = useRouter();
  const { copy } = useCopyClipboard();
  const {
    content: { title, message, submitPopup },
    isPopupOpen,
    setPopupOpen,
    closePopup,
  } = usePopup((state) => state);

  const navigateUpdatePage = () => {
    router.push(`/admin/carousels/${data.id}`);
  };
  const handleDelete = async (signal?: AbortSignal) => {
    await deleteCarousel(data.id, signal);
    router.refresh();
  };
  const { isLoading, run, cancelRequest } = useLoading(handleDelete);

  return (
    <>
      <Popup
        isLoading={isLoading}
        title={title}
        message={message}
        isOpen={isPopupOpen}
        submitFunc={submitPopup}
        closeFunc={() => {
          cancelRequest();
          closePopup();
        }}
      />
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
              setPopupOpen({
                title: "Bạn muốn xóa ảnh bìa này?",
                message: "Ảnh bìa này sẽ bị xóa vĩnh viễn",
                submitPopup: async () => run(),
              });
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
    </>
  );
};

export default CarouselItem;
