"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { CarouselType } from "@/types";
import { createCarousel, updateCarousel } from "@/services/carousel";
import { carouselFormSchema } from "../_form_schema";
import useLoading from "@/hooks/useLoading";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ImageUploader } from "@/components/ui/ImageUploader";
import FormContainer from "@/components/admin/Containers/FormContainer";

interface CarouselFormProps {
  carouselData: CarouselType | null;
}

const CarouselForm: React.FC<CarouselFormProps> = ({ carouselData }) => {
  const router = useRouter();
  const carouselForm = useForm<z.infer<typeof carouselFormSchema>>({
    resolver: zodResolver(carouselFormSchema),
    defaultValues: carouselData ?? {
      image: {
        id: "",
        href: "",
        alt: "",
      },
      url: "#",
    },
  });
  const onSubmit = async (data: z.infer<typeof carouselFormSchema>) => {
    if (!carouselData)
      await createCarousel(data).finally(() => {
        router.push("/admin/carousels");
        router.refresh();
      });
    else
      await updateCarousel(carouselData.id, data).finally(() => {
        router.push("/admin/carousels");
        router.refresh();
      });
  };
  const { isLoading, run } = useLoading(onSubmit);

  return (
    <Form {...carouselForm}>
      <FormContainer onSubmit={carouselForm.handleSubmit(run)}>
        <FormField
          disabled={isLoading}
          control={carouselForm.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">
                Đường dẫn điều hướng cho ảnh bìa:
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="https://domain.com/user/..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled={isLoading}
          control={carouselForm.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <ImageUploader
                  value={field.value} // chứa {href, alt}, có thể dùng để hiển thị preview
                  uploadToFolderName="carousels"
                  onUploaded={(id, href, alt) => {
                    // ✅ Khi upload xong, cập nhật form
                    field.onChange({ id, href, alt });
                  }}
                />
              </FormControl>
              {carouselForm.formState.errors.image?.href && (
                <p className="text-sm font-medium text-destructive">
                  {carouselForm.formState.errors.image?.href?.message}
                </p>
              )}
            </FormItem>
          )}
        />
        <Button disabled={isLoading} type="submit" className="cursor-pointer">
          {carouselData ? "Cập nhật" : "Tạo mới"}
        </Button>
      </FormContainer>
    </Form>
  );
};

export default CarouselForm;
