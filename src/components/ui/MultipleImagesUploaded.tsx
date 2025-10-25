"use client";
import React, { useEffect, useState } from "react";
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
  data: { id: string; href: string; alt: string }[];
  onUploaded: (images: { id: string; href: string; alt: string }[]) => void;
  onDeleteImage: (href: string) => Promise<Promise<void>>;
  isDeleting: boolean;
}
const MultipleImagesUploaded: React.FC<MultipleImagesUploadedProps> = ({
  data,
  onUploaded,
  onDeleteImage,
  isDeleting,
}) => {
  // const [mount, setMount] = useState(false);
  // const [items, setItems] = useState(data);
  const { isPopupOpen, setPopupOpen, content, closePopup } = usePopup();
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id !== over.id) {
      // setItems((pre) => {
      //   const oldIndex = pre.findIndex((item) => item.id === active.id);
      //   const newIndex = pre.findIndex((item) => item.id === over.id);
      //   return arrayMove(pre, oldIndex, newIndex);
      // });
      const oldIndex = data.findIndex((item) => item.id === active.id);
      const newIndex = data.findIndex((item) => item.id === over.id);
      onUploaded(arrayMove(data, oldIndex, newIndex));
    }
  };
  // useEffect(() => {
  //   if (!mount) setMount(true);
  // }, []);
  // useEffect(() => {
  //   if (items)
  //     // Update images list to form
  //     onUploaded(items);
  // }, [items]);
  // if (!mount) return;
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
