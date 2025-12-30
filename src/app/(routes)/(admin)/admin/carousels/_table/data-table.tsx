"use client";
import React, { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "@/components/ui/DataTablePaginationProps";
import useLoading from "@/hooks/useLoading";
import { usePopup } from "@/stores/pop-up/usePopup";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const DataTable = <TData extends { id: string }, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) => {
  const carouselTable = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const { setPopupOpen } = usePopup();
  const handleDeleteMultipleRow = async () => {
    const carouselId: string[] = carouselTable
      .getSelectedRowModel()
      .rows.map((row) => row.original.id);
    // await deleteProducts(productsId);
  };
  const { isLoading, run } = useLoading(handleDeleteMultipleRow);

  return (
    <div className="flex flex-col gap-6">
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {carouselTable.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {carouselTable.getRowModel().rows.length ? (
              carouselTable.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination
        table={carouselTable}
        isLoading={isLoading}
        onClick={() =>
          setPopupOpen({
            title: "Bạn chắc chắn muốn xóa những sản phẩm đã chọn?",
            message: "Những sản phẩm này sẽ bị xóa vĩnh viễn",
            submitPopup: async () => run(),
          })
        }
      />
    </div>
  );
};

export default DataTable;
