"use client";
import React from "react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import z from "zod";
import { productFormSchema } from "../_form schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";

interface NotionFieldProps {
  form: UseFormReturn<z.infer<typeof productFormSchema>>;
}
const NotionField: React.FC<NotionFieldProps> = ({ form }) => {
  const { control, register } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "notion",
  });
  const handleAppendField = () => {
    append({ id: crypto.randomUUID(), title: "", content: "" });
  };
  return (
    <div className="flex flex-col justify-center gap-4">
      {fields.map((field, index) => (
        <div key={field.id} className="flex flex-row gap-3 items-center">
          <Input placeholder="Tiêu đề" {...register(`notion.${index}.title`)} />
          <Input
            placeholder="Chú thích"
            {...register(`notion.${index}.content`)}
          />
          <Button
            type="button"
            variant="ghost"
            className="text-red-500 text-sm mt-1 cursor-pointer"
            onClick={() => remove(index)}
          >
            <Trash className="w-4 h-4 mr-1" /> Xóa ghi chú
          </Button>
        </div>
      ))}

      <Button
        type="button"
        variant="secondary"
        onClick={handleAppendField}
        className="flex items-center gap-2 mt-2 cursor-pointer"
      >
        <Plus size={16} /> Thêm ghi chú
      </Button>
    </div>
  );
};

export default NotionField;
