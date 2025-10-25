import { z } from "zod";

const hrefPattern = /^https?:\/\/pub-[a-f0-9]{32}\.r2\.dev(\/[\w.-]+)*$/i;
const urlPattern = /^https?:\/\/[a-z0-9.-]+\/user\/[a-z0-9-]+$/i;
export const carouselFormSchema = z.object({
  image: z
    .object({
      id: z.string().nonempty(),
      href: z
        .string()
        .nonempty({ message: "Vui lòng chọn ảnh bìa" })
        .regex(hrefPattern, { message: "Image không đúng định dạng R2" }),
      alt: z.string().nonempty(),
    })
    .nullable(),
  url: z
    .string()
    .regex(urlPattern, { message: "Đường dẫn không đúng định dạng" }),
});
