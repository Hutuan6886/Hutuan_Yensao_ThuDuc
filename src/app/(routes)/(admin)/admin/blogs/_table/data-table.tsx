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
import { Input } from "@/components/ui/input";
import { DataTablePagination } from "@/components/ui/DataTablePaginationProps";
import { usePopup } from "@/stores/pop-up/usePopup";
import { deleteBlogs } from "@/services/blog";
import useLoading from "@/hooks/useLoading";
import { useRouter } from "next/navigation";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const DataTable = <TData extends { id: string }, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) => {
  const router = useRouter()
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [rowSelection, setRowSelection] = useState({});

  const blogTable = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });
  const { setPopupOpen } = usePopup();
  const handleDeleteMultipleRow = async () => {
      const productsId: string[] = blogTable
        .getSelectedRowModel()
        .rows.map((row) => row.original.id);
      await deleteBlogs(productsId);
      router.refresh();
    };
    const { isLoading, run } = useLoading(handleDeleteMultipleRow);

  return (
    <div className="flex flex-col gap-6">
      <Input
        placeholder="Lọc theo tên bài viết..."
        value={
          (blogTable.getColumn("title")?.getFilterValue() as string) ?? ""
        }
        onChange={(event) =>
          blogTable.getColumn("title")?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
      />
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {blogTable.getHeaderGroups().map((headerGroup) => (
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
            {blogTable.getRowModel().rows.length ? (
              blogTable.getRowModel().rows.map((row) => (
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
      <DataTablePagination table={blogTable} label="bài viết" 
      isLoading={isLoading}
        onClick={() =>
          setPopupOpen({
            title: "Bạn chắc chắn muốn xóa những bài viết đã chọn?",
            message: "Những bài viết này sẽ bị xóa vĩnh viễn",
            submitPopup: async () => run(),
          })
        }/>
    </div>
  );
};

export default DataTable;
