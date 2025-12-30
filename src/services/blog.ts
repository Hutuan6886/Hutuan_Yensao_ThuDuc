import z from "zod";
import toast from "react-hot-toast";
import { blogFormSchema } from "@/app/(routes)/(admin)/admin/blogs/_form_schema";

export async function createBlog(
  data: z.infer<typeof blogFormSchema>
): Promise<z.infer<typeof blogFormSchema>> {
  try {
    const res = await fetch(`/api/admin/blogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      toast.error("Thêm mới bài viết thất bại", {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
      });
      throw new Error("Failed to create blog");
    }
    toast.success("Thêm mới bài viết thành công", {
      style: {
        border: "1px solid #713200",
        padding: "16px",
        color: "#713200",
      },
    });
    const carousel = await res.json();
    return carousel;
  } catch (error) {
    throw error;
  }
}

export async function updateBlog(
  id: string,
  data: z.infer<typeof blogFormSchema>
): Promise<z.infer<typeof blogFormSchema>> {
  try {
    const res = await fetch(`/api/admin/blogs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      toast.error("Cập nhật bài viết thất bại", {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
      });
      throw new Error("Failed to update blog");
    }
    toast.success("Cập nhật bài viết thành công", {
      style: {
        border: "1px solid #713200",
        padding: "16px",
        color: "#713200",
      },
    });
    const carousel = await res.json();
    return carousel;
  } catch (error) {
    throw error;
  }
}

export async function deleteBlog(
  id: string,
  signal?: AbortSignal
): Promise<boolean> {
  try {
    if (signal?.aborted) return false;
    const res = await fetch(`/api/admin/blogs/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      signal,
    });
    if (!res.ok) {
      toast.error("Xóa bài viết thất bại", {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
      });
      throw new Error("Failed to delete blog");
    }
    toast.success("Xóa bài viết thành công", {
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

export async function deleteBlogs(
  ids: string[],
  signal?: AbortSignal
): Promise<boolean> {
  try {
    if (signal?.aborted) return false;
    const res = await fetch(`/api/admin/blogs`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ blogId: ids }),
      signal,
    });
    if (!res.ok) {
      toast.error("Xóa các bài viết đã chọn thất bại", {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
      });
      throw new Error("Failed to delete product");
    }
    toast.success("Xóa các bài viết đã chọn thành công", {
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