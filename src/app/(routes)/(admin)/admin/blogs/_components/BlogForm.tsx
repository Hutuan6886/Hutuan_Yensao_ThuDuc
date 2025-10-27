"use client";
import Tiptap from "@/components/admin/Tiptap";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ImageUploader } from "@/components/ui/ImageUploader";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const blogFormSchema = z.object({
  title: z.string().min(3, "Tiêu đề phải có ít nhất 3 ký tự"),
  content: z.any().refine((data) => !!data, "Nội dung không được trống"),
  thumbnail: z
    .object({
      id: z.string(),
      href: z.string(),
      alt: z.string(),
    })
    .optional(),
});
const BlogForm = () => {
  const blogForm = useForm<z.infer<typeof blogFormSchema>>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      title: "",
      thumbnail: {
        id: "",
        href: "",
        alt: "",
      },
      content: "",
    },
  });
  const onSubmit = (data: z.infer<typeof blogFormSchema>) => {};
  return (
    <Form {...blogForm}>
      <form
        onSubmit={blogForm.handleSubmit(onSubmit)}
        className="flex flex-col gap-8"
      >
        <FormField
          control={blogForm.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Tiêu đề bài viết</FormLabel>
              <FormControl>
                <Input {...field}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={blogForm.control}
          name="thumbnail"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <ImageUploader
                  value={field.value} // chứa {href, alt}, có thể dùng để hiển thị preview
                  uploadToFolderName="blogs"
                  onUploaded={(id, href, alt) => {
                    // ✅ Khi upload xong, cập nhật form
                    field.onChange({ id, href, alt });
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={blogForm.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Nội dung bài viết</FormLabel>
              <FormControl>
                <Tiptap />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default BlogForm;
