"use client";
// import {
//   ColumnDef,
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
//   RowData,
// } from "@tanstack/react-table";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Fragment, useState } from "react";
// import { CategoryWithSub } from "@/types";
// import { format } from "date-fns";

// interface DataTableProps<TData, TValue> {
//   columns: ColumnDef<TData, TValue>[];
//   data: TData[];
// }

// export function DataTable<TData extends RowData, TValue>({
//   columns,
//   data,
// }: DataTableProps<TData, TValue>) {
//   const [openRowId, setOpenRowId] = useState<string | null>(null);

//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     getSubRows: (row) => (row as any).children ?? [],
//   });

//   const toggleRow = (id: string) => {
//     setOpenRowId((prev) => (prev === id ? null : id));
//   };

//   return (
//     <div className="overflow-hidden rounded-md border">
//       <Table>
//         <TableHeader>
//           {table.getHeaderGroups().map((headerGroup) => (
//             <TableRow key={headerGroup.id}>
//               {headerGroup.headers.map((header) => (
//                 <TableHead key={header.id}>
//                   {header.isPlaceholder
//                     ? null
//                     : flexRender(
//                         header.column.columnDef.header,
//                         header.getContext()
//                       )}
//                 </TableHead>
//               ))}
//             </TableRow>
//           ))}
//         </TableHeader>
//         <TableBody>
//           {table.getRowModel().rows?.length ? (
//             table.getRowModel().rows.map((row) => (
//               <TableRow
//                 key={row.id}
//                 data-state={row.getIsSelected() && "selected"}
//                 onClick={() => toggleRow(row.id)}
//               >
//                 {row.getVisibleCells().map((cell) => (
//                   <TableCell key={cell.id}>
//                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             ))
//           ) : (
//             <TableRow>
//               <TableCell colSpan={columns.length} className="h-24 text-center">
//                 No results.
//               </TableCell>
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>
//     </div>
//   );
// }
{
  /*-----------------------------------------------------------------------------*/
}
// import React, { useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { CategoryWithSub } from "@/types";
// import { format } from "date-fns";

// interface DataTableProps {
//   data: CategoryWithSub[];
// }

// export function DataTable({ data }: DataTableProps) {
//   const [openRowId, setOpenRowId] = useState<string | null>(null);

//   const toggleRow = (id: string) => {
//     setOpenRowId((prev) => (prev === id ? null : id));
//   };

//   return (
//     <div className="overflow-hidden rounded-md border">
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Tên danh mục</TableHead>
//             <TableHead>Thời gian tạo</TableHead>
//             <TableHead>Thời gian cập nhật</TableHead>
//             <TableHead>Actions</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {data.map((category) => {
//             const isOpen = openRowId === category.id;
//             return (
//               <React.Fragment key={category.id}>
//                 {/* Row chính */}
//                 <TableRow
//                   className="cursor-pointer hover:bg-gray-50"
//                   onClick={() => toggleRow(category.id)}
//                 >
//                   <TableCell className="flex items-center gap-2">
//                     <span
//                       className={`inline-block w-3 h-3 border border-gray-400 rounded-full transform transition-transform ${
//                         isOpen ? "rotate-45" : "rotate-0"
//                       }`}
//                     ></span>
//                     {category.name}{" "}
//                     {category.children.length > 0 && (
//                       <span className="text-sm text-gray-500">
//                         ({category.children.length})
//                       </span>
//                     )}
//                   </TableCell>
//                   <TableCell>
//                     {format(new Date(category.createdAt), "dd/MM/yyyy HH:mm")}
//                   </TableCell>
//                   <TableCell>
//                     {format(new Date(category.updatedAt), "dd/MM/yyyy HH:mm")}
//                   </TableCell>
//                   <TableCell className="flex gap-2">
//                     <button className="text-blue-500 hover:underline">
//                       Edit
//                     </button>
//                     <button className="text-red-500 hover:underline">
//                       Delete
//                     </button>
//                   </TableCell>
//                 </TableRow>

//                 {/* Row con */}
//                 {isOpen && category.children.length > 0 && (
//                   <TableRow>
//                     <TableCell colSpan={4} className="p-0 border-none">
//                       <div className="overflow-hidden transition-all duration-300">
//                         {category.children.map((child) => (
//                           <div
//                             key={child.id}
//                             className="p-2 pl-8 border-b last:border-b-0 bg-gray-50 flex justify-between"
//                           >
//                             <span>{child.name}</span>
//                             <span className="text-sm text-gray-400">
//                               {format(new Date(child.createdAt), "dd/MM/yyyy")}
//                             </span>
//                           </div>
//                         ))}
//                       </div>
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </React.Fragment>
//             );
//           })}
//         </TableBody>
//       </Table>
//     </div>
//   );
// }
{
  /*-----------------------------------------------------------------------------*/
}
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
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
import TreeRow from "./TreeRow";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData extends { children?: TData[] }, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const categoryTable = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSubRows: (row) => (row as any).children ?? [],
  });

  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader>
          {categoryTable.getHeaderGroups().map((headerGroup) => (
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
          {categoryTable.getRowModel().rows?.length ? (
            categoryTable
              .getRowModel()
              .rows.map((row) => (
                <TreeRow<TData> key={row.id} row={row} columns={columns} />
              ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
