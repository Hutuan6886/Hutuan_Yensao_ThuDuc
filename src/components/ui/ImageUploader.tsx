"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { CloudUpload } from "lucide-react";

export function ImageUploader({
  value,
  onUploaded,
}: {
  value?: { href?: string; alt?: string };
  onUploaded: (url: string, alt: string) => void;
}) {
  const [preview, setPreview] = useState(value?.href || "");
  const [uploading, setUploading] = useState(false);
  const uploadRef = useRef<HTMLInputElement>(null);
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Hiển thị preview local
    setPreview(URL.createObjectURL(file));
    // setUploading(true);

    // Gửi file đến API upload (đến Cloudflare hoặc Cloudinary)
    // const formData = new FormData();
    // formData.append("file", file);

    // const res = await fetch("/api/upload", {
    //   method: "POST",
    //   body: formData,
    // });

    // const data = await res.json();
    // setUploading(false);

    // if (data.url) {
    //   // Gửi kết quả ra ngoài cho form
    //   onUploaded(data.url, file.name); //* Upload giá trị image từ cloudflare trả về
    // } else {
    //   console.error("Upload failed", data);
    // }
  };

  const openUpload = () => {
    if (uploadRef.current) {
      uploadRef.current.click();
    }
  };

  return (
    <div className="space-y-2">
      {uploading && <p className="text-sm text-gray-500">Đang upload...</p>}
      {preview || value?.href ? (
        <Image
          src={preview || (value?.href as string)}
          alt={value?.alt || "Preview"}
          width={1200}
          height={900}
          className="w-full h-auto"
        />
      ) : (
        <div
          className="relative w-full h-auto rounded-md border-2 border-dashed border-zinc-300 p-5 cursor-pointer"
          onClick={openUpload}
        >
          <Input
            ref={uploadRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute top-0 left-0 invisible"
          />
          <div className="flex flex-col items-center justify-center gap-2 p-2">
            <CloudUpload className="size-20 text-sky-300" />
            <p className="text-xl text-sky-800 font-semibold">
              Nhấn vào đây để tải lên hình ảnh.
            </p>
            <p className=" text-zinc-300">.JPG, .PNG</p>
          </div>
        </div>
      )}
    </div>
  );
}
