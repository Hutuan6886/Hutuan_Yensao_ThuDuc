"use client";
import React from "react";
import { Button } from "./button";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddFieldArrayButtonProps {
  label: string;
  onClick: () => void;
  className?: string;
}
const AddFieldArrayButton: React.FC<AddFieldArrayButtonProps> = ({
  label,
  onClick,
  className,
}) => {
  return (
    <Button
      type="button"
      variant="secondary"
      onClick={onClick}
      className={cn("w-full flex items-center gap-2 cursor-pointer", className)}
    >
      <Plus size={16} /> {label}
    </Button>
  );
};

export default AddFieldArrayButton;
