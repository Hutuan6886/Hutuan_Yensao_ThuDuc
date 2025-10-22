"use client";
import ActionTableButton from "@/components/ui/ActionTableButton";
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
    header: () => <div className="font-semibold">Tên danh mục</div>,
    cell: ({ row, getValue }) => {
      const category = row.original;
      const level = row.depth ?? 0; // row.depth có thể dùng để indent
      return (
        <div
          style={{ paddingLeft: `${level * 20}px` }}
          className="flex flex-row items-center gap-2"
        >
          {getValue<string>()}
          {category.children && category.children.length > 0 && (
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
    header: () => <div className="font-semibold">Thời gian tạo</div>,
    cell: ({ getValue }) =>
      getValue<Date>()
        ? format(new Date(getValue<Date>()), "dd/MM/yyyy HH:mm")
        : "-",
  },
  {
    accessorKey: "updatedAt",
    header: () => <div className="font-semibold">Thời gian cập nhật</div>,
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
          <ActionTableButton variant="edit" onClick={() => onEdit(category.id)}>
            Chỉnh sửa
          </ActionTableButton>
          <ActionTableButton
            variant="delete"
            onClick={() => onDelete(category.id)}
          >
            Xóa
          </ActionTableButton>
        </div>
      );
    },
  },
];
