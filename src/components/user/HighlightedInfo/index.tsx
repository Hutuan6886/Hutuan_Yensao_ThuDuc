import React from "react";
import Image from "next/image";
import ProductItemButton from "@/components/ui/ProductItemButton";

const info = {
  title: "NGÀN LÝ DO ĐỂ YÊN SAO THỦ ĐỨC TRỞ THÀNH NGƯỜI BẠN ĐỒNG HÀNH CỦA BẠN",
  description: [
    "Nếu bạn đang băn khoăn dùng yến chỉ vì giá quá đắt thì hãy chọn Yến Sao Thủ Đức, vì Yến sào Thủ Đức có giá trị dinh dưỡng tương đương với yến đảo tự nhiên nhưng lại có Mức Giá Hợp Lý, phù hợp với mọi gia đình.",
    "Yến sào Thủ Đức nói không với chất bảo quản và phụ gia hoá học. Cam kết quy trình sấy khô 100% đảm bảo việc bảo quản tổ Yến đạt hiệu quả cao nhất và sản phẩm đến tay người tiêu dùng với giá trị trọng lượng THẬT.",
    "Yến sào Thủ Đức sở hữu QUY TRÌNH TUYỂN CHỌN KHẮT KHE & THỦ CÔNG 100%, chỉ thu hoạch khi Tổ Yến đủ già để đảm bảo sản phẩm đạt giá trị dinh dưỡng cao.",
  ],
  href: "/about-us",
};
const HighlightedInfo = () => {
  return (
    <div className="w-full h-auto flex flex-col gap-5 md:gap-10">
      <div className="w-full aspect-[20/5] bg-[url(/images/background-ads.png)] bg-cover bg-center"></div>
      <div className="w-[90%] sm:w-[80%] flex flex-row items-center justify-between gap-10 m-auto">
        <div className="flex flex-col items-start gap-4">
          <h1 className="font-semibold bg-gradient-to-r from-[#603719] to-[#C47856] bg-clip-text text-transparent text-xl! md:text-3xl! lg:text-4xl!">
            {info.title}
          </h1>
          {info.description.map((desc, index) => (
            <p key={index} className="pl-2 text-justify text-zinc-600 text-xs md:text-sm lg:text-base">
              {desc}
            </p>
          ))}
          <ProductItemButton
            variant="inverse"
            isShowIcon={true}
            redirectTo={info.href}
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
          className="hidden md:block md:w-2/3 lg:w-1/2"
        />
      </div>
    </div>
  );
};

export default HighlightedInfo;
