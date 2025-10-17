"use client";
import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import { Mass } from "@prisma/client";
import { usePopup } from "@/stores/pop-up/usePopup";
import useLoading from "@/hooks/useLoading";
import { deleteMass } from "@/services/mass";
import { columns } from "./columns";
import DataTable from "./data-table";
import Popup from "@/components/ui/Popup";

interface DataTableWrapperProps {
  massesData: Mass[];
}
const DataTableWrapper: React.FC<DataTableWrapperProps> = ({ massesData }) => {
  const idItem = useRef<string>(null);
  const router = useRouter();
  const {
    content: { title, message, submitPopup },
    isPopupOpen,
    setPopupOpen,
    closePopup,
  } = usePopup((state) => state);
  const onEdit = (id: string) => {
    router.push(`/admin/masses/${id}`);
  };

  const handleDelete = async (signal?: AbortSignal) => {
    await deleteMass(idItem.current as string, signal);
    router.refresh();
  };
  const { isLoading, run, cancelRequest } = useLoading(handleDelete);

  const onDelete = async (id: string) => {
    idItem.current = id;
    setPopupOpen({
      title: "Bạn muốn xóa khối lượng này?",
      message: "Khối lượng này sẽ bị xóa vĩnh viễn",
      submitPopup: async () => run(),
    });
  };
  const cols = columns({
    //* pass 2 function to columns
    onEdit,
    onDelete,
  });
  return (
    <>
      <DataTable columns={cols} data={massesData} />
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
