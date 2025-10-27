"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import useLoading from "@/hooks/useLoading";
import { CategoryType } from "@/types";
import { createCategory, updateCategory } from "@/services/category";
import { categoryFormSchema, NestedCategorySchema } from "../_form_schema";
import NestedCategoryFields from "./NestedCategoryFields";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

interface CategoryFormProps {
  categoryData: CategoryType | null;
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
    if (!categoryData)
      await createCategory(data).then(() => router.push("/admin/categories"));
    else
      await updateCategory(categoryData.id, data).then(() =>
        router.push("/admin/categories")
      );
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
