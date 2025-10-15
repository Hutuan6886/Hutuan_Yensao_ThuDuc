import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import React from "react";
interface CloseButtonProps {
  className?: string;
  closeFunc: () => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({ className, closeFunc }) => {
  return (
    <button
      type="button"
      className={cn("cursor-pointer hover:scale-110 transition", className)}
      onClick={closeFunc}
    >
      <X />
    </button>
  );
};

export default CloseButton;
