"use client";
import React from "react";
import { useForm } from "react-hook-form";
import {z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mass } from "@prisma/client";
import { massFormSchema } from "../_form_schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { createMass, updateMass } from "@/services/mass";

interface MassFormProps {
  massData: Mass | null;
}
const MassForm: React.FC<MassFormProps> = ({ massData }) => {
  const router = useRouter();
  const massForm = useForm<z.infer<typeof massFormSchema>>({
    resolver: zodResolver(massFormSchema),
    defaultValues: !massData
      ? {
          value: "",
        }
      : {
          value: massData.value.toString(),
        },
  });
  const onSubmit = async (data: z.infer<typeof massFormSchema>) => {
    if (!massData)
      await createMass(data).finally(() => {
        massForm.reset({
          value: "",
        });
        router.push("/admin/masses/new");
        router.refresh();
      });
    else
      await updateMass(massData.id, data).finally(() => {
        massForm.reset({
          value: "",
        });
        router.push("/admin/masses/new");
        router.refresh();
      });
  };
  return (
    <Form {...massForm}>
      <form
        onSubmit={massForm.handleSubmit(onSubmit)}
        className="flex flex-col gap-8"
      >
        <FormField
          control={massForm.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Khối lượng</FormLabel>
              <FormControl>
                <Input {...field} placeholder="10" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          // disabled={isLoading}
          type="submit"
          className="cursor-pointer"
        >
          {massData ? "Cập nhật" : "Tạo mới"}
        </Button>
      </form>
    </Form>
  );
};

export default MassForm;
