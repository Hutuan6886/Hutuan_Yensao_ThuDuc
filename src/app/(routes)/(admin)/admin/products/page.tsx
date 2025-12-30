import React from "react";
import { getProducts } from "@/servers/product";
import DataTableWrapper from "./_table/DataTableWrapper";
import LabelAndCreateBtn from "@/components/admin/LabelOfPage/LabelAndCreateBtn";

const ProductsPage = async () => {
  const productData = await getProducts();
  return (
    <div className="flex flex-col gap-16">
      <LabelAndCreateBtn
        label="Danh Sách Sản Phẩm"
        btnName="Thêm sản phẩm"
        btnHref="/admin/products/new"
      />
      <DataTableWrapper data={productData} />
    </div>
  );
};

export default ProductsPage;
