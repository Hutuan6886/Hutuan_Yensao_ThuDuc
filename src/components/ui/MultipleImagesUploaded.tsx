"use client";
import React from "react";
import { closestCorners, DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { usePopup } from "@/stores/pop-up/usePopup";
import Popup from "./Popup";
import ImageUploadItem from "./ImageUploadItem";
interface MultipleImagesUploadedProps {
  data: { id: string; href: string; alt: string; index: number }[];
  onUploaded: (
    images: { id: string; href: string; alt: string; index: number }[]
  ) => void;
  onDeleteImage: (href: string) => Promise<Promise<void>>;
  isDeleting: boolean;
}
const MultipleImagesUploaded: React.FC<MultipleImagesUploadedProps> = ({
  data,
  onUploaded,
  onDeleteImage,
  isDeleting,
}) => {
  const { isPopupOpen, setPopupOpen, content, closePopup } = usePopup();
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id !== over.id) {
      const oldIndex = data.findIndex((item) => item.id === active.id);
      const newIndex = data.findIndex((item) => item.id === over.id);
      // Di chuyển item
      const newOrder = arrayMove(data, oldIndex, newIndex);

      // Gán lại index theo vị trí mới
      const updatedImages = newOrder.map((img, index) => ({
        ...img,
        index, // index mới trong mảng
      }));
      onUploaded(updatedImages);
    }
  };
  return (
    <>
      <Popup
        isLoading={isDeleting}
        title={content.title}
        message={content.message}
        isOpen={isPopupOpen}
        submitFunc={content.submitPopup}
        closeFunc={() => {
          closePopup();
        }}
      />
      <div className="flex flex-row items-center justify-start gap-6">
        <DndContext
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={data.map((i) => i.id)}
            // strategy={verticalListSortingStrategy}   // Hàng dọc
            strategy={horizontalListSortingStrategy} // Hàng ngang
          >
            {data.map((item) => (
              <ImageUploadItem
                key={item.id}
                image={item}
                onDelete={() =>
                  setPopupOpen({
                    title: "Bạn muốn xóa ảnh này?",
                    message: "Ảnh này sẽ bị xóa vĩnh viễn",
                    submitPopup: async () => onDeleteImage(item.href),
                  })
                }
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </>
  );
};

export default MultipleImagesUploaded;
