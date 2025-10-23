"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { productFormSchema } from "../_form schema";
import { z } from "zod";
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
import SelectCategoryField from "./SelectCategoryField";
import MassPriceField from "./MassPriceField";
import { Mass } from "@prisma/client";
import NotionField from "./NotionField";
import DescriptionField from "./DescriptionField";
import { createProduct, updateProduct } from "@/services/product";
import { useRouter } from "next/navigation";
import useLoading from "@/hooks/useLoading";

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
  const router = useRouter();
  const productForm = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: product ?? {
      label: "",
      images: [],
      category: {},
      productMass: [],
      notion: [],
      description: [],
    },
  });

  const onSubmit = async (data: z.infer<typeof productFormSchema>) => {
    if (!product) {
      await createProduct(data).then(() => {
        router.push("/admin/products");
      });
    } else {
      await updateProduct(product.id, data).then(() => {
        router.push("/admin/products");
      });
    }
  };
  const { isLoading, run } = useLoading(onSubmit);
  return (
    <Form {...productForm}>
      <form
        onSubmit={productForm.handleSubmit(run)}
        className="flex flex-col gap-16"
      >
        <FormField
          control={productForm.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Tên sản phẩm</FormLabel>
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
                  uploadToFolderName="products/images"
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
              <FormLabel className="font-semibold">Danh mục sản phẩm</FormLabel>
              <FormControl>
                <SelectCategoryField
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
              <FormLabel className="font-semibold">Giá sản phẩm</FormLabel>
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
              <FormLabel className="font-semibold">Ghi chú sản phẩm</FormLabel>
              <FormControl>
                <NotionField form={productForm} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={productForm.control}
          name="description"
          render={() => (
            <FormItem>
              <FormLabel className="font-semibold">Mô tả sản phẩm</FormLabel>
              <FormControl>
                <DescriptionField form={productForm} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} type="submit" className="cursor-pointer">
          {product ? "Cập nhật" : "Tạo mới"}
        </Button>
      </form>
    </Form>
  );
};

export default ProductForm;
