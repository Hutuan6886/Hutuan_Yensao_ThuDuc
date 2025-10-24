"use client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ProductType } from "@/types";
import ActionTableButton from "@/components/ui/ActionTableButton";
import { formatterCurrency } from "@/lib/utils";
import { format } from "date-fns";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export const columns = ({
  setActiveFilterColumn,
  onEdit,
  onDelete,
}: {
  setActiveFilterColumn: (colId: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}): ColumnDef<ProductType>[] => [
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
    header: () => <div className="font-semibold">Ảnh </div>,
    cell: ({ row }) => (
      <div className="w-16 h-16 relative">
        <Image
          src={row.original.images[0].href}
          alt={row.original.images[0].alt}
          fill
          className="object-cover rounded-md"
        />
      </div>
    ),
  },
  {
    accessorKey: "label",
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
          setActiveFilterColumn(column.id);
          column.toggleSorting(column.getIsSorted() === "asc");
        }}
      >
        Tên sản phẩm
        <ArrowUpDown className="size-4" />
      </Button>
    ),
  },
  {
    accessorKey: "category.name",
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
          setActiveFilterColumn(column.id);
          column.toggleSorting(column.getIsSorted() === "asc");
        }}
      >
        Danh mục
        <ArrowUpDown className="size-4" />
      </Button>
    ),
  },
  {
    accessorKey: "productMass",
    header: () => <div className="font-semibold">Giá (VND)</div>,
    cell: ({ row }) => (
      <div>
        {row.original.productMass.map((item) => (
          <div key={item.id}>
            {item.mass!.value} gram - {formatterCurrency.format(item.price)} -{" "}
            {item.discount}% ={" "}
            {formatterCurrency.format(
              item.price - (item.price * item.discount) / 100
            )}
          </div>
        ))}
      </div>
    ),
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
