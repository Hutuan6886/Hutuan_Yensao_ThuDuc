import React from "react";
import { useFieldArray } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/libs/utils";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import { CategoryWithSub } from "@/types";

interface NestedCategoryFieldsProps {
  form: any;
  name: string;
  fieldName: string;
  depth?: number;
  categoryData: CategoryWithSub | null;
}

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
                categoryData
                  ? `Danh mục con thứ ${index + 1} của ${categoryData.name}`
                  : `Danh mục con thứ ${index + 1}`
              }
              depth={depth + 1}
              categoryData={categoryData}
            />
            <Button
              type="button"
              variant="ghost"
              className="text-red-500 text-sm mt-1 cursor-pointer"
              onClick={() => remove(index)}
            >
              <Trash className="w-4 h-4 mr-1" /> Xóa danh mục con
            </Button>
          </div>
        ))}
        {/* Add Subcategory */}
        <Button
          type="button"
          size="sm"
          variant="secondary"
          className="cursor-pointer"
          onClick={() => append({ name: "", children: [] })}
        >
          <Plus className="w-4 h-4 mr-1" /> Thêm danh mục con
        </Button>
      </div>
    </div>
  );
};

export default NestedCategoryFields;
