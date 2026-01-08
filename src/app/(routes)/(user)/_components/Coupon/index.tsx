import React from "react";
import CouponItem from "./CouponItem";
import TitleWrapper from "@/components/user/TitleWrapper";
import SlideWrapper from "@/components/user/SlideWrapper";

const data = [
  {
    id: 1,
    code: "YENSAO",
    desc: "Giảm ngay 200.000đ cho đơn hàng từ 5.000.000đ trở lên",
    discountPercent: 200000,
    minOrderValue: 5000000,
    totalQuantity: 5,
    status: "active",
    startAt: "01-01-2026",
    expiresOn: "31-02-2026",
  },
  {
    id: 2,
    code: "FREESHIP",
    desc: "Miễn phí vận chuyển cho đơn hàng từ 1.000.000đ trở lên",
    discountPercent: 100000,
    minOrderValue: 1000000,
    totalQuantity: 10,
    status: "active",
    startAt: "01-01-2026",
    expiresOn: " 30-06-2026",
  },
  {
    id: 3,
    code: "NEWUSER",
    desc: "Giảm ngay 100.000đ cho khách hàng mới",
    discountPercent: 100000,
    minOrderValue: 0,
    totalQuantity: 15,
    status: "expired",
    startAt: "01-01-2025",
    expiresOn: "31-11-2026",
  },
];
export type CouponType = {
  id: number;
  code: string;
  desc: string;
  discountPercent: number;
  minOrderValue: number;
  totalQuantity?: number;
  status: string;
  startAt: string;
  expiresOn: string;
};
const Coupon = () => {
  return (
    <TitleWrapper title="MÃ GIẢM GIÁ DÀNH CHO BẠN">
      <SlideWrapper className="w-[90%] m-auto">
        <div
          className="w-[90%] h-auto m-auto py-5
                    flex flex-row items-center justify-start gap-10"
        >
          {data.map((voucher) => (
            <CouponItem
              key={voucher.id}
              data={voucher}
              className="flex-shrink-0 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            />
          ))}
        </div>
      </SlideWrapper>
    </TitleWrapper>
  );
};

export default Coupon;
