"use client";
import Popup from "@/components/ui/Popup";
import { BlogType } from "@/types";
import React, { useRef } from "react";
import DataTable from "../_table/data-table";
import { columns } from "../_table/columns";
import useLoading from "@/hooks/useLoading";
import { usePopup } from "@/stores/pop-up/usePopup";
import { useRouter } from "next/navigation";
import { deleteBlog } from "@/services/blog";

interface DataTableWrapperProps {
  data: BlogType[];
}
const DataTableWrapper: React.FC<DataTableWrapperProps> = ({ data }) => {
  const itemId = useRef<string>(null);
  const router = useRouter();
  const { isPopupOpen, setPopupOpen, content, closePopup } = usePopup();
  const onEdit = (id: string) => router.push(`/admin/blogs/${id}`);
  const onDelete = (id: string) => {
    itemId.current = id;
    setPopupOpen({
      title: "Bạn muốn xóa bài viết này?",
      message: "Bài viết sẽ bị xóa vĩnh viễn",
      submitPopup: async () => run(),
    });
  };
  const cols = columns({ onEdit, onDelete });
  const handleDelete = async (signal?: AbortSignal) => {
    await deleteBlog(itemId.current as string, signal);
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
