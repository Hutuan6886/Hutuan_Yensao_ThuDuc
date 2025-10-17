"use client";
import { TableCell, TableRow } from "@/components/ui/table";
import { ColumnDef, flexRender, Row } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";
import React from "react";

const TreeRow = <TData extends { children?: TData[] }>({
  row,
  columns,
}: {
  row: Row<TData>;
  columns: ColumnDef<TData, any>[];
}) => {
  const isExpanded = row.getIsExpanded();
  const hasChildren = row.subRows.length > 0;
  const level = row.depth ?? 0;

  return (
    <>
      <TableRow>
        {row.getVisibleCells().map((cell, index) => (
          <TableCell
            key={cell.id}
            className={`${level === 0 ? "bg-white" : "bg-zinc-50"}`}
          >
            <div
              className="flex items-center"
              style={{
                paddingLeft: index === 0 ? `${level * 20}px` : undefined,
              }}
            >
              {/* Toggle icon ở cột đầu tiên */}
              {index === 0 && hasChildren && (
                <button
                  type="button"
                  onClick={row.getToggleExpandedHandler()}
                  className="mr-2 rounded-sm hover:bg-accent p-1 cursor-pointer"
                >
                  <ChevronRight
                    className={`size-4 ${
                      !isExpanded ? "" : "rotate-90"
                    } transition`}
                  />
                </button>
              )}

              {/* Render nội dung cell */}
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </div>
          </TableCell>
        ))}
      </TableRow>

      {/* SubRows đệ quy */}
      {isExpanded &&
        row.subRows.map((subRow: any) => (
          <TreeRow key={subRow.id} row={subRow} columns={columns} />
        ))}
    </>
  );
};

export default TreeRow;
