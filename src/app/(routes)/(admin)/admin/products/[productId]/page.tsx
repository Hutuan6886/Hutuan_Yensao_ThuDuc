import React from "react";
import { getProductById } from "@/servers/product";
import { getCategories } from "@/servers/category";
import ProductForm from "../_components/ProductForm";

const ProductPage = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = await params;
  const [categories, product] = await Promise.all([
    getCategories(),
    getProductById(productId),
  ]);
  return <ProductForm categories={categories} product={product} />;
};

export default ProductPage;
