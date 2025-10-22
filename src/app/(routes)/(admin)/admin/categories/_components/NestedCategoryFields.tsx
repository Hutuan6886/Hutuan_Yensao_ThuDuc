"use client";
import React from "react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import { CategoryType } from "@/types";
import { NestedCategorySchema } from "../_form_schema";
import DeleteFieldArrayButton from "@/components/ui/DeleteFieldArrayButton";
import AddFieldArrayButton from "@/components/ui/AddFieldArrayButton";

interface NestedCategoryFieldsProps {
  form: UseFormReturn<NestedCategorySchema>;
  name: string;
  fieldName: string;
  depth?: number;
  categoryData: CategoryType | null;
}

const MAX_DEPTH: number = 2;
const NestedCategoryFields: React.FC<NestedCategoryFieldsProps> = ({
  form,
  name,
  fieldName,
  depth = 0,
  categoryData,
}) => {
  const { control } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: name === "root" ? "children" : `${name}.children`,
  });
  const baseName = name === "root" ? "name" : `${name}.name`;

  return (
    <div className={cn("space-y-3", depth > 0 && "border-l-2 pl-4")}>
      {/* Category name input */}
      <FormField
        control={control}
        name={baseName}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder={`${fieldName}`} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Subcategories */}
      <div className="ml-2 flex flex-col gap-4">
        {fields.map((field, index) => (
          <div key={field.id} className="mt-3">
            <NestedCategoryFields
              form={form}
              name={`${
                name === "root" ? "children" : `${name}.children`
              }[${index}]`}
              fieldName={
                depth === 0
                  ? categoryData
                    ? `Danh mục con thứ ${index + 1} của ${categoryData.name}`
                    : `Danh mục con thứ ${index + 1}`
                  : categoryData
                  ? `Danh mục cháu thứ ${index + 1} của ${categoryData.name}`
                  : `Danh mục cháu thứ ${index + 1}`
              }
              depth={depth + 1}
              categoryData={categoryData}
            />
            <DeleteFieldArrayButton
              label="Xóa danh mục con"
              onClick={() => remove(index)}
            />
          </div>
        ))}
        {/* Add Subcategory */}
        {depth < MAX_DEPTH && (
          <AddFieldArrayButton
            label="Thêm danh mục con"
            onClick={() => append({ name: "", children: [] })}
          />
        )}
      </div>
    </div>
  );
};

export default NestedCategoryFields;
