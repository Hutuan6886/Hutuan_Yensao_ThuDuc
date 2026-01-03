import React from "react";
import { ProductType } from "@/types";
import ProductItem from "./ProductItem";

interface ProductWithSlideListProps {
  data: ProductType[];
}

const ProductWithSlideList: React.FC<ProductWithSlideListProps> = ({
  data,
}) => {
  return (
    <div className="w-full h-auto flex flex-row items-center justify-between gap-6">
      {data.map((product, i) => (
        <ProductItem
          key={i}
          data={product}
          className="flex-shrink-0 basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
        />
      ))}
    </div>
  );
};

export default ProductWithSlideList;
