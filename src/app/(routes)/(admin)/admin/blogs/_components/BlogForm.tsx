"use client";
import React from "react";
import Tiptap from "@/app/(routes)/(admin)/_components/Tiptap";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useLoading from "@/hooks/useLoading";
import { blogFormSchema } from "../_form_schema";
import { Button } from "@/components/ui/button";
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
import { BlogType } from "@/types";
import { createBlog, updateBlog } from "@/services/blog";
import { useRouter } from "next/navigation";
import FormContainer from "@/components/admin/Containers/FormContainer";

interface BlogFormProps {
  blogData: BlogType | null;
}

const BlogForm: React.FC<BlogFormProps> = ({ blogData }) => {
  const router = useRouter();
  const blogForm = useForm<z.infer<typeof blogFormSchema>>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: blogData ?? {
      title: "",
      thumbnail: {},
      content: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof blogFormSchema>) => {
    console.log("blog form", data);
    if (!blogData)
      await createBlog(data).then(() => {
        router.push("/admin/blogs");
        router.refresh();
      });
    else
      await updateBlog(blogData.id, data).then(() => {
        router.push("/admin/blogs");
        router.refresh();
      });
  };
  const { isLoading, run } = useLoading(onSubmit);

  return (
    <Form {...blogForm}>
      <FormContainer onSubmit={blogForm.handleSubmit(run)}>
        <FormField
          control={blogForm.control}
          name="thumbnail"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Hình ảnh bài viết</FormLabel>
              <FormControl>
                <ImageUploader
                  value={field.value} // chứa {href, alt}, có thể dùng để hiển thị preview
                  uploadToFolderName="blogs"
                  onUploaded={(id, href, alt) => {
                    // ✅ Khi upload xong, cập nhật form
                    field.onChange({ id, href, alt });
                  }}
                  imageClassName="size-auto"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={blogForm.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Tiêu đề bài viết</FormLabel>
              <FormControl>
                <Input {...field} />
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
                <Tiptap
                  value={field.value}
                  onChange={(content) => field.onChange(content)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} type="submit" className="cursor-pointer">
          {blogData ? "Cập nhật" : "Tạo mới"}
        </Button>
      </FormContainer>
    </Form>
  );
};

export default BlogForm;
