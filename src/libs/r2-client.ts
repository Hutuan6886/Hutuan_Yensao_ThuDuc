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

export const deleteImage = async (url: string): Promise<boolean> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOISTING_URL}/api/admin/cloudflare`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
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
