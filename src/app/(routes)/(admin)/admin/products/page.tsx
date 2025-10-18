import LabelAndCreateBtn from "@/components/admin/LabelOfPage/LabelAndCreateBtn";
import React from "react";

const ProductsPage = async () => {
  return (
    <div className="flex flex-col gap-16">
      <LabelAndCreateBtn
        label="Danh Sách Sản Phẩm"
        btnName="Thêm sản phẩm"
        btnHref="/admin/products/new"
      />
      {/* Product table */}
    </div>
  );
};

export default ProductsPage;
