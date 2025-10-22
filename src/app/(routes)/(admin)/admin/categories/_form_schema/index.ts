import { z } from "zod";
const namePattern = /^(?=.*\p{L})(?! +$)[\p{L}\p{M} ]+$/u;
export const categoryFormSchema: any = z.lazy(() =>
  z.object({
    name: z.string().min(2, "Name is required").regex(namePattern, {
      message: "Danh mục không chứa các kí tự đặc biệt",
    }),
    children: z.array(categoryFormSchema).default([]),
  })
);

export type NestedCategorySchema = z.infer<typeof categoryFormSchema>;
