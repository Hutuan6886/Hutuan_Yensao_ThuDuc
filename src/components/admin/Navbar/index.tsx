"use client";
import React from "react";
import LogoNav from "./LogoNav";
import MainNav from "./MainNav";
import { cn } from "@/utils/mergeClass";
import { usePathname } from "next/navigation";

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
  action: boolean;
  // subNav: NavbarItem[] | null;
};
const logoData = {
  src: "/images/logo.png",
  alt: "Logo của trang admin Yến Sào Thủ Đức",
};

const DasboardNavbar: React.FC<DasboardNavbarProps> = ({ className }) => {
  const pathname = usePathname();
  const navbarData = [
    {
      label: "Dashboard",
      href: "/admin",
      action: pathname.includes("/admin") && pathname === "/admin",
    },
    {
      label: "Carousels",
      href: "/admin/carousels",
      action: pathname.includes("/admin/carousels"),
    },
    {
      label: "Categories",
      href: "/admin/categories",
      action: pathname.includes("/admin/categories"),
    },
    {
      label: "Mass",
      href: "/admin/mass",
      action: pathname.includes("/admin/mass"),
    },
    { label: "Products", href: "/admin/products", action: false },
    { label: "Orders", href: "/admin/orders", action: false },
    { label: "Users", href: "/admin/users", action: false },
  ];
  return (
    <div
      className={cn(
        "z-50 w-[80%] h-auto flex flex-row items-center justify-between bg-white border-b border-b-gray-200",
        className
      )}
    >
      <LogoNav data={logoData} />
      <MainNav data={navbarData} />
    </div>
  );
};

export default DasboardNavbar;
