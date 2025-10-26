import { NextResponse } from "next/server";
import toast from "react-hot-toast";

export const uploadImage = async (
  folder: string,
  file: File
): Promise<string> => {
  const formData = new FormData();
  formData.append("folder", folder);
  formData.append("file", file);
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOISTING_URL}/api/admin/cloudflare`,
      {
        method: "POST",
        body: formData,
      }
    );
    if (!res.ok) throw new Error("Failed to upload image!");
    const url: string = await res.json();
    return url;
  } catch (error) {
    console.log("CLOUDFLARE_UPLOAD_ERROR", error);
    throw error;
  }
};

export const deleteImage = async (
  href: string,
  signal?: AbortSignal
): Promise<boolean> => {
  try {
    if (signal?.aborted) return false;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOISTING_URL}/api/admin/cloudflare`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ href }),
        signal,
      }
    );
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error("Failed to delete image!");
    return true;
  } catch (error) {
    console.log("CLOUDFLARE_DELETE_ERROR", error);
    throw error;
  }
};

export const moveImage = async (hrefImage: string, signal?: AbortSignal) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOISTING_URL}/api/admin/cloudflare`,
      {
        method: "PUT",
        body: JSON.stringify({ hrefImage }),
        signal,
      }
    );
    const { success, href } = await res.json();
    if (!res.ok || !success) throw new Error("Failed to move image!");
    return href;
  } catch (error) {
    throw error;
  }
};

export async function deleteMultipleImages(
  hrefs: string[],
  signal?: AbortSignal
): Promise<boolean> {
  try {
    if (signal?.aborted) return false;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOISTING_URL}/api/admin/cloudflare/bulk`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hrefs }),
        signal,
      }
    );
    const data = await res.json();
    if (!res.ok || !data.success)
      throw new Error("Failed to delete multiple images!");
    return true;
  } catch (error) {
    throw error;
  }
}
