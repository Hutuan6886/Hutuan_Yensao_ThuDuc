"use client";
import { Table } from "@tanstack/react-table";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Button } from "./button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import ActionTableButton from "./ActionTableButton";
import { DeleteProducts } from "@/services/product";
import Popup from "./Popup";
import { usePopup } from "@/stores/pop-up/usePopup";
import useLoading from "@/hooks/useLoading";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}
const getPageNumbers = (current: number, total: number, delta = 2) => {
  const pages: (number | string)[] = [];
  for (
    let i = Math.max(1, current - delta);
    i <= Math.min(total, current + delta);
    i++
  ) {
    pages.push(i);
  }
  if (current - delta > 1) pages.unshift("…", 1);
  if (current + delta < total) pages.push("…", total);
  return pages;
};
export function DataTablePagination<TData extends { id: string }>({
  table,
}: DataTablePaginationProps<TData>) {
  const { isPopupOpen, setPopupOpen, content, closePopup } = usePopup();
  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = table.getPageCount();
  const pages = getPageNumbers(currentPage, totalPages);

  const handleDeleteMultipleRow = async () => {
    const productsId: string[] = table
      .getSelectedRowModel()
      .rows.map((row) => row.original.id);
    await DeleteProducts(productsId);
  };
  const { isLoading, run } = useLoading(handleDeleteMultipleRow);
  return (
    <>
      <Popup
        isLoading={isLoading}
        isOpen={isPopupOpen}
        title={content.title}
        message={content.message}
        closeFunc={closePopup}
        submitFunc={content.submitPopup}
      />
      <div className="flex items-center justify-between px-2">
        <div className="flex flex-row items-center gap-2">
          {table.getSelectedRowModel().rows.length ? (
            <ActionTableButton
              variant="delete"
              onClick={() =>
                setPopupOpen({
                  title: "Bạn chắc chắn muốn xóa những sản phẩm đã chọn?",
                  message: "Những sản phẩm này sẽ bị xóa vĩnh viễn",
                  submitPopup: async () => run(),
                })
              }
            >
              Xóa tất cả
            </ActionTableButton>
          ) : (
            ""
          )}
          <div className="text-muted-foreground flex-1 text-sm">
            {table.getFilteredSelectedRowModel().rows.length} trong{" "}
            {table.getFilteredRowModel().rows.length} sản phẩm.
          </div>
        </div>
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Sản phẩm trên trang</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 25, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="hidden size-8 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Tới trang đầu</span>
              <ChevronsLeft />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Trang trước đó</span>
              <ChevronLeft />
            </Button>
            {pages.map((page, idx) =>
              typeof page === "number" ? (
                <Button
                  key={idx}
                  variant={
                    table.getState().pagination.pageIndex + 1 === page
                      ? "default"
                      : "outline"
                  }
                  size="sm"
                  className="w-8"
                  onClick={() => table.setPageIndex(page - 1)}
                >
                  {page}
                </Button>
              ) : (
                <span key={idx} className="px-2 text-muted-foreground">
                  {page}
                </span>
              )
            )}
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Trang tiếp theo</span>
              <ChevronRight />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="hidden size-8 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Tới trang cuối</span>
              <ChevronsRight />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DataTablePaginationProps;
