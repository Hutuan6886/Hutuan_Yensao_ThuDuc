"use client";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CategoryWithSub } from "@/types";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import Popup from "@/components/ui/Popup";
import useLoading from "@/hooks/useLoading";
import { deleteCategory } from "@/services/category";
import { usePopup } from "@/stores/pop-up/usePopup";

interface DataTableWrapperProps {
  categoriesData: CategoryWithSub[];
}
const DataTableWrapper: React.FC<DataTableWrapperProps> = ({
  categoriesData,
}) => {
  const idItem = useRef<string>(null);
  const router = useRouter();
  const {
    content: { title, message, submitPopup },
    isPopupOpen,
    setPopupOpen,
    closePopup,
  } = usePopup((state) => state);
  const editButton = (id: string) => {
    router.push(`/admin/categories/${id}`);
  };

  const handleDelete = async (signal?: AbortSignal) => {
    await deleteCategory(idItem.current as string, signal);
    router.refresh();
  };
  const { isLoading, run, cancelRequest } = useLoading(handleDelete);

  const deteleButton = async (id: string) => {
    idItem.current = id;
    setPopupOpen({
      title: "Bạn muốn xóa danh mục này?",
      message: "Danh mục này sẽ bị xóa vĩnh viễn",
      submitPopup: async () => run(),
    });
  };
  const cols = columns({
    //* connect table content into columns.tsx
    onEdit: editButton,
    onDelete: deteleButton,
  });
  return (
    <>
      <DataTable columns={cols} data={categoriesData} />
      <Popup
        title={title}
        message={message}
        isOpen={isPopupOpen}
        isLoading={isLoading}
        submitFunc={submitPopup}
        closeFunc={() => {
          cancelRequest();
          closePopup();
        }}
      />
    </>
  );
};

export default DataTableWrapper;
