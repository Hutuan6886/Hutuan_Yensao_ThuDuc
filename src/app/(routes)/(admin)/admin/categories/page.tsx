import React from "react";
import { DataTable } from "./payments/data-table";
import { columns } from "./payments/columns";
import { getCategories } from "@/servers/category";
import { CategoryWithSub } from "@/types";

const CategoriesPage = async () => {
  const categories = await getCategories();
  return <DataTable columns={columns} data={categories} />;
};

export default CategoriesPage;
