import LabelAndCreateBtn from "@/components/admin/LabelOfPage/LabelAndCreateBtn";
import React from "react";

const CategoriesLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="w-full h-full flex flex-col gap-8">
      <LabelAndCreateBtn
        label="Danh Sách Danh Mục Sản Phẩm"
        btnName="Thêm danh mục"
        btnHref="/admin/categories/new"
      />
      {children}
      {/* Table*/}
    </div>
  );
};

export default CategoriesLayout;
