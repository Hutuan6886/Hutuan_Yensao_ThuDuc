"use client";
import React, { useRef } from "react";
import { CarouselType } from "@/types";
import { columns } from "./columns";
import DataTable from "./data-table";
import Popup from "@/components/ui/Popup";
import { usePopup } from "@/stores/pop-up/usePopup";
import useLoading from "@/hooks/useLoading";
import { deleteProduct } from "@/services/product";
import { useRouter } from "next/navigation";

interface DataTableWrapperProps {
  data: CarouselType[];
}
const DataTableWrapper: React.FC<DataTableWrapperProps> = ({ data }) => {
  const itemId = useRef<string>(null);
  const router = useRouter();
  const { isPopupOpen, setPopupOpen, content, closePopup } = usePopup();
  const onEdit = (id: string) => router.push(`/admin/carousels/${id}`);
  const onDelete = (id: string) => {
    itemId.current = id;
    setPopupOpen({
      title: "Bạn muốn xóa ảnh bìa này?",
      message: "Ảnh bìa này sẽ bị xóa vĩnh viễn",
      submitPopup: async () => run(),
    });
  };
  const cols = columns({ onEdit, onDelete });
  const handleDelete = async (signal?: AbortSignal) => {
    await deleteProduct(itemId.current as string, signal);
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
      <DataTable columns={cols} data={data} />
    </>
  );
};

export default DataTableWrapper;
