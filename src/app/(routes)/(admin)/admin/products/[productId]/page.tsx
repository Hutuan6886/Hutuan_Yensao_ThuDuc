import React from "react";
import { getProductById } from "@/servers/product";
import ProductForm from "../_components/ProductForm";

const ProductPage = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = await params;
  const data = await getProductById(productId);
  return <ProductForm productData={data} />;
};

export default ProductPage;
