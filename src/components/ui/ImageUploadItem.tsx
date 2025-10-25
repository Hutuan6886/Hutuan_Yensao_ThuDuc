"use client";
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";
import CloseButton from "./CloseButton";

interface ImageUploadItemProps {
  image: { id: string; href?: string; alt?: string };
  onDelete: () => void;
}

const ImageUploadItem: React.FC<ImageUploadItemProps> = ({
  image,
  onDelete,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: image.id });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="relative"
    >
      <Image
        src={image?.href as string}
        alt={image?.alt as string}
        width={1200}
        height={900}
        className="size-40 object-cover rounded-md"
      />
      <CloseButton className="absolute top-2 right-2" closeFunc={onDelete} />
    </div>
  );
};

export default ImageUploadItem;
