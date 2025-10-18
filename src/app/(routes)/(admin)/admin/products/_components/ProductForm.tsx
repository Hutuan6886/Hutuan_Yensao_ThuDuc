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
import { ProductType } from "@/types";

interface ProductFormProps {
  productData: ProductType | null;
}
const ProductForm: React.FC<ProductFormProps> = ({ productData }) => {
  const productForm = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: productData
      ? {
          label: productData.label,
          images: productData.images,
          category: productData.category,
          productMass: productData.productMass,
          notion: productData.notion,
          description: productData.description,
        }
      : {
          label: "",
          category: "",
          images: [],
          productMass: [],
          notion: [],
          description: [],
        },
  });

  const onSubmit = (data: z.infer<typeof productFormSchema>) => {
    console.log("data", data);
  };
  console.log("product data", productData);
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
        <Button
          // disabled={isLoading}
          type="submit"
          className="cursor-pointer"
        >
          {productData ? "Cập nhật" : "Tạo mới"}
        </Button>
      </form>
    </Form>
  );
};

export default ProductForm;
