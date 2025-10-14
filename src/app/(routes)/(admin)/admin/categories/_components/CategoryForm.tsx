"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCategory, updateCategory } from "@/services/category";
import useLoading from "@/hooks/useLoading";
import { CategoryWithSub } from "@/types";
import { categoryFormSchema, NestedCategorySchema } from "../_form_schema";
import NestedCategoryFields from "./NestedCategoryFields";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

interface CategoryFormProps {
  categoryData: CategoryWithSub | null;
}
const CategoryForm: React.FC<CategoryFormProps> = ({ categoryData }) => {
  const router = useRouter();
  const categoryForm = useForm<NestedCategorySchema>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: !categoryData
      ? {
          name: "",
          children: [],
        }
      : {
          name: categoryData.name,
          children: categoryData.children,
        },
  });
  const onSubmit = async (data: NestedCategorySchema) => {
    console.log("category form", data);
    if (!categoryData)
      await createCategory(data).then(() => {
        router.refresh();
        categoryForm.reset({
          name: "",
          children: [],
        });
      });
    else
      await updateCategory(categoryData.id, data).then(() => {
        router.refresh();
        categoryForm.reset({
          name: "",
          children: [],
        });
      });
  };
  const { isLoading, run } = useLoading(onSubmit);
  return (
    <Form {...categoryForm}>
      <form
        onSubmit={categoryForm.handleSubmit(run)}
        className="flex flex-col justify-center gap-8"
      >
        <NestedCategoryFields
          form={categoryForm}
          name="root"
          fieldName="Danh mục chính"
          categoryData={categoryData}
        />

        <Button disabled={isLoading} type="submit" className="cursor-pointer">
          {categoryData ? "Cập nhật" : "Tạo mới"}
        </Button>
      </form>
    </Form>
  );
};

export default CategoryForm;
