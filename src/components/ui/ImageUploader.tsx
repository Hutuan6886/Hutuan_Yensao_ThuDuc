"use client";
import { useState } from "react";
import Image from "next/image";
import { deleteImage, uploadImage } from "@/libs/r2-client";
import { Input } from "@/components/ui/input";
import { CloudUpload } from "lucide-react";
import { useClickTrigger } from "@/hooks/useClickTrigger";
import CloseButton from "./CloseButton";
import { usePopup } from "@/stores/pop-up/usePopup";
import Popup from "./Popup";
import useLoading from "@/hooks/useLoading";

export function ImageUploader({
  value,
  onUploaded,
}: {
  value?: { href?: string; alt?: string };
  onUploaded: (url: string, alt: string) => void;
}) {
  const [preview, setPreview] = useState(value?.href || "");
  const [uploading, setUploading] = useState(false);
  const { ref: uploadRef, trigger: openUpload } =
    useClickTrigger<HTMLInputElement>();
  const {
    content: { title, message, submitPopup },
    isPopupOpen,
    setPopupOpen,
    closePopup,
  } = usePopup((state) => state);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Hiển thị preview local
    setPreview(URL.createObjectURL(file));
    setUploading(true);

    // Gửi file đến API upload (đến Cloudflare hoặc Cloudinary)
    const url: string = await uploadImage("carousels", file);

    if (url) {
      // Gửi kết quả ra ngoài cho form
      onUploaded(url, `Đây là ảnh bìa ${file.name} cửa hàng Yến Sào Thủ Đức`);
      setUploading(false);
    } else {
      console.error("Upload image failed", url);
    }
  };

  const handleFileDelete = async (url: string, signal?: AbortSignal) => {
    // Delete in Cloudflare
    const res = await deleteImage(url, signal);
    if (res.valueOf()) {
      // Delete image field
      onUploaded("", "");
      setPreview("");
    }
  };
  const { isLoading, run, cancelRequest } = useLoading(handleFileDelete);

  return (
    <>
      <Popup
        isLoading={isLoading}
        title={title}
        message={message}
        isOpen={isPopupOpen}
        submitFunc={submitPopup}
        closeFunc={() => {
          cancelRequest();
          closePopup();
        }}
      />
      <div className="space-y-2">
        {uploading && <p className="text-sm text-gray-500">Đang upload...</p>}
        {preview || value?.href ? (
          <div className="relative">
            <Image
              src={preview || (value?.href as string)}
              alt={value?.alt || "Preview"}
              width={1200}
              height={900}
              className="w-full h-auto"
            />
            <CloseButton
              className="absolute top-2 right-2"
              closeFunc={() =>
                setPopupOpen({
                  title: "Bạn muốn xóa ảnh này?",
                  message: "Ảnh này sẽ bị xóa vĩnh viễn",
                  submitPopup: async () => run(value?.href as string),
                })
              }
            />
          </div>
        ) : (
          <div
            className="relative w-full h-auto rounded-md border-2 border-dashed bg-blue-50 border-blue-800 p-5 cursor-pointer"
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
              <CloudUpload className="size-25 text-blue-800" />
              <p className="text-xl text-blue-800 font-light">Nhấn vào đây</p>
              <p className="text-xs">.JPG, .PNG</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
