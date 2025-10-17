import { Mass } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const columns = ({
  onEdit,
  onDelete,
}: {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}): ColumnDef<Mass>[] => [
  {
    accessorKey: "value",
    header: "Giá trị",
    cell: ({ getValue }) => {
      return (
        <div>
          {getValue<number>()} <span>gram</span>
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
      const mass = row.original;
      return (
        <div className="flex gap-4">
          <button
            className="text-blue-500 hover:underline transition cursor-pointer"
            onClick={() => onEdit(mass.id)}
          >
            Chỉnh sửa
          </button>
          <button
            className="text-red-500 hover:underline transition cursor-pointer"
            onClick={() => onDelete(mass.id)}
          >
            Xóa
          </button>
        </div>
      );
    },
  },
];
