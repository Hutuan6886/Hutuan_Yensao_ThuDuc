"use client";

import { CloudUpload } from "lucide-react";
import CloseButton from "./CloseButton";
import { Input } from "./input";
import Image from "next/image";
import { useState } from "react";
import useLoading from "@/hooks/useLoading";
import { useClickTrigger } from "@/hooks/useClickTrigger";
import { deleteImage, uploadImage } from "@/lib/r2-client";
import { usePopup } from "@/stores/pop-up/usePopup";
import Popup from "./Popup";
import toast from "react-hot-toast";

interface MultipleImagesUploader {
  value: { href: string; alt: string }[] | [];
  uploadToFolderName: string;
  onUploaded: (images: { href: string; alt: string }[]) => void;
  onDeleted: (href: string) => void;
}

const MultipleImagesUploader: React.FC<MultipleImagesUploader> = ({
  value,
  uploadToFolderName,
  onUploaded,
  onDeleted,
}) => {
  const { ref: uploadRef, trigger: openUpload } =
    useClickTrigger<HTMLInputElement>();
  const {
    isPopupOpen,
    content: { title, message, submitPopup },
    setPopupOpen,
    closePopup,
  } = usePopup();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files as FileList;
    const image = Array.from(fileList).map(async (file) => {
      // Gửi lên API
      const imageUploaded = await uploadImage(`${uploadToFolderName}`, file);
      return {
        href: imageUploaded,
        alt: `Ảnh sản phẩm ${file.name} Yến Sào Thủ Đức`,
      };
    });
    await Promise.all(image)
      .then((imagesList) => {
        toast.success("Upload ảnh sản phẩm thành công", {
          style: {
            border: "1px solid #713200",
            padding: "16px",
            color: "#713200",
          },
        });
        // Update images field
        onUploaded([...value, ...imagesList]);
      })
      .catch(() => {
        toast.error("Upload ảnh sản phẩm thất bại", {
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

  const handleFileDelete = async (href: string, signal?: AbortSignal) => {
    // Delete in Cloudflare
    await deleteImage(href, signal)
      .then((res) => {
        if (res.valueOf()) {
          // Delete image into form
          onDeleted(href);
        }
        toast.success("Xóa ảnh sản phẩm thành công", {
          style: {
            border: "1px solid #713200",
            padding: "16px",
            color: "#713200",
          },
        });
      })
      .catch(() => {
        toast.error("Xóa ảnh sản phẩm thất bại", {
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
      <div className="space-y-2 flex flex-col gap-6">
        <div
          className="relative w-full h-auto rounded-md border-2 border-dashed bg-blue-50 border-blue-800 p-5 cursor-pointer"
          onClick={openUpload}
        >
          <Input
            ref={uploadRef}
            type="file"
            multiple
            accept="image/*"
            className="absolute top-0 left-0 invisible"
            onChange={uploadFile}
          />
          <div className="flex flex-col items-center justify-center gap-2 p-2">
            <CloudUpload className="size-25 text-blue-800" />
            <p className="text-xl text-blue-800 font-light">Nhấn vào đây</p>
            <p className="text-xs">.JPG, .PNG</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {uploading && <p className="text-sm text-gray-500">Đang upload...</p>}
          <div className="flex flex-row items-center justify-start gap-6">
            {value.map((item, i) => (
              <div key={i} className="relative">
                <Image
                  src={item.href}
                  alt={item.alt}
                  width={1200}
                  height={900}
                  className="size-40 object-cover rounded-md"
                />
                <CloseButton
                  className="absolute top-2 right-2"
                  closeFunc={() =>
                    setPopupOpen({
                      title: "Bạn muốn xóa ảnh này?",
                      message: "Ảnh này sẽ bị xóa vĩnh viễn",
                      submitPopup: async () => deleteFile(item.href),
                    })
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MultipleImagesUploader;
