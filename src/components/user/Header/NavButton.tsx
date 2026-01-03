import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const NavButton = () => {
  const [isOpenNavbarModal, setIsOpenNavbarModal] = useState(false);
  return (
    <div className="relative w-full bg-white flex flex-row items-center justify-between p-3">
      <Link href="/">
        <Image
          src="/images/logo.png"
          alt="logo"
          width={1290}
          height={1080}
          priority
          className="w-25 cursor-pointer"
        />
      </Link>
      <button
        className={`size-8 flex flex-col justify-center 
                 ${isOpenNavbarModal ? "gap-0" : "gap-2"} cursor-pointer`}
        onClick={() => setIsOpenNavbarModal(!isOpenNavbarModal)}
      >
        <hr
          className={`w-full h-[1px] border-0 bg-[#613613] transition-all
                    ${isOpenNavbarModal ? "rotate-45" : ""}`}
        />
        <hr
          className={`w-full h-[1px] border-0 bg-[#613613] transition-all
                    ${isOpenNavbarModal ? "-rotate-45" : ""}`}
        />
      </button>
    </div>
  );
};

export default NavButton;
