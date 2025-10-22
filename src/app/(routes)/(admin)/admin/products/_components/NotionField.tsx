"use client";
import React from "react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import {z} from "zod";
import { productFormSchema } from "../_form schema";
import { Input } from "@/components/ui/input";
import DeleteFieldArrayButton from "@/components/ui/DeleteFieldArrayButton";
import AddFieldArrayButton from "@/components/ui/AddFieldArrayButton";

interface NotionFieldProps {
  form: UseFormReturn<z.infer<typeof productFormSchema>>;
}
const NotionField: React.FC<NotionFieldProps> = ({ form }) => {
  const { control, register } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "notion",
  });
  return (
    <div className="flex flex-col justify-center gap-4">
      {fields.map((field, index) => (
        <div key={field.id} className="flex flex-row gap-3 items-center">
          <Input placeholder="Tiêu đề" {...register(`notion.${index}.title`)} />
          <Input
            placeholder="Chú thích"
            {...register(`notion.${index}.content`)}
          />
          <DeleteFieldArrayButton
            label="Xóa ghi chú"
            onClick={() => remove(index)}
          />
        </div>
      ))}
      <AddFieldArrayButton
        label="Thêm ghi chú"
        onClick={() =>
          append({ id: crypto.randomUUID(), title: "", content: "" })
        }
      />
    </div>
  );
};

export default NotionField;
