import z from "zod";
import { massFormSchema } from "@/app/(routes)/(admin)/admin/masses/_form_schema";
import toast from "react-hot-toast";

export const createMass = async (data: z.infer<typeof massFormSchema>) => {
  try {
    const res = await fetch(`/api/admin/masses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      toast.error("Thêm mới khối lượng thất bại", {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
      });
      throw new Error("Failed to create masss");
    }
    toast.success("Thêm mới khối lượng thành công", {
      style: {
        border: "1px solid #713200",
        padding: "16px",
        color: "#713200",
      },
    });
    return res.json();
  } catch (error: any) {
    throw error;
  }
};

export async function updateMass(
  id: string,
  data: z.infer<typeof massFormSchema>
): Promise<JSON> {
  try {
    const res = await fetch(`/api/admin/masses/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      toast.error("Cập nhật khối lượng thất bại", {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
      });
      throw new Error("Failed to update mass");
    }
    toast.success("Cập nhật khối lượng thành công", {
      style: {
        border: "1px solid #713200",
        padding: "16px",
        color: "#713200",
      },
    });
    const massUpdated = await res.json();
    return massUpdated;
  } catch (error) {
    throw error;
  }
}

export async function deleteMass(
  id: string,
  signal?: AbortSignal
): Promise<boolean> {
  try {
    if (signal?.aborted) return false;
    const res = await fetch(`/api/admin/masses/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      signal,
    });
    if (!res.ok) {
      toast.error("Xóa khối lượng thất bại", {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
      });
      throw new Error("Failed to delete mass");
    }
    toast.success("Xóa khối lượng thành công", {
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
