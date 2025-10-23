"use client";
import React, { useState } from "react";
import { ProductType } from "@/types";
import { columns } from "../_table/columns";
import DataTable from "../_table/data-table";

interface DataTableWrapperProps {
  data: ProductType[];
}

const DataTableWrapper: React.FC<DataTableWrapperProps> = ({ data }) => {
  const [activeFilterColumn, setActiveFilterColumn] = useState<string>("label");
  const cols = columns(setActiveFilterColumn);
  return (
    <DataTable
      columns={cols}
      data={data}
      activeFilterColumn={activeFilterColumn}
    />
  );
};

export default DataTableWrapper;
