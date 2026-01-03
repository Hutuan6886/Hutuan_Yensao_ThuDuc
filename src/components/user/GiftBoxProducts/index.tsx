import React from "react";
import Image from "next/image";
import { ProductType } from "@/types";
import ProductItemButton from "@/components/ui/ProductItemButton";
import ProductWithSlideList from "@/components/ui/ProductWithSlideList";
import SlideWrapper from "@/components/ui/SlideWrapper";

interface GiftBoxProductsProps {
  data: ProductType[];
}
const GiftBoxProducts: React.FC<GiftBoxProductsProps> = ({ data }) => {
  const limitedData: ProductType[] = data.slice(0, 10);
  return (
    <div
      className="relative w-full h-auto bg-[url(/images/biatrungthu.jpg)] bg-cover bg-center pt-20 pb-10 md:pt-40 md:pb-20
                flex flex-col items-center justify-center gap-5 md:gap-10"
    >
      <Image
        src="/images/roof.png"
        alt="roof-decor"
        width={1920}
        height={1080}
        className="w-full md:w-[80%] lg:w-[60%] xl:w-[40%] h-auto absolute -top-10 left-1/2 -translate-x-1/2"
      />
      <SlideWrapper className="w-[90%] m-auto">
        <ProductWithSlideList data={limitedData} />
      </SlideWrapper>
      <ProductItemButton variant="link" isShowIcon={true} redirectTo="/admin" className="text-sm lg:text-base">
        Xem toàn bộ
      </ProductItemButton>
    </div>
  );
};

export default GiftBoxProducts;
