import React from "react";
import { getCategories } from "@/servers/category";
import DataTableWrapper from "./payments/DataTableWrapper";
const CategoriesPage = async () => {
  const categories = await getCategories();
  return <DataTableWrapper categoriesData={categories} />;
};

export default CategoriesPage;
