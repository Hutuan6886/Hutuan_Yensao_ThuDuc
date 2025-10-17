import React from "react";
import { getMasses } from "@/servers/Mass";
import LabelAndCreateBtn from "@/components/admin/LabelOfPage/LabelAndCreateBtn";
import DataTableWrapper from "./_table/DataTableWrapper";

const MassesLayout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const data = await getMasses();
  return (
    <div className="flex flex-col gap-16">
      <LabelAndCreateBtn label="Danh sách khối lượng" />
      {children}
      <DataTableWrapper massesData={data} />
    </div>
  );
};

export default MassesLayout;
