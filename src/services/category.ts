import z from "zod";
import { categoryFormSchema } from "@/app/(routes)/(admin)/admin/categories/_form_schema";
import toast from "react-hot-toast";

export async function createCategory(data: z.infer<typeof categoryFormSchema>) {
  try {
    const res = await fetch(`/api/admin/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      toast.error("Thêm mới danh mục thất bại", {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
      });
      throw new Error("Failed to create carousel");
    }
    toast.success("Thêm mới danh mục thành công", {
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

export async function updateCategory(
  id: string,
  data: z.infer<typeof categoryFormSchema>
): Promise<JSON> {
  try {
    const res = await fetch(`/api/admin/categories/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      toast.error("Cập nhật danh mục thất bại", {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
      });
      throw new Error("Failed to update carousel");
    }
    toast.success("Cập nhật danh mục thành công", {
      style: {
        border: "1px solid #713200",
        padding: "16px",
        color: "#713200",
      },
    });
    const categoryUpdated = await res.json();
    console.log("category update", categoryUpdated);
    return categoryUpdated;
  } catch (error) {
    throw error;
  }
}

export async function deleteCategory(
  id: string,
  signal?: AbortSignal
): Promise<boolean> {
  try {
    if (signal?.aborted) return false;
    const res = await fetch(`/api/admin/categories/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      signal,
    });
    if (!res.ok) {
      toast.error("Xóa danh mục thất bại", {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
      });
      throw new Error("Failed to delete carousel");
    }
    toast.success("Xóa danh mục thành công", {
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
