"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { CarouselFormSchema } from "../_form_schema";
import { createCarousel, updateCarousel } from "@/services/carousel";

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
import { useRouter } from "next/navigation";
import { CarouselType } from "@/types";

interface CarouselFormProps {
  formData: CarouselType | null;
}

const CarouselForm: React.FC<CarouselFormProps> = ({ formData }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const carouselForm = useForm<z.infer<typeof CarouselFormSchema>>({
    resolver: zodResolver(CarouselFormSchema),
    defaultValues: !formData
      ? {
          image: {
            href: "",
            alt: "",
          },
          url: "#",
        }
      : {
          image: {
            href: formData.image.href,
            alt: formData.image.alt,
          },
          url: formData.url,
        },
  });
  const onSubmit = async (data: z.infer<typeof CarouselFormSchema>) => {
    setIsLoading(true);
    if (!formData)
      await createCarousel(data).finally(() => router.push("/admin/carousels"));
    else
      await updateCarousel(formData.id, data).finally(() =>
        router.push("/admin/carousels")
      );
  };

  return (
    <Form {...carouselForm}>
      <form
        onSubmit={carouselForm.handleSubmit(onSubmit)}
        className="flex flex-col gap-8"
      >
        <FormField
          disabled={isLoading}
          control={carouselForm.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="">
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
                  onUploaded={(url, alt) => {
                    // ✅ Khi upload xong, cập nhật form
                    field.onChange({ href: url, alt });
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
          {formData ? "Cập nhật" : "Tạo mới"}
        </Button>
      </form>
    </Form>
  );
};

export default CarouselForm;
