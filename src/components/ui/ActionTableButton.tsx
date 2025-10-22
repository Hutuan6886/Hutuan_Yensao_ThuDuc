"use client";
import clsx from "clsx";
import React, { ButtonHTMLAttributes } from "react";
interface ActionTableButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "edit" | "delete";
}
const ActionTableButton: React.FC<ActionTableButtonProps> = ({
  variant,
  className,
  ...props
}) => {
  const baseStyles = "hover:underline transition cursor-pointer";
  const variantStyles = clsx({
    "text-blue-500": variant === "edit",
    "text-red-500": variant === "delete",
  });
  return (
    <button className={clsx(baseStyles, variantStyles, className)} {...props} />
  );
};

export default ActionTableButton;
