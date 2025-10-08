"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
const CarouselForm = () => {
  const CarouselFormSchema = z.object({
    image: z.object({
      href: z.string(),
      alt: z.string(),
    }),
    url: z.string(),
  });
  const carouselForm = useForm<z.infer<typeof CarouselFormSchema>>({
    resolver: zodResolver(CarouselFormSchema),
    defaultValues: {
      image: {
        href: "",
        alt: "",
      },
      url: "",
    },
  });

  const onSubmit = (data: z.infer<typeof CarouselFormSchema>) => {
    console.log("Carousel Form", data);
  };
  return (
    <Form {...carouselForm}>
      <form
        onSubmit={carouselForm.handleSubmit(onSubmit)}
        className="flex flex-col gap-8"
      >
        <FormField
          control={carouselForm.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="">
                Đường dẫn điều hướng cho ảnh bìa:
              </FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        {/*Image -----------------------------------------*/}
        <FormField
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
            </FormItem>
          )}
        />
        <Button type="submit" className="cursor-pointer">
          Tạo Mới
        </Button>
      </form>
    </Form>
  );
};

export default CarouselForm;
