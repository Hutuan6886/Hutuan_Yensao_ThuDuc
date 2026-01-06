import React from "react";
import { ProductType } from "@/types";
import ProductItemButton from "@/components/user/ProductItemButton";
import ProductWithSlideList from "@/components/user/ProductWithSlideList";
import SlideWrapper from "@/components/user/SlideWrapper";
import TitleWrapper from "@/components/user/TitleWrapper";

interface HighlightedProductsProps {
  data: ProductType[];
}
const HighlightedProducts: React.FC<HighlightedProductsProps> = ({ data }) => {
  const limitedData: ProductType[] = data.slice(0, 20);
  return (
    <TitleWrapper title="Sản phẩm nổi bật" className="bg-[#FFF5E8] bg-[url(/images/mountain-decor.png)] bg-cover bg-center">
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

export default HighlightedProducts;
