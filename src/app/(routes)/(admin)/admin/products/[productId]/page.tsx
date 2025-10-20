import React from "react";
import { getProductById } from "@/servers/product";
import { getCategories } from "@/servers/category";
import ProductForm from "../_components/ProductForm";
import { getMasses } from "@/servers/Mass";

const ProductPage = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = await params;
  const [categories, masses, product] = await Promise.all([
    getCategories(),
    getMasses(),
    getProductById(productId),
  ]);
  return (
    <ProductForm categories={categories} masses={masses} product={product} />
  );
};

export default ProductPage;
