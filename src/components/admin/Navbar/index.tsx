"use client";
import React from "react";
import LogoNav from "./LogoNav";
import MainNav from "./MainNav";
import { cn } from "@/utils/mergeClass";

interface DasboardNavbarProps {
  className: string;
}
export type Logo = {
  src: string;
  alt: string;
};
export type NavbarItem = {
  label: string;
  href: string;
  // subNav: NavbarItem[] | null;
};
const logoData = {
  src: "/images/logo.png",
  alt: "Logo của trang admin Yến Sào Thủ Đức",
};
const navbarData = [
  {
    label: "Dashboard",
    href: "/admin",
  },
  {
    label: "Carousels",
    href: "/admin/carousels",
  },
  {
    label: "Categories",
    href: "/admin/categories",
  },
  {
    label: "Mass",
    href: "/admin/mass",
  },
  { label: "Products", href: "/admin/products" },
  { label: "Orders", href: "/admin/orders" },
  { label: "Users", href: "/admin/users" },
];

const DasboardNavbar: React.FC<DasboardNavbarProps> = ({ className }) => {
  return (
    <div
      className={cn(
        "w-[80%] h-auto flex flex-row items-center justify-between border-b border-b-gray-200",
        className
      )}
    >
      <LogoNav data={logoData} />
      <MainNav data={navbarData} />
    </div>
  );
};

export default DasboardNavbar;
