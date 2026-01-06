import React from "react";
import Image from "next/image";
import { cn, formatterCurrency } from "@/lib/utils";
import { ProductType } from "@/types";
import ProductItemButton from "./ProductItemButton";
import { Gem } from "lucide-react";

interface ProductItemProps extends React.HTMLAttributes<HTMLDivElement> {
  data: ProductType;
}
const ProductItem: React.FC<ProductItemProps> = React.forwardRef<
  HTMLDivElement,
  ProductItemProps
>(({ data, className, ...props }, ref) => {
  const notionShow = data.notion.slice(0, 3);
  return (
    <div
      ref={ref}
      {...props}
      className={cn(
        "w-full h-auto bg-white border border-[#bb8b63] rounded-2xl shadow-2xl overflow-hidden",
        className
      )}
    >
      <Image
        src={data.images[0].href}
        alt={data.images[0].alt}
        width={1920}
        height={1080}
        draggable={false}
        className="w-full h-auto object-cover"
      />
      <div className="w-full h-auto flex flex-col gap-4 p-5">
        <h3 className="font-semibold text-[#613613] text-sm! xl:text-base!">
          {data.label}
        </h3>
        <div className="hidden xl:flex xl:flex-col xl:gap-2">
          {notionShow.map((item) => (
            <div
              key={item.id}
              className="flex flex-row flex-nowrap items-center gap-1"
            >
              <div className="flex flex-row flex-nowrap items-center gap-1 font-semibold ">
                <Gem className="size-3 text-[#bb8b63]" />
                <p className="text-nowrap"> {item.title}</p>
              </div>
              <p className="truncate">{item.content}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-row items-center justify-center gap-2 text-[#E25822] font-bold text-sm xl:text-base">
          <p>{formatterCurrency.format(data.productMass[0].price)}</p>-
          <p>
            {formatterCurrency.format(
              data.productMass[data.productMass.length - 1].price
            )}
          </p>
        </div>
        <div className="flex flex-row items-center justify-center gap-3 sm:gap-4 xl:gap-5">
          <ProductItemButton
            variant="primary"
            redirectTo=""
            className="text-nowrap py-2 px-3 lg:py-2 lg:px-4 text-xs md:text-sm xl:text-base"
          >
            Chi tiết
          </ProductItemButton>
          <ProductItemButton
            variant="inverse"
            redirectTo=""
            className="text-nowrap py-2 px-3 lg:py-2 lg:px-4 text-xs md:text-sm xl:text-base"
          >
            Thêm giỏ hàng
          </ProductItemButton>
        </div>
      </div>
    </div>
  );
});

export default ProductItem;
