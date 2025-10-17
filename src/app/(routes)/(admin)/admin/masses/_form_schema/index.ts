import z from "zod";

export const massFormSchema = z.object({
  value: z
    .string({ error: "Chỉ nhập chữ số" })
    .min(2, { error: "Số không hợp lệ" })
    .max(3, { error: "Số không hợp lệ" }),
});
