"use client";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SlideWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}
const SlideWrapper: React.FC<SlideWrapperProps> = React.forwardRef<
  HTMLDivElement,
  SlideWrapperProps
>(({ className, children, ...props }, ref) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  /* Drag states */
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  /*Show or hidden scroll button states*/
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  /* ------------------ BUTTON SCROLL ------------------ */
  // const scrollLeft = () => {
  //   if (!containerRef.current) return;
  //   const itemWidth = containerRef.current.firstElementChild?.clientWidth || 0;

  //   containerRef.current.scrollBy({
  //     left: -(itemWidth + 24),
  //     behavior: "smooth",
  //   });
  // };

  // const scrollRight = () => {
  //   if (!containerRef.current) return;
  //   const itemWidth = containerRef.current.firstElementChild?.clientWidth || 0;

  //   containerRef.current.scrollBy({
  //     left: itemWidth + 24, // 24 = gap-6
  //     behavior: "smooth",
  //   });
  // };
  const scrollByItem = (direction: "left" | "right") => {
    if (!containerRef.current) return;

    const itemWidth = containerRef.current.firstElementChild?.clientWidth || 0;
    const gap = 24;

    containerRef.current.scrollBy({
      left: direction === "right" ? itemWidth + gap : -(itemWidth + gap),
      behavior: "smooth",
    });
    // ✅ update sau khi scroll
    requestAnimationFrame(updateScrollButtons);
  };
  /* ------------------ DRAG HANDLERS ------------------ */
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    isDragging.current = true;
    startX.current = e.clientX;
    scrollLeft.current = containerRef.current.scrollLeft;

    containerRef.current.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current || !containerRef.current) return;

    const deltaX = e.clientX - startX.current;
    containerRef.current.scrollLeft = scrollLeft.current - deltaX;
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = false;
    containerRef.current?.releasePointerCapture(e.pointerId);
  };

  /* ------------------ SCROLL BUTTON VISIBILITY ------------------ */
  const updateScrollButtons = () => {
    if (!containerRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  };
  useEffect(() => {
    updateScrollButtons();

    const el = containerRef.current;
    if (!el) return;

    el.addEventListener("scroll", updateScrollButtons);
    window.addEventListener("resize", updateScrollButtons);

    return () => {
      el.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn("relative w-full h-auto", className)}
      {...props}
    >
      <div
        ref={containerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={() => (isDragging.current = false)}
        className="flex gap-6 overflow-x-hidden scroll-smooth
                    cursor-grab active:cursor-grabbing select-none"
      >
        {children}
      </div>
      {canScrollLeft && (
        <Button
          disabled={!canScrollLeft}
          variant="ghost"
          className="absolute z-10 top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 cursor-pointer
                                        bg-white/40 border border-[#613613] hover:bg-white hover:text-[#613613]"
          onClick={() => scrollByItem("left")}
        >
          <ChevronLeft />
        </Button>
      )}
      {canScrollRight && (
        <Button
          disabled={!canScrollRight}
          variant="ghost"
          className="absolute z-10 top-1/2 right-0 -translate-y-1/2 translate-x-1/2 cursor-pointer
                                        bg-white/40 border border-[#613613] hover:bg-white hover:text-[#613613]"
          onClick={() => scrollByItem("right")}
        >
          <ChevronRight />
        </Button>
      )}
    </div>
  );
});

export default SlideWrapper;
