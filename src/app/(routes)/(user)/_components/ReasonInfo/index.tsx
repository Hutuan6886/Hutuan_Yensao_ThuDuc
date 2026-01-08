import React from "react";
import Image from "next/image";
import ProductItemButton from "@/components/user/ProductItemButton";
import { SectionInfoType } from "@/types";

const data:SectionInfoType = {
  title: "Ngàn lý do để  Yến sào Thủ Đức trở thành người bạn đồng hành của bạn",
  description: [
    "Nếu bạn đang băn khoăn dùng yến chỉ vì giá quá đắt thì hãy chọn Yến Sao Thủ Đức, vì Yến sào Thủ Đức có giá trị dinh dưỡng tương đương với yến đảo tự nhiên nhưng lại có Mức Giá Hợp Lý, phù hợp với mọi gia đình.",
    "Yến sào Thủ Đức nói không với chất bảo quản và phụ gia hoá học. Cam kết quy trình sấy khô 100% đảm bảo việc bảo quản tổ Yến đạt hiệu quả cao nhất và sản phẩm đến tay người tiêu dùng với giá trị trọng lượng THẬT.",
    "Yến sào Thủ Đức sở hữu QUY TRÌNH TUYỂN CHỌN KHẮT KHE & THỦ CÔNG 100%, chỉ thu hoạch khi Tổ Yến đủ già để đảm bảo sản phẩm đạt giá trị dinh dưỡng cao.",
  ],
  href: "/about-us",
};
const ReasonInfo = () => {
  return (
    <div className="w-full h-auto flex flex-col gap-5 md:gap-10 bg-[#FFF5E8]">
      <div className="w-full aspect-[20/5] bg-[url(/images/background-ads.png)] bg-cover bg-center"></div>
      <div className="w-[90%] sm:w-[80%] md:w-[70%] flex flex-row items-center justify-between gap-10 m-auto">
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
        <Image
          src="/images/thumb-ads.png"
          alt="info-ads"
          width={1920}
          height={1080}
          className="hidden lg:block w-1/3 xl:w-1/2"
        />
      </div>
    </div>
  );
};

export default ReasonInfo;
