import React from "react";
import LabelAndCreateBtn from "@/components/admin/LabelOfPage/LabelAndCreateBtn";

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
    </div>
  );
};

export default CategoriesLayout;
