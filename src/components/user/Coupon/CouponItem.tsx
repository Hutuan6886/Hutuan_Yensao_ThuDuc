import Image from "next/image";
import React from "react";
import { CouponType } from ".";
import CopyButton from "@/components/ui/CopyButton";
import { cn } from "@/lib/utils";

interface CouponItemProps {
  data: CouponType;
  className?: string;
}
const CouponItem: React.FC<CouponItemProps> = ({ data, className }) => {
  return (
    <div
      className={cn(
        "w-[350px] h-[135px] flex flex-row items-center justify-center rounded-md shadow-md gap-3",
        className
      )}
    >
      <Image
        src="/images/img_coupon.png"
        alt="coupon"
        width={1920}
        height={1080}
        draggable={false}
        className="w-1/5 h-full rounded-l-md"
      />
      <div className="relative w-4/5 h-full bg-white text-sm rounded-r-md flex flex-col gap-2 p-3">
        <div className="font-bold text-[#9b591c]">Nhập mã: {data.code}</div>
        <p className="text-wrap text-sm text-zinc-600">{data.desc}</p>
        <div className="flex flex-row items-center justify-between">
          <CopyButton variant="coupon" size="sm" text={data.code}>
            Sao chép
          </CopyButton>
          <span className="text-xs text-zinc-600 italic">
            HSD: {data.expiresOn}
          </span>
        </div>
        <span
          className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 
                        size-6 flex flex-col items-center justify-center
                        bg-red-500 text-white text-xs font-semibold rounded-full shadow-md"
        >
          {data.totalQuantity}
        </span>
      </div>
    </div>
  );
};

export default CouponItem;
