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

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  activeFilterColumn: string;
}

const DataTable = <TData extends { id: string }, TValue>({
  columns,
  data,
  activeFilterColumn,
}: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [rowSelection, setRowSelection] = useState({});

  const productTable = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange:setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <Input
        placeholder={`Lọc theo ${
          activeFilterColumn === "label" ? "tên sản phẩm" : "danh mục sản phẩm"
        }...`}
        value={
          (productTable
            .getColumn(activeFilterColumn)
            ?.getFilterValue() as string) ?? ""
        }
        onChange={(event) =>
          productTable
            .getColumn(activeFilterColumn)
            ?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
      />
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {productTable.getHeaderGroups().map((headerGroup) => (
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
            {productTable.getRowModel().rows.length ? (
              productTable.getRowModel().rows.map((row) => (
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
      <DataTablePagination table={productTable} />
    </div>
  );
};

export default DataTable;
