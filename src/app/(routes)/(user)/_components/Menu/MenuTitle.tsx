import React from "react";
import Image from "next/image";
const MenuTitle = () => {
  return (
    <div className="w-full md:w-[80%] xl:w-[40%] flex flex-col items-center gap-3">
      <h1
        className="font-semibold
                  bg-gradient-to-r from-[#603719] to-[#C47856] bg-clip-text text-transparent
                  text-2xl! xl:text-4xl!"
      >
        Yến Sào Ý An
      </h1>
      <p className="text-zinc-600 text-sm xl:text-base">
        Thương hiệu Yến sào cung đình hảo hạng, mang âm hưởng Trung Hoa cổ đại.
        Ý An Bird’s Nest chuyên cung cấp các loại sản phẩm Tổ yến, yến chưng cao
        cấp.
      </p>
      <Image
        src="/images/img-yen-bg-1-1.png"
        alt="Menu decor icon"
        width={100}
        height={100}
        className="size-15 md:size-20 xl:size-25"
      />
    </div>
  );
};

export default MenuTitle;
