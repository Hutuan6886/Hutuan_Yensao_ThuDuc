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
import SelectCategory from "./SelectCategoryField";
import MassPriceField from "./MassPriceField";
import { Mass } from "@prisma/client";
import NotionField from "./NotionField";

interface ProductFormProps {
  categories: CategoryType[];
  masses: Mass[];
  product: ProductType | null;
}
const ProductForm: React.FC<ProductFormProps> = ({
  categories,
  masses,
  product,
}) => {
  const productForm = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: product
      ? product
      : {
          label: "",
          images: [],
          category: {},
          productMass: [],
          notion: [],
          description: [],
        },
  });

  const onSubmit = (data: z.infer<typeof productFormSchema>) => {
    console.log("data", data);
  };
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
        <FormField
          control={productForm.control}
          name="productMass"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Giá sản phẩm</FormLabel>
              <FormControl>
                <MassPriceField
                  masses={masses}
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={productForm.control}
          name="notion"
          render={() => (
            <FormItem>
              <FormLabel>Ghi chú sản phẩm</FormLabel>
              <FormControl>
                <NotionField form={productForm} />
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
