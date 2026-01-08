import React from "react";
import Image from "next/image";
import { SectionInfoType } from "@/types";
import ProductItemButton from "@/components/user/ProductItemButton";

const data: SectionInfoType = {
  title: "Thu hoạch & phân phối đông trùng hạ thảo tự nhiên",
  description: [
    "Thu hoạch các đông trùng hạ thảo chất lượng cao, kết hợp cùng các dược liệu quý hiếm, dược cổ truyền dân tộc, đem đến giải pháp chăm sóc sức khỏe toàn diện.",
  ],
  href: "/about-us",
};
const HarvestInfo = () => {
  return (
    <div className="w-full h-auto flex flex-col gap-5 md:gap-10 p-5 md:p-10 bg-[#FFF5E8]">
      <div className="w-[90%] sm:w-[80%] md:w-[70%] grid grid-col-1 lg:grid-cols-2 gap-10 xl:gap-20 m-auto">
        <div className="flex flex-col items-start gap-4">
          <h1 className="font-semibold bg-gradient-to-r from-[#603719] to-[#C47856] bg-clip-text text-transparent !text-xl md:!text-3xl lg:!text-4xl">
            {data.title}
          </h1>
          {data.description.map((desc, index) => (
            <p
              key={index}
              className="pl-2 text-justify text-zinc-600 text-xs md:text-sm lg:text-base"
            >
              {desc}
            </p>
          ))}
          <ProductItemButton
            variant="inverse"
            isShowIcon={true}
            redirectTo={data.href}
            className="py-2 px-3 text-xs md:py-2 md:px-4 md:text-sm"
          >
            Xem thêm
          </ProductItemButton>
        </div>
        <div className="relative w-full hidden lg:block aspect-[4/3] bg-[url(/images/dong-trung-decor-1.png)] bg-cover bg-center rounded-lg">
          <Image
            src="/images/dong-trung-decor.png"
            alt="Đông trùng hạ thảo thu hoạch hình ảnh"
            width={1920}
            height={1080}
            className="absolute top-[55%] right-2/3 hidden xl:block size-45 2xl:size-60 rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default HarvestInfo;
