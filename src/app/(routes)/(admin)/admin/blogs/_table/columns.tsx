"use client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BlogType } from "@/types";
import ActionTableButton from "@/components/ui/ActionTableButton";
import { format } from "date-fns";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export const columns = ({
  onEdit,
  onDelete,
}: {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}): ColumnDef<BlogType>[] => [
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
    accessorKey: "images",
    header: () => <div className="font-semibold">Ảnh</div>,
    cell: ({ row }) => (
      <div className="w-16 h-16 relative">
        <Image
          src={row.original.thumbnail!.href}
          alt={row.original.thumbnail!.alt}
          fill
          className="object-cover rounded-md"
        />
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button
        className={`font-semibold cursor-pointer hover:bg-transparent transition-colors ${
          column.getIsSorted()
            ? "text-blue-600 hover:text-blue-600"
            : "text-black hover:text-black"
        }`}
        style={{ padding: "0" }}
        variant="ghost"
        onClick={() => {
          column.toggleSorting(column.getIsSorted() === "asc");
        }}
      >
        Tên bài viết
        <ArrowUpDown className="size-4" />
      </Button>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        className={`font-semibold cursor-pointer hover:bg-transparent transition-colors ${
          column.getIsSorted()
            ? "text-blue-600 hover:text-blue-600"
            : "text-black hover:text-black"
        }`}
        style={{ padding: "0" }}
        variant="ghost"
        onClick={() => {
          column.toggleSorting(column.getIsSorted() === "asc");
        }}
      >
        Thời gian tạo
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    cell: ({ getValue }) =>
      getValue<Date>()
        ? format(new Date(getValue<Date>()), "dd/MM/yyyy HH:mm")
        : "-",
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <Button
        className={`font-semibold cursor-pointer hover:bg-transparent transition-colors ${
          column.getIsSorted()
            ? "text-blue-600 hover:text-blue-600"
            : "text-black hover:text-black"
        }`}
        style={{ padding: "0" }}
        variant="ghost"
        onClick={() => {
          column.toggleSorting(column.getIsSorted() === "asc");
        }}
      >
        Thời gian cập nhật
        <ArrowUpDown className="size-4" />
      </Button>
    ),
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
