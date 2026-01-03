import React from "react";
import Image from "next/image";
const content = [
  {
    id: 1,
    title: "Cam Kết Chất Lượng",
    desc: "Bồi hoàn gấp 10 lần giá trị sản phẩm nếu phát hiện hàng giả.",
    icon: "/images/icon-adward.png",
    alt: "commitment award icon",
  },
  {
    id: 2,
    title: "Bảo Đảm Vệ Sinh ATTP",
    desc: "Quy trình sản xuất khép khín theo tiêu chuẩn VSATP",
    icon: "/images/icon-fire-wall.png",
    alt: "commitment fire wall icon",
  },
  {
    id: 3,
    title: "Miễn Phí Đổi Trả",
    desc: "Đổi trả sản phẩm trong vòng 24h từ thời điểm nhận hàng",
    icon: "/images/icon-cash-back.png",
    alt: "commitment cash back icon",
  },
  {
    id: 4,
    title: "Giao Hàng",
    desc: "Miễn phí giao hàng toàn quốc với đơn hàng trên 500k",
    icon: "/images/icon-ship.png",
    alt: "commitment shipment icon",
  },
];
const Commitment = () => {
  return (
    <div
      className="grid grid-cols-2 md:flex md:flex-row md:items-center md:justify-around gap-4 md:gap-6 p-5
                 bg-white shadow-2xl rounded-xl"
    >
      {content.map((item, i) => (
        <div
          key={item.id}
          className={`col-span-1 flex flex-col md:flex-row items-center justify-center gap-4
            ${i === 0 ? "border-0" : "md:border-l pl-6"}`}
        >
          <Image src={item.icon} alt={item.alt} width={30} height={30} className=""/>
          <div className="flex flex-col items-center gap-1">
            <h3 className="text-[#613613] font-semibold text-sm! md:text-lg!">
              {item.title}
            </h3>
            <p className="text-zinc-600 text-xs md:text-sm">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Commitment;
