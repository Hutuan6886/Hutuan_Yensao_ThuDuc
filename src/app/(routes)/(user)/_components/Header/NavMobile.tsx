"use client";
import React, { useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { NavType } from ".";
import { ShoppingCart, User } from "lucide-react";
import useToggle from "@/hooks/useToggle";
import NavItemMobile from "./NavItemMobile";
import { useClickOutside } from "@/hooks/useClickOutSide";

interface NavMobileProps {
  navData: NavType[];
}
const NavMobile: React.FC<NavMobileProps> = ({ navData }) => {
  const navMobileRef = useRef<HTMLDivElement>(null);
  const { isOpen, setIsOpen, toggle } = useToggle();
  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);
  useClickOutside<HTMLDivElement>(navMobileRef, handleClose, isOpen);
  
  return (
    <div
      ref={navMobileRef}
      className="relative w-full bg-white flex flex-row items-center justify-between p-3"
    >
      {/* Logo */}
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
      {/* Right actions */}
      <div className="flex items-center gap-5">
        {/* Cart */}
        <Link href="/cart" className="relative">
          <ShoppingCart className="size-5 text-[#613613]" />
          {/* badge */}
          <span
            className="absolute -top-1 -right-2 
                        size-4 text-[10px]
                        rounded-full bg-red-500 text-white
                        flex items-center justify-center"
          >
            2
          </span>
        </Link>
        {/* User */}
        <Link href="/account">
          <User className="size-5 text-[#613613]" />
        </Link>
        {/* Menu toggle */}
        <button
          className={`size-8 flex flex-col justify-center 
                 ${isOpen ? "gap-0" : "gap-2"} cursor-pointer`}
          onClick={() => toggle()}
        >
          <hr
            className={`w-full h-[1px] border-0 bg-[#613613] transition-all
                    ${isOpen ? "rotate-45" : ""}`}
          />
          <hr
            className={`w-full h-[1px] border-0 bg-[#613613] transition-all
                    ${isOpen ? "-rotate-45" : ""}`}
          />
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-full left-0 w-full
                      bg-white shadow-lg z-10
                        overflow-hidden"
          >
            <ul className="flex flex-col p-6 gap-2">
              {navData.map((item, i) => (
                <NavItemMobile
                  key={i}
                  item={item}
                  onNavigate={() => setIsOpen(false)}
                />
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavMobile;
