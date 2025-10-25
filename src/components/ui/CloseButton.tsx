import React, { MouseEvent } from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
interface CloseButtonProps {
  className?: string;
  closeFunc: () => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({ className, closeFunc }) => {
  return (
    <button
      type="button"
      className={cn("cursor-pointer hover:scale-110 transition", className)}
      onPointerDownCapture={(e: MouseEvent<HTMLButtonElement>) =>
        // Chặn dnd-kit
        e.stopPropagation() 
      }
      onClick={closeFunc}
    >
      <X />
    </button>
  );
};

export default CloseButton;
