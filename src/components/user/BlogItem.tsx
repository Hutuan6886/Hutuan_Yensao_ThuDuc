import React, { forwardRef, HTMLAttributes } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface BlogItemProps extends HTMLAttributes<HTMLDivElement> {
  data: any;
}
const BlogItem: React.FC<BlogItemProps> = forwardRef<
  HTMLDivElement,
  BlogItemProps
>(({ data, className, ...props }, ref) => {
  {
    return (
      <div
        ref={ref}
        {...props}
        className={cn(
          "w-full h-auto bg-white rounded-lg shadow-md overflow-hidden cursor-pointer",
          className
        )}
      >
        <Image
          src={data.image.href}
          alt={data.image.alt}
          width={1920}
          height={1080}
          draggable={false}
          className="w-full h-auto object-cover"
        />
        <div className="w-full h-auto flex flex-col items-center gap-4 p-5">
          <h3 className="font-semibold text-[#613613] !text-sm xl:!text-base">
            {data.label}
          </h3>
        </div>
      </div>
    );
  }
});

export default BlogItem;
