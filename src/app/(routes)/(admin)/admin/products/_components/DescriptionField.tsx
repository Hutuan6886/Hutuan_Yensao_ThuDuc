"use client";
import React from "react";
import {z} from "zod";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { productFormSchema } from "../_form schema";
import { Input } from "@/components/ui/input";
import { ImageUploader } from "@/components/ui/ImageUploader";
import AddFieldArrayButton from "@/components/ui/AddFieldArrayButton";
import DeleteFieldArrayButton from "@/components/ui/DeleteFieldArrayButton";
import AutoResizeTextarea from "@/components/ui/AutoResizeTextarea";

interface DescriptionFieldProps {
  form: UseFormReturn<z.infer<typeof productFormSchema>>;
}
const DescriptionField: React.FC<DescriptionFieldProps> = ({ form }) => {
  const { control, register, watch, setValue } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "description",
  });

  return (
    <div className="flex flex-col gap-16">
      {fields.map((field, index) => {
        const imageValue = watch("description")[index].image ?? undefined;
        return (
          <div key={field.id} className="grid grid-cols-2 items-start gap-6">
            <div className="col-span-1 flex flex-col gap-6">
              <Input
                type="text"
                placeholder="Tiêu đề"
                {...register(`description.${index}.title`)}
              />
              <AutoResizeTextarea
                placeholder="Điền nội dung mô tả..."
                {...register(`description.${index}.content`)}
              />
              <DeleteFieldArrayButton
                label="Xóa mô tả"
                onClick={() => remove(index)}
              />
            </div>
            <div className="col-span-1">
              <ImageUploader
                value={imageValue}
                uploadToFolderName="products/description"
                onUploaded={(href, alt) => {
                  setValue(`description.${index}.image`, {
                    href,
                    alt,
                  });
                }}
              />
            </div>
          </div>
        );
      })}
      <AddFieldArrayButton
        label="Thêm mô tả"
        onClick={() => append({ title: "", content: "", image: null })}
      />
    </div>
  );
};

export default DescriptionField;
