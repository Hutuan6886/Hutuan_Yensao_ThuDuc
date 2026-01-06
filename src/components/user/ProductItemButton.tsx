"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { HTMLMotionProps, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { cva, VariantProps } from "class-variance-authority";
import { useRouter } from "next/navigation";

export interface ProductItemButtonProps
  extends Omit<HTMLMotionProps<"button">, "children">,
    VariantProps<typeof productItemButtonVariants> {
  children: React.ReactNode;
  isShowIcon?: boolean;
  redirectTo: string;
}

const productItemButtonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 w-fit overflow-hidden border transition-all cursor-pointer before:absolute before:inset-0 before:origin-left before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-500",
  {
    variants: {
      variant: {
        primary:
          "border-[#613613] text-[#613613] before:bg-[#613613] hover:text-white",
        outline:
          "border-[#613613] text-[#613613] bg-white before:bg-[#613613]/10 hover:text-[#613613]",
        inverse:
          "bg-[#613613] text-white border-[#613613] before:bg-white hover:text-[#613613]",
        ghost:
          "border-transparent text-[#613613] before:bg-[#613613] hover:text-white",
        link: "border-none bg-transparent text-[#613613] before:hidden px-0 py-0 hover:underline",
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
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  }
);

const ProductItemButton = React.forwardRef<
  HTMLButtonElement,
  ProductItemButtonProps
>(
  (
    {
      className,
      children,
      isShowIcon = false,
      redirectTo,
      variant,
      size,
      fullWidth,
      ...props
    },
    ref
  ) => {
    const router = useRouter();
    return (
      <motion.button
        ref={ref}
        whileHover="hover"
        initial="rest"
        animate="rest"
        className={cn(
          productItemButtonVariants({
            variant,
            size,
            fullWidth,
          }),
          className
        )}
        onClick={() => router.push(redirectTo)}
        {...props}
      >
        <span className="relative z-10">{children}</span>

        {isShowIcon && (
          <motion.span
            variants={{
              rest: { opacity: 0, x: -6 },
              hover: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 0.2 }}
            className="relative z-10"
          >
            <ChevronRight size={10} />
          </motion.span>
        )}
      </motion.button>
    );
  }
);

ProductItemButton.displayName = "ProductItemButton";
export default ProductItemButton;
