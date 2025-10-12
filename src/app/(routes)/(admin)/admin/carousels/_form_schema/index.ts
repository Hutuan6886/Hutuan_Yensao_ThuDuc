import z from "zod";

export const CarouselFormSchema = z.object({
  image: z.object({
    href: z.string(),
    alt: z.string(),
  }),
  url: z.string(),
});
