"use client";
import React from "react";
import { Button } from "./button";
import { Trash } from "lucide-react";
import { cn } from "@/lib/utils";
interface DeleteFieldArrayButtonProps {
  label: string;
  onClick: () => void;
  className?: string;
}
const DeleteFieldArrayButton: React.FC<DeleteFieldArrayButtonProps> = ({
  label,
  onClick,
  className,
}) => {
  return (
    <Button
      type="button"
      variant="ghost"
      className={cn("text-red-500 text-sm mt-1 cursor-pointer", className)}
      onClick={onClick}
    >
      <Trash className="w-4 h-4 mr-1" /> {label}
    </Button>
  );
};

export default DeleteFieldArrayButton;
