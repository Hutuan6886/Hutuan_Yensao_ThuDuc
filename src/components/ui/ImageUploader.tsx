"use client";
import toast from "react-hot-toast";
import Image from "next/image";
import { deleteImage, uploadImage } from "@/lib/r2-client";
import { useClickTrigger } from "@/hooks/useClickTrigger";
import useLoading from "@/hooks/useLoading";
import { Input } from "@/components/ui/input";
import CloseButton from "./CloseButton";
import { usePopup } from "@/stores/pop-up/usePopup";
import Popup from "./Popup";
import { CloudUpload } from "lucide-react";
import { cn } from "@/lib/utils";

export function ImageUploader({
  value,
  uploadToFolderName,
  onUploaded,
}: {
  value?: { id: string; href: string; alt: string } | null;
  uploadToFolderName: string;
  onUploaded: (id: string, href: string, alt: string) => void;
  imageClassName?: string;
}) {
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

    // Gửi file đến API upload (đến Cloudflare hoặc Cloudinary)
    await uploadImage(`${uploadToFolderName}`, file)
      .then((url) => {
        // Gửi kết quả ra ngoài cho form
        onUploaded(
          crypto.randomUUID(),
          url,
          `Ảnh ${file.name} cửa hàng Yến Sào Thủ Đức`
        );
        toast.success("Upload ảnh thành công", {
          style: {
            border: "1px solid #713200",
            padding: "16px",
            color: "#713200",
          },
        });
      })
      .catch(() => {
        toast.error("Upload ảnh thất bại", {
          style: {
            border: "1px solid #713200",
            padding: "16px",
            color: "#713200",
          },
        });
      });
  };
  const { isLoading: uploading, run: uploadFile } =
    useLoading(handleFileChange);

  const handleFileDelete = async (url: string, signal?: AbortSignal) => {
    // Delete in Cloudflare
    await deleteImage(url, signal)
      .then((res) => {
        if (res.valueOf()) {
          // Delete image field
          onUploaded("", "", "");
          toast.success("Xóa ảnh thành công", {
            style: {
              border: "1px solid #713200",
              padding: "16px",
              color: "#713200",
            },
          });
        }
      })
      .catch(() => {
        toast.error("Xóa ảnh thất bại", {
          style: {
            border: "1px solid #713200",
            padding: "16px",
            color: "#713200",
          },
        });
      });
  };
  const {
    isLoading: deleting,
    run: deleteFile,
    cancelRequest,
  } = useLoading(handleFileDelete);

  return (
    <>
      <Popup
        isLoading={deleting}
        title={title}
        message={message}
        isOpen={isPopupOpen}
        submitFunc={submitPopup}
        closeFunc={() => {
          cancelRequest();
          closePopup();
        }}
      />
      <div className="space-y-2 m-auto">
        {uploading && <p className="text-sm text-gray-500">Đang upload...</p>}
        {value?.href ? (
          <div className="relative">
            <Image
              src={value?.href as string}
              alt={value?.alt as string}
              width={1200}
              height={900}
              className="w-full"
            />
            <CloseButton
              className="absolute top-2 right-2"
              closeFunc={() =>
                setPopupOpen({
                  title: "Bạn muốn xóa ảnh này?",
                  message: "Ảnh này sẽ bị xóa vĩnh viễn",
                  submitPopup: async () => deleteFile(value?.href as string),
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
              onChange={uploadFile}
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
