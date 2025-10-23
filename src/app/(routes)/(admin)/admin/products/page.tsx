import LabelAndCreateBtn from "@/components/admin/LabelOfPage/LabelAndCreateBtn";
import React from "react";
import DataTable from "./_table/data-table";
import { getProducts } from "@/servers/product";
import { columns } from "./_table/columns";
import DataTableWrapper from "./_components/DataTableWrapper";

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
