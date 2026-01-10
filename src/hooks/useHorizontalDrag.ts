import { RefObject, useRef } from "react";

interface DragOptions {
  index: number;
  onNext: () => void;
  onPrev: () => void;
  threshold?: number;
}

export const useHorizontalDrag = (
  containerRef: RefObject<HTMLDivElement | null>,
  { index, onNext, onPrev, threshold = 80 }: DragOptions
) => {
  const startX = useRef(0);
  const offsetX = useRef(0);
  const isDragging = useRef(false);

  const onDragStart = (clientX: number) => {
    if (!containerRef.current) return;
    isDragging.current = true;
    startX.current = clientX;
    offsetX.current = 0;
    containerRef.current.style.transition = "none";
  };

  const onDragMove = (clientX: number) => {
    if (!isDragging.current || !containerRef.current) return;

    offsetX.current = clientX - startX.current;
    containerRef.current.style.transform = `
      translateX(calc(${-index * 100}% + ${offsetX.current}px))
    `;
  };

  const onDragEnd = () => {
    if (!containerRef.current) return;
    isDragging.current = false;

    containerRef.current.style.transition = "transform 0.5s ease-in-out";

    if (Math.abs(offsetX.current) > threshold) {
      offsetX.current < 0 ? onNext() : onPrev();
    }

    offsetX.current = 0;
  };

  return {
    onMouseDown: (e: React.MouseEvent) => onDragStart(e.clientX),
    onMouseMove: (e: React.MouseEvent) =>
      isDragging.current && onDragMove(e.clientX),
    onMouseUp: onDragEnd,
    onMouseLeave: onDragEnd,
    onTouchStart: (e: React.TouchEvent) =>
      onDragStart(e.touches[0].clientX),
    onTouchMove: (e: React.TouchEvent) =>
      onDragMove(e.touches[0].clientX),
    onTouchEnd: onDragEnd,
  };
};
