import BlogItem from "@/components/user/BlogItem";
import SlideWrapper from "@/components/user/SlideWrapper";
import TitleWrapper from "@/components/user/TitleWrapper";
import React from "react";

const data: any[] = [
  {
    label: "Làm đẹp da bằng yến",
    image: { href: "/images/dep-da-1.png", alt: "" },
  },
  {
    label: "Làm đẹp da bằng yến",
    image: { href: "/images/dep-da-1.png", alt: "" },
  },
  {
    label: "Làm đẹp da bằng yến",
    image: { href: "/images/dep-da-1.png", alt: "" },
  },
  {
    label: "Làm đẹp da bằng yến",
    image: { href: "/images/dep-da-1.png", alt: "" },
  },
  {
    label: "Làm đẹp da bằng yến",
    image: { href: "/images/dep-da-1.png", alt: "" },
  },
  {
    label: "Làm đẹp da bằng yến",
    image: { href: "/images/dep-da-1.png", alt: "" },
  },
];
const HighlightedBlogs = () => {
  return (
    <TitleWrapper title="BÀI VIẾT NỔI BẬT" className="bg-[#FFF5E8]">
      <SlideWrapper className="w-[90%] m-auto">
        <div className="w-[90%] flex flex-row items-center justify-between lg:w-[80%] xl:w-[70%] lg:grid lg:grid-cols-3 gap-10 m-auto">
          {data.map((blog, i) => (
            <BlogItem key={i} data={blog} className="flex-shrink-0 basis-full sm:basis-1/2 md:basis-1/3" />
          ))}
        </div>
      </SlideWrapper>
    </TitleWrapper>
  );
};

export default HighlightedBlogs;
