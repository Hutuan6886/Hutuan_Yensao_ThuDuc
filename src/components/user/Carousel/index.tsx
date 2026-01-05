"use client";
import { Button } from "@/components/ui/button";
import { CarouselType } from "@/types";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

interface CarouselProps {
  data: CarouselType[];
}

const AUTO_SCROLL_DELAY = 5000;
const SWIPE_THRESHOLD = 80;

const Carousel: React.FC<CarouselProps> = ({ data }) => {
  const [index, setIndex] = useState(0);
  const total = data.length;

  const containerRef = useRef<HTMLDivElement | null>(null);

  // autoplay refs
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isPaused = useRef(false);

  // drag refs
  const startX = useRef(0);
  const dragOffset = useRef(0);
  const isDragging = useRef(false);

  const next = () => {
    setIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };
  const prev = () => {
    setIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  /* ===================== AUTOPLAY ===================== */
  const startAuto = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!isPaused.current) next();
    }, AUTO_SCROLL_DELAY);
  };

  const stopAuto = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    if (total <= 1) return;
    startAuto();
    return stopAuto;
  }, [total]);

  /* ===================== DRAG HANDLERS ===================== */

  const onDragStart = (clientX: number) => {
    isDragging.current = true;
    startX.current = clientX;
    dragOffset.current = 0;
    isPaused.current = true;
    stopAuto();
  };

  const onDragMove = (clientX: number) => {
    if (!isDragging.current || !containerRef.current) return;

    dragOffset.current = clientX - startX.current;
    containerRef.current.style.transition = "none";
    containerRef.current.style.transform = `
      translateX(calc(${-index * 100}% + ${dragOffset.current}px))
    `;
  };

  const onDragEnd = () => {
    if (!containerRef.current) return;

    isDragging.current = false;
    containerRef.current.style.transition = "transform 0.5s ease-in-out";

    if (Math.abs(dragOffset.current) > SWIPE_THRESHOLD) {
      dragOffset.current < 0 ? next() : prev();
    }

    dragOffset.current = 0;
    isPaused.current = false;
    startAuto();
  };

  /* ===================== RENDER ===================== */

  return (
    <div
      className="relative w-screen overflow-hidden
        h-[300px] mt-18 md:h-[400px] md:mt-0 lg:h-[600px]"
      onMouseEnter={() => (isPaused.current = true)}
      onMouseLeave={() => {
        isPaused.current = false;
        onDragEnd();
      }}
      onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
      onTouchMove={(e) => onDragMove(e.touches[0].clientX)}
      onTouchEnd={onDragEnd}
      onMouseDown={(e) => onDragStart(e.clientX)}
      onMouseMove={(e) => isDragging.current && onDragMove(e.clientX)}
      onMouseUp={onDragEnd}
    >
      {/* SLIDES */}
      <div
        ref={containerRef}
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {data.map((item) => (
          <div key={item.id} className="w-full h-full flex-shrink-0">
            <Image
              src={item.image?.href || ""}
              alt={item.image?.alt || ""}
              width={1920}
              height={1080}
              className="w-full h-full object-cover select-none"
              draggable={false}
              priority
            />
          </div>
        ))}
      </div>
      {/* BUTTONS */}
      <Button
        onClick={() => {
          stopAuto();
          prev();
          startAuto();
        }}
        className="hidden xl:block absolute top-0 left-0 h-full rounded-none bg-black/20 text-white cursor-pointer"
      >
        <ArrowLeft />
      </Button>
      <Button
        onClick={() => {
          stopAuto();
          next();
          startAuto();
        }}
        className="hidden xl:block absolute top-0 right-0 h-full rounded-none bg-black/20 text-white cursor-pointer"
      >
        <ArrowRight />
      </Button>
    </div>
  );
};

export default Carousel;
