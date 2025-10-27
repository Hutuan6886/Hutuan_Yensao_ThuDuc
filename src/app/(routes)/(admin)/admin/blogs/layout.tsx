import React from "react";
import LabelAndCreateBtn from "@/components/admin/LabelOfPage/LabelAndCreateBtn";

const BlogLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="w-full h-full flex flex-col gap-16">
      <LabelAndCreateBtn
        label="Danh Sách Bài viết"
        btnName="Thêm bài viết mới"
        btnHref="/admin/blogs/new"
      />
      {children}
    </div>
  );
};

export default BlogLayout;
