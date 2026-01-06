import React, { Suspense } from "react";
import { getCarousels } from "@/servers/carousel";
import { getProducts } from "@/servers/product";
import Carousel from "@/app/(routes)/(user)/_components/Carousel";
import GiftBoxProducts from "@/app/(routes)/(user)/_components/GiftBoxProducts";
import HighlightedInfo from "@/app/(routes)/(user)/_components/HighlightedInfo";
import Menu from "@/app/(routes)/(user)/_components/Menu";
import Coupon from "@/app/(routes)/(user)/_components/Coupon";
import HighlightedProducts from "./_components/HighlightedProducts";

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
      <Coupon />
      <HighlightedInfo />
      <Suspense fallback={<div>Loading...</div>}>
        <HighlightedProducts data={products} />
      </Suspense>
    </div>
  );
};

export default HomePage;
