import { cn } from "@/lib/utils";
import React, { HTMLAttributes } from "react";

interface TitleWrapperProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  children: React.ReactNode;
}
const TitleWrapper = React.forwardRef<HTMLDivElement, TitleWrapperProps>(
  ({ title, children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        {...props}
        className={cn(
          "w-full h-auto flex flex-col items-center justify-center gap-5 md:gap-10 xl:gap-15 py-10 md:py-20",
          className
        )}
      >
        <h1
          className={`${
            title ? "block" : "hidden"
          } text-[#613613] font-semibold text-2xl! md:text-3xl! lg:text-4xl!`}
        >
          {title}
        </h1>
        {children}
      </div>
    );
  }
);

export default TitleWrapper;
