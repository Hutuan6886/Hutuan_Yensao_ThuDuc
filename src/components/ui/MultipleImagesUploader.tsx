"use client";
import { CloudUpload } from "lucide-react";
import { Input } from "./input";
import useLoading from "@/hooks/useLoading";
import { useClickTrigger } from "@/hooks/useClickTrigger";
import {
  deleteImage,
  deleteMultipleImages,
  uploadImage,
} from "@/lib/r2-client";
import { usePopup } from "@/stores/pop-up/usePopup";
import Popup from "./Popup";
import toast from "react-hot-toast";
import MultipleImagesUploaded from "./MultipleImagesUploaded";
import ActionTableButton from "./ActionTableButton";

interface MultipleImagesUploader {
  value: { id: string; href: string; alt: string; index: number }[] | [];
  uploadToFolderName: string;
  onUploaded: (
    images: { id: string; href: string; alt: string; index: number }[]
  ) => void;
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
    const startIndex = value.length; // ✅ Bắt đầu từ độ dài hiện có
    const image = Array.from(fileList).map(async (file, i) => {
      // Gửi lên Cloudflare
      const imageUploaded = await uploadImage(`${uploadToFolderName}`, file);
      return {
        id: crypto.randomUUID(),
        href: imageUploaded,
        alt: `Ảnh sản phẩm ${file.name} Yến Sào Thủ Đức`,
        index: startIndex + i,
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
  const { isLoading: isUploading, run: uploadFile } =
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
    isLoading: isFileDeleting,
    run: deleteFile,
    cancelRequest: cancelDeleteFile,
  } = useLoading(handleFileDelete);

  const handleMultipleFilesDelete = async (
    hrefs: string[],
    signal?: AbortSignal
  ) => {
    await deleteMultipleImages(hrefs).then((res) => {
      if (res.valueOf()) {
        onUploaded([]);
      }
    });
  };
  const {
    isLoading: isMultipleFilesDeleting,
    run: deleteMultipleFiles,
    cancelRequest: cancelDeleteMultipleFiles,
  } = useLoading(handleMultipleFilesDelete);
  return (
    <>
      <Popup
        isLoading={isFileDeleting || isMultipleFilesDeleting}
        title={title}
        message={message}
        isOpen={isPopupOpen}
        submitFunc={submitPopup}
        closeFunc={() => {
          cancelDeleteFile();
          cancelDeleteMultipleFiles();
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
        <div className="flex flex-col gap-4">
          <MultipleImagesUploaded
            isDeleting={isFileDeleting}
            data={value}
            onUploaded={onUploaded}
            onDeleteImage={deleteFile}
          />
          {isUploading ? (
            <p className="text-sm text-gray-500">Đang upload...</p>
          ) : (
            value.length > 0 && (
              <ActionTableButton
                variant="delete"
                className="text-sm"
                onClick={() =>
                  // handleMultipleFilesDelete(value.map((img) => img.href))
                  setPopupOpen({
                    title: "Bạn muốn xóa tất cả hình ảnh?",
                    message: "Tất cả hình ảnh này sẽ bị xóa vĩnh viễn",
                    submitPopup: async () =>
                      deleteMultipleFiles(value.map((img) => img.href)),
                  })
                }
              >
                Xóa tất cả
              </ActionTableButton>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default MultipleImagesUploader;
