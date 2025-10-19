"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { productFormSchema } from "../_form schema";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import MultipleImagesUploader from "@/components/ui/MultipleImagesUploader";
import { Button } from "@/components/ui/button";
import { CategoryType, ProductType } from "@/types";
import SelectCategory from "./SelectCategory";

interface ProductFormProps {
  categories: CategoryType[];
  product: ProductType | null;
}
const ProductForm: React.FC<ProductFormProps> = ({ categories, product }) => {
  const productForm = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: product
      ? {
          label: product.label,
          images: product.images,
          category: product.category,
          productMass: product.productMass,
          notion: product.notion,
          description: product.description,
        }
      : {
          label: "",
          category: {
            createdAt: new Date(
              "Wed Oct 15 2025 00:03:42 GMT+0700 (Indochina Time)"
            ),
            updatedAt: new Date(
              "Wed Oct 15 2025 00:03:42 GMT+0700 (Indochina Time)"
            ),
            id: "c760baed-cc3b-4cef-91fa-2b5c019105c2",
            name: "Yến vụn đắp tổ",
            normalizedName: "yến vụn đắp tổ",
            parentId: "9a45b1d7-aef8-4f1d-85f9-8afb25ecdac2",
          },
          images: [],
          productMass: [],
          notion: [],
          description: [],
        },
  });

  const onSubmit = (data: z.infer<typeof productFormSchema>) => {
    console.log("data", data);
  };
  console.log("product data", product);
  console.log("product form", productForm.watch());
  return (
    <Form {...productForm}>
      <form
        onSubmit={productForm.handleSubmit(onSubmit)}
        className="flex flex-col gap-8"
      >
        <FormField
          control={productForm.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên sản phẩm</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={productForm.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <MultipleImagesUploader
                  value={field.value}
                  uploadToFolderName="products/product"
                  onUploaded={(images: { href: string; alt: string }[]) => {
                    field.onChange(images);
                  }}
                  onDeleted={(href: string) => {
                    field.onChange(
                      field.value.filter((img) => img.href !== href)
                    );
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={productForm.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Danh mục sản phẩm</FormLabel>
              <FormControl>
                <SelectCategory
                  categories={categories}
                  value={field.value}
                  onChange={(category) => field.onChange(category)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          // disabled={isLoading}
          type="submit"
          className="cursor-pointer"
        >
          {product ? "Cập nhật" : "Tạo mới"}
        </Button>
      </form>
    </Form>
  );
};

export default ProductForm;
