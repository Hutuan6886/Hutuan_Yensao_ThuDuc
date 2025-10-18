"use client";
import { CategoryType } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const columns = ({
  onEdit,
  onDelete,
}: {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}): ColumnDef<CategoryType>[] => [
  {
    accessorKey: "name",
    header: "Tên danh mục",
    cell: ({ row, getValue }) => {
      const category = row.original;
      const level = row.depth ?? 0; // row.depth có thể dùng để indent
      return (
        <div style={{ paddingLeft: `${level * 20}px` }}>
          {getValue<string>()}{" "}
          {category.children.length > 0 && (
            <span className="text-sm text-gray-500">
              ({category.children.length})
            </span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Thời gian tạo",
    cell: ({ getValue }) =>
      getValue<Date>()
        ? format(new Date(getValue<Date>()), "dd/MM/yyyy HH:mm")
        : "-",
  },
  {
    accessorKey: "updatedAt",
    header: "Thời gian cập nhật",
    cell: ({ getValue }) =>
      getValue<Date>()
        ? format(new Date(getValue<Date>()), "dd/MM/yyyy HH:mm")
        : "-",
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      const level: number = row.depth;
      const category = row.original;
      /* Chỉ hiện button action ở parent row*/
      if (level !== 0) return null;
      return (
        <div className="flex gap-4">
          <button
            className="text-blue-500 hover:underline transition cursor-pointer"
            onClick={() => onEdit(category.id)}
          >
            Chỉnh sửa
          </button>
          <button
            className="text-red-500 hover:underline transition cursor-pointer"
            onClick={() => onDelete(category.id)}
          >
            Xóa
          </button>
        </div>
      );
    },
  },
];
