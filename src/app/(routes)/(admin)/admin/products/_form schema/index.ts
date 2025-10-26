import { z } from "zod";

export const productFormSchema = z.object({
  label: z.string().nonempty("Vùi lòng tạo tên sản phẩm"),
  images: z
    .array(
      z.object({
        id: z.string().nonempty(),
        href: z.string(),
        alt: z.string(),
        index: z.number(),
      })
    )
    .min(1, "Vùi lòng thêm hình ảnh sản phẩm"),
  category: z.object({
    id: z.string(),
    name: z.string(),
  }),
  productMass: z
    .array(
      z.object({
        id: z.string().nonempty(),
        price: z.number(),
        discount: z.number(),
        massId: z.string().nonempty(),
      })
    )
    .min(1, "Phải có ít nhất 1 phân loại cho sản phẩm"),
  notion: z
    .array(
      z.object({
        id: z.string().nonempty(),
        title: z.string().min(1, "Vui lòng nhập tiêu đề"),
        content: z.string().min(1, "Vui lòng nhập chú thích"),
      })
    )
    .min(1, "Phải có chú thích cho sản phẩm"),
  description: z
    .array(
      z.object({
        title: z.string(),
        image: z
          .object({
            id: z.string().nonempty(),
            href: z.string(),
            alt: z.string(),
          })
          .nullable(),
        content: z.string().min(1, "Vui lòng nhập nội dung mô tả"),
      })
    )
    .min(1, "Phải có mô tả sản phẩm"),
});
