import z from "zod";

export const blogFormSchema = z.object({
  title: z.string().nonempty("Tiêu đề không được trống"),
  content: z.any().refine((data) => !!data, "Nội dung không được trống"),
  thumbnail: z
    .object({
      id: z.string(),
      href: z.string(),
      alt: z.string(),
    })
    .nullable(),
});
