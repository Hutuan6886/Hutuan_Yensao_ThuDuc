"use client";
import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import useSize from "@/hooks/useSize";
import useScrollNav from "@/hooks/useScrollNav";
import { CategoryType } from "@/types";
import MainNav from "./MainNav";
import NavMobile from "./NavMobile";

export type NavType = {
  name: string;
  normalizedName: string;
  children?: CategoryType[];
};
interface HeaderProps {
  categories: CategoryType[];
}
const Header: React.FC<HeaderProps> = ({ categories }) => {
  const navData = [
    {
      name: "Danh Mục Sản Phẩm",
      normalizedName: "categories",
      children: categories,
    },
    {
      name: "Giới Thiệu",
      normalizedName: "about-us",
    },
    {
      name: "Cẩm Nang Yến Sào",
      normalizedName: "useful-articles",
    },
    {
      name: "Bài Viết",
      normalizedName: "blogs",
    },
    {
      name: "Liên Hệ",
      normalizedName: "contact",
    },
  ];
  //todo: DOM ref
  const imageRef = useRef<HTMLImageElement>(null);
  const { clientWidth } = useSize();
  //todo: Navbar animation when scrolling window
  const [isFixedNav] = useScrollNav(imageRef, clientWidth);

  return (
    <nav className="w-full h-fit bg-white">
      <div className="relative flex flex-col items-center">
        <div
          ref={imageRef as any}
          className={`z-30
                    ${
                      isFixedNav && clientWidth > 1280
                        ? "fixed -top-5 left-0 scale-50"
                        : "relative mx-auto"
                    }
                    hidden md:block`}
        >
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="logo"
              width={240}
              height={90}
              priority
              className="w-45 lg:w-60 cursor-pointer"
            />
          </Link>
        </div>
        <div
          className={`${
            isFixedNav || clientWidth < 769
              ? "fixed z-20 top-0 left-0 w-full h-auto bg-white/95"
              : "static bg-white"
          } shadow-2xl transition-all`}
        >
          {clientWidth < 769 ? (
            <NavMobile navData={navData} />
          ) : (
            <MainNav navData={navData} />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
