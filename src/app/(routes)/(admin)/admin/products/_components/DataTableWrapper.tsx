"use client";
import React, { useRef, useState } from "react";
import { ProductType } from "@/types";
import { columns } from "../_table/columns";
import DataTable from "../_table/data-table";
import Popup from "@/components/ui/Popup";
import { usePopup } from "@/stores/pop-up/usePopup";
import useLoading from "@/hooks/useLoading";
import { DeleteProduct } from "@/services/product";
import { useRouter } from "next/navigation";

interface DataTableWrapperProps {
  data: ProductType[];
}
const DataTableWrapper: React.FC<DataTableWrapperProps> = ({ data }) => {
  const itemId = useRef<string>(null);
  const router = useRouter();
  const [activeFilterColumn, setActiveFilterColumn] = useState<string>("label");
  const { isPopupOpen, setPopupOpen, content, closePopup } = usePopup();
  const onEdit = (id: string) => router.push(`/admin/products/${id}`);
  const onDelete = (id: string) => {
    itemId.current = id;
    setPopupOpen({
      title: "Bạn muốn xóa sản phẩm này?",
      message: "Sản phẩm này sẽ bị xóa vĩnh viễn",
      submitPopup: async () => run(),
    });
  };
  const cols = columns({ setActiveFilterColumn, onEdit, onDelete });
  const handleDelete = async (signal?: AbortSignal) => {
    await DeleteProduct(itemId.current as string, signal);
    router.refresh();
  };
  const { isLoading, run, cancelRequest } = useLoading(handleDelete);
  return (
    <>
      <Popup
        isLoading={isLoading}
        isOpen={isPopupOpen}
        title={content.title}
        message={content.message}
        submitFunc={content.submitPopup}
        closeFunc={() => {
          closePopup();
          cancelRequest();
        }}
      />
      <DataTable
        columns={cols}
        data={data}
        activeFilterColumn={activeFilterColumn}
      />
    </>
  );
};

export default DataTableWrapper;
