import z from "zod";
import { categoryFormSchema } from "../../categories/_form_schema";

export const productFormSchema = z.object({
  label: z.string().nonempty("Vùi lòng điền tên sản phẩm"),
  images: z
    .array(z.object({ href: z.string(), alt: z.string() }))
    .min(1, "Vùi lòng thêm hình ảnh sản phẩm"),
  category: categoryFormSchema,
  productMass: z.array(
    z.object({
      id: z.string().nonempty(),
      price: z.number(),
      discount: z.number(),
      massId: z.string(),
    })
  ),
  notion: z.array(
    z.object({
      id: z.string().nonempty(),
      title: z.string().min(1, "Vui lòng nhập tiêu đề"),
      content: z.string().min(1, "Vui lòng nhập chú thích"),
    })
  ),
  description: z.array(
    z.object({
      title: z.string(),
      image: z
        .object({
          href: z.string(),
          alt: z.string(),
        })
        .nullable(),
      content: z.string(),
    })
  ),
});
