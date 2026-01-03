"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { HTMLMotionProps, motion } from "framer-motion";
import { cva, VariantProps } from "class-variance-authority";

export interface CopyButtonProps
  extends Omit<HTMLMotionProps<"button">, "children">,
    VariantProps<typeof copyButtonVariants> {
  children: React.ReactNode;
  text: string;
}

const copyButtonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 w-fit overflow-hidden border transition-all cursor-pointer",
  {
    variants: {
      variant: {
        coupon: "bg-[#9b591c] text-white rounded-2xl hover:bg-[#e44d26]",
        ghost: "text-zinc-600 hover:text-[#e44d26]",
      },
      size: {
        sm: "px-3 py-1 text-sm",
        md: "px-5 py-2",
        lg: "px-8 py-3 text-lg",
      },
      fullWidth: {
        true: "w-full",
        false: "w-fit",
      },
    },
    defaultVariants: {
      variant: "coupon",
      size: "md",
      fullWidth: false,
    },
  }
);

const CopyButton = React.forwardRef<HTMLButtonElement, CopyButtonProps>(
  ({ className, children, text, variant, size, fullWidth, ...props }, ref) => {
    const copyFnc = (text: string) => {
      navigator.clipboard.writeText(text);
    };
    return (
      <motion.button
        ref={ref}
        whileHover="hover"
        initial="rest"
        animate="rest"
        className={cn(
          copyButtonVariants({
            variant,
            size,
            fullWidth,
          }),
          className
        )}
        onClick={() => copyFnc(text)}
        {...props}
      >
        <span className="relative z-10">{children}</span>
      </motion.button>
    );
  }
);

CopyButton.displayName = "CopyButton";
export default CopyButton;
