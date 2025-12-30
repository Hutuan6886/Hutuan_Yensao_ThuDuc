"use client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { CarouselType } from "@/types";
import ActionTableButton from "@/components/ui/ActionTableButton";
import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";

export const columns = ({
  onEdit,
  onDelete,
}: {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}): ColumnDef<CarouselType>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "image",
    header: () => <div className="font-semibold">Ảnh </div>,
    cell: ({ row }) => (
      <Image
        src={row.original.image!.href}
        alt={row.original.image!.alt}
        width={1200}
        height={900}
        className="w-auto"
      />
    ),
  },
  {
    accessorKey: "url",
    header: () => <div className="font-semibold">Đường dẫn ảnh bìa</div>,
    cell: ({ getValue }) => <div>{getValue<string>()}</div>,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <div className="font-semibold">Thời gian tạo</div>,
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
    cell: ({ row }) => (
      <div className="flex gap-4">
        <ActionTableButton
          variant="edit"
          onClick={() => onEdit(row.original.id)}
        >
          Chỉnh sửa
        </ActionTableButton>
        <ActionTableButton
          variant="delete"
          onClick={() => onDelete(row.original.id)}
        >
          Xóa
        </ActionTableButton>
      </div>
    ),
  },
];
