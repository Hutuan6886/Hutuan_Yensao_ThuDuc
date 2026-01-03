import Carousel from "@/components/user/Carousel";
import GiftBoxProducts from "@/components/user/GiftBoxProducts";
import HighlightedInfo from "@/components/user/HighlightedInfo";
import Menu from "@/components/user/Menu";
import Coupon from "@/components/user/Coupon";
import { getCarousels } from "@/servers/carousel";
import { getProducts } from "@/servers/product";
import React, { Suspense } from "react";
import TitleWrapper from "@/components/ui/TitleWrapper";
import SlideWrapper from "@/components/ui/SlideWrapper";

const HomePage = async () => {
  const [carousels, products] = await Promise.all([
    getCarousels(),
    getProducts(),
  ]);
  return (
    <div className="w-full h-auto p">
      <Suspense fallback={<div>Loading...</div>}>
        <Carousel data={carousels} />
      </Suspense>
      <Menu />
      <Suspense fallback={<div>Loading...</div>}>
        <GiftBoxProducts data={products} />
      </Suspense>
      <TitleWrapper title="Mã giảm giá dành cho bạn">
        <SlideWrapper className="w-[90%] m-auto">
          <Coupon />
        </SlideWrapper>
      </TitleWrapper>
      <HighlightedInfo />
    </div>
  );
};

export default HomePage;
