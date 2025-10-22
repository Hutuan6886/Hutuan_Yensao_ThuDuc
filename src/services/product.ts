import { z } from "zod";
import { productFormSchema } from "@/app/(routes)/(admin)/admin/products/_form schema";
import toast from "react-hot-toast";

export async function createProduct(
  data: z.infer<typeof productFormSchema>
): Promise<JSON> {
  try {
    const res = await fetch(`/api/admin/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      toast.error("Thêm mới sản phẩm thất bại", {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
      });
      throw new Error("Failed to create product");
    }
    toast.success("Thêm mới sản phẩm thành công", {
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

export async function updateProduct(
  id: string,
  data: z.infer<typeof productFormSchema>
): Promise<JSON> {
  try {
    const res = await fetch(`/api/admin/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      toast.error("Cập nhật sản phẩm thất bại", {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
      });
      throw new Error("Failed to update product");
    }
    toast.success("Cập nhật sản phẩm thành công", {
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

export async function DeleteProduct(
  id: string,
  signal?: AbortSignal
): Promise<boolean> {
  try {
    if (signal?.aborted) return false;
    const res = await fetch(`/api/admin/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      signal,
    });
    if (!res.ok) {
      toast.error("Xóa sản phẩm thất bại", {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
      });
      throw new Error("Failed to delete product");
    }
    toast.success("Xóa sản phẩm thành công", {
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
