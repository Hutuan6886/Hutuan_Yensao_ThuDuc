import { useState, MouseEvent } from "react";

export const useZoomImage = () => {
  const [position, setPosition] = useState<string>("50% 50%"); //* Vị trí zoom click
  const [zoom, setZoom] = useState<number>(1); //* Biến cờ bật zoom hoặc tắt zoom
  const realzoom = zoom === 1 ? "cover" : `${zoom * 100}%`;

  const calculatePosition = (e: MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPosition(`${x}% ${y}%`);
  };
  const zoomIn = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setZoom((z) => Math.min(z + 1, 3)); // giới hạn zoom
    calculatePosition(e);
  };

  const zoomOut = () => {
    setZoom(1);
    setPosition("50% 50%");
  };
  const handleMove = (e: MouseEvent) => {
    if (zoom > 1) calculatePosition(e);
  };
  const handleZoomLeave = () => {
    setZoom(1);
    setPosition("50% 50%");
  };
  
  return {
    position,
    zoom,
    realzoom,
    zoomIn,
    zoomOut,
    handleMove,
    handleZoomLeave,
  };
};
