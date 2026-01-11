"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { useItemNavigator } from "@/hooks/useItemNavigator";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useClickOutside } from "@/hooks/useClickOutSide";
import { useZoomImage } from "@/hooks/useZoomImage";

interface CertificationPopupProps {
  data: any[];
  imgShowIndex: number;
  onClose: () => void;
}
const CertificationPopup: React.FC<CertificationPopupProps> = ({
  data,
  imgShowIndex,
  onClose,
}) => {
  const popupRef = useRef<HTMLDivElement>(null);
  useClickOutside(popupRef, onClose);
  const { index, next, prev, canNext, canPrev } = useItemNavigator(
    data.length,
    imgShowIndex
  );
  const currentImage = data[index];
  const {
    position,
    zoom,
    realzoom,
    zoomIn,
    zoomOut,
    handleMove,
    handleZoomLeave,
  } = useZoomImage();
  return (
    <div className="fixed z-20 top-0 left-0 w-full h-full bg-black/40 flex flex-col items-center justify-center">
      <div ref={popupRef} className="w-[90vw] sm:w-[80vw] md:w-[70vw] lg:w-[60vw] xl:w-[45vw] 2xl:w-[35vw] max-h-[90vh] flex items-center justify-center">
        <div className="relative w-full aspect-[3/4] overflow-hidden">
          <Button
            variant="ghost"
            className="absolute z-20 top-0 right-0 cursor-pointer hover:bg-transparent"
            onClick={onClose}
          >
            <X />
          </Button>
          {zoom !== 1 ? (
            <div
              className="absolute inset-0 cursor-zoom-out bg-no-repeat"
              style={{
                backgroundImage: `url(${currentImage.href})`,
                backgroundPosition: position,
                backgroundSize: realzoom,
              }}
              onClick={zoomOut}
              onMouseMove={handleMove}
              onMouseLeave={handleZoomLeave}
            />
          ) : (
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-out"
                style={{
                  transform: `translateX(${-index * 100}%)`,
                }}
              >
                {data.map((img) => (
                  <Image
                    key={img.id}
                    src={img.href}
                    alt={img.alt}
                    width={1920}
                    height={1080}
                    className="min-w-full cursor-zoom-in"
                    onClick={zoomIn}
                  />
                ))}
              </div>
            </div>
          )}
          {zoom === 1 && (
            <>
              {canPrev && (
                <Button
                  onClick={prev}
                  className="flex absolute left-0 top-0 h-full rounded-none bg-black/20 cursor-pointer"
                >
                  <ArrowLeft />
                </Button>
              )}
              {canNext && (
                <Button
                  onClick={next}
                  className="flex absolute right-0 top-0 h-full rounded-none bg-black/20 cursor-pointer"
                >
                  <ArrowRight />
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CertificationPopup;
