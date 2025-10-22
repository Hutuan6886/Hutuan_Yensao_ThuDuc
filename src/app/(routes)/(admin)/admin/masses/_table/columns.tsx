import ActionTableButton from "@/components/ui/ActionTableButton";
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
    header: () => <div className="font-semibold">Giá trị</div>,
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
      const mass = row.original;
      return (
        <div className="flex gap-4">
          <ActionTableButton variant="edit" onClick={() => onEdit(mass.id)}>
            Chỉnh sửa
          </ActionTableButton>
          <ActionTableButton variant="delete" onClick={() => onDelete(mass.id)}>
            Xóa
          </ActionTableButton>
        </div>
      );
    },
  },
];
