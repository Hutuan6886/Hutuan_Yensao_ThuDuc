"use client";
import { useRef } from "react";
import Image from "next/image";
import { CarouselType } from "@/types";
import { useItemNavigator } from "@/hooks/useItemNavigator";
import { useHorizontalDrag } from "@/hooks/useHorizontalDrag";
import { useAutoPlay } from "@/components/user/useAutoPlay";
import { ScrollWrapper } from "@/components/user/ScrollWrapper";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const Carousel = ({ data }: { data: CarouselType[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const nav = useItemNavigator(data.length);
  const dragEvents = useHorizontalDrag(containerRef, {
    index: nav.index,
    onNext: nav.next,
    onPrev: nav.prev,
  });
  const auto = useAutoPlay({
    enabled: nav.canNext,
    onNext: nav.next,
  });

  return (
    <div
      className="relative w-screen h-[300px] md:h-[400px] lg:h-[600px]"
      onMouseEnter={auto.pause}
      onMouseLeave={auto.resume}
    >
      <ScrollWrapper
        containerRef={containerRef}
        index={nav.index}
        {...dragEvents}
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
      </ScrollWrapper>
      {nav.canPrev && (
        <Button
          onClick={nav.prev}
          className="hidden xl:flex absolute left-0 top-0 h-full rounded-none bg-black/20"
        >
          <ArrowLeft />
        </Button>
      )}
      {nav.canNext && (
        <Button
          onClick={nav.next}
          className="hidden xl:flex absolute right-0 top-0 h-full rounded-none bg-black/20"
        >
          <ArrowRight />
        </Button>
      )}
    </div>
  );
};
export default Carousel;