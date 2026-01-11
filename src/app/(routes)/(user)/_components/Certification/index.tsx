"use client";
import React, { useState } from "react";
import Image from "next/image";
import useToggle from "@/hooks/useToggle";
import CertificationPopup from "./CertificationPopup";
import TitleWrapper from "@/components/user/TitleWrapper";

const data: any[] = [
  {
    id: "1",
    href: "/images/kiem-dinh-yen-sao-vietfarm-1.jpg",
    alt: "",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "2",
    href: "/images/kiem-dinh-yen-sao-vietfarm-2.jpg",
    alt: "",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "3",
    href: "/images/tu-cong-bo-yen-sao-vietfarm-1.jpg",
    alt: "",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "4",
    href: "/images/tu-cong-bo-yen-sao-vietfarm-2.jpg",
    alt: "",
    createdAt: "",
    updatedAt: "",
  },
];

const Certification = () => {
  const { isOpen, setIsOpen } = useToggle();
  const [imgClickIndex, setImgClickIndex] = useState<number>(0);
  return (
    <>
      <TitleWrapper title="CHỨNG NHẬN AN TOÀN">
        <div className="w-[90%] grid grid-cols-2 md:w-[80%] m-auto md:flex flex-row items-center justify-center gap-2 md:gap-6">
        {data.map((img, i: number) => (
          <Image
            key={img.id}
            src={img.href}
            alt={img.alt}
            width={1920}
            height={1080}
            className="w-full h-auto shadow-lg cursor-pointer"
            onClick={() => {
              setImgClickIndex(i);
              setIsOpen(true);
            }}
          />
        ))}
      </div>
      </TitleWrapper>
      {isOpen && (
        <CertificationPopup
          data={data}
          imgShowIndex={imgClickIndex}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Certification;
