import z from "zod";
import { CarouselFormSchema } from "@/app/(routes)/(admin)/admin/carousels/_form_schema";
import toast from "react-hot-toast";
import { deleteImage } from "@/libs/r2-client";

export async function createCarousel(
  data: z.infer<typeof CarouselFormSchema>
): Promise<JSON> {
  try {
    const res = await fetch(`/api/admin/carousels`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      toast.error("Thêm mới ảnh bìa thất bại", {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
      });
      throw new Error("Failed to create carousel");
    }
    toast.success("Thêm mới ảnh bìa thành công", {
      style: {
        border: "1px solid #713200",
        padding: "16px",
        color: "#713200",
      },
    });
    return res.json();
  } catch (error) {
    throw error;
  }
}

export async function updateCarousel(
  id: string,
  data: z.infer<typeof CarouselFormSchema>
): Promise<JSON> {
  try {
    const res = await fetch(`/api/admin/carousels/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      toast.error("Cập nhật ảnh bìa thất bại", {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
      });
      throw new Error("Failed to update carousel");
    }
    toast.success("Cập nhật ảnh bìa thành công", {
      style: {
        border: "1px solid #713200",
        padding: "16px",
        color: "#713200",
      },
    });
    return res.json();
  } catch (error) {
    throw error;
  }
}

export async function deleteCarousel(
  id: string,
  signal?: AbortSignal
): Promise<boolean> {
  try {
    if (signal?.aborted) return false;
    const res = await fetch(`/api/admin/carousels/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      signal,
    });
    if (!res.ok) {
      toast.error("Xóa ảnh bìa thất bại", {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
      });
      throw new Error("Failed to delete carousel");
    }
    toast.success("Xóa ảnh bìa thành công", {
      style: {
        border: "1px solid #713200",
        padding: "16px",
        color: "#713200",
      },
    });
    return true;
  } catch (error) {
    throw error;
  }
}
