import React from "react";
import Image from "next/image";
import { ProductType } from "@/types";
import ProductItemButton from "@/components/user/ProductItemButton";
import SlideWrapper from "@/components/user/SlideWrapper";
import ProductWithSlideList from "@/components/user/ProductWithSlideList";
import TitleWrapper from "@/components/user/TitleWrapper";

interface GiftBoxProductsProps {
  data: ProductType[];
}
const GiftBoxProducts: React.FC<GiftBoxProductsProps> = ({ data }) => {
  const limitedData: ProductType[] = data.slice(0, 10);
  return (
    <TitleWrapper className="relative bg-[url(/images/biatrungthu.jpg)] bg-cover bg-center pt-20 pb-10 md:pt-40 md:pb-20">
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
      <ProductItemButton
        variant="link"
        isShowIcon={true}
        redirectTo="/admin"
        className="text-sm lg:text-base"
      >
        Xem toàn bộ
      </ProductItemButton>
    </TitleWrapper>
  );
};

export default GiftBoxProducts;
