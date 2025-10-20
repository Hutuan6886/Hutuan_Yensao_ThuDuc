"use client";
import React, { forwardRef, HTMLAttributes } from "react";

interface CheckboxProps extends HTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, ...props }, ref) => {
    return (
      <label className="flex flex-nowrap items-center gap-4 cursor-pointer">
        <input ref={ref} type="checkbox" className="peer hidden" {...props} />
        <span
          className="
      size-5 rounded-sm border-2 border-zinc-200
      peer-checked:bg-[#b4783f] peer-checked:border-[#b4783f]
      flex items-center justify-center
      transition-all duration-200
      hover:border-[#e69c57]
    "
        >
          {/* Dấu check (SVG nhỏ) */}
          <svg
            className="size-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </span>
        <span className="text-sm text-nowrap">{label}</span>
      </label>
    );
  }
);

export default Checkbox;
