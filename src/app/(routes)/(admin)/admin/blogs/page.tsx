import React from "react";
import { getBlogs } from "@/servers/blog";
import DataTableWrapper from "./_table/DataTableWrapper";

const BlogsPage = async () => {
  const data = await getBlogs();
  return <DataTableWrapper data={data} />;
};

export default BlogsPage;
