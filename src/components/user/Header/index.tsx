"use client";
import React, { useRef } from "react";
import Link from "next/link";
import useSize from "@/hooks/useSize";
import useScrollNav from "@/hooks/useScrollNav";
import { motion, useTransform, useSpring } from "framer-motion";
// import NavbarModal from '@/components/Modals/NavbarModal'

import Image from "next/image";
// import useMobileClickOutside from './services/useMobileClickOutside'
import { CategoryType } from "@/types";
import MainNav from "./MainNav";
import NavButton from "./NavButton";

interface HeaderProps {
  categories: CategoryType[];
}
const Header: React.FC<HeaderProps> = ({ categories }) => {
  //todo: DOM ref
  const navbarMobileRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const { clientWidth } = useSize();
  //todo: Navbar animation when scrolling window
  const [isFixedNav] = useScrollNav(imageRef, clientWidth);
  // todo: Navbar Mobile click outside
  // const [isOpenNavbarModal, setIsOpenNavbarModal] = useMobileClickOutside(navbarMobileRef)

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
          ref={navbarMobileRef}
          className={`${
            isFixedNav || clientWidth < 769
              ? "fixed z-20 top-0 left-0 w-full h-auto bg-white/95"
              : "static bg-white"
          } shadow-2xl transition-all`}
        >
          {clientWidth < 769 ? (
            <NavButton />
          ) : (
            <MainNav
              categories={categories}
              className={`${clientWidth < 769 ? "hidden" : "block"}`}
            />
          )}
          {/* {
                        isOpenNavbarModal && <NavbarModal dataNav={mainNav} onClose={() => setIsOpenNavbarModal(false)} />
                    } */}
        </div>
      </div>
    </nav>
  );
};

export default Header;
