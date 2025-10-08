"use client";
import React from "react";
import { NavbarItem } from ".";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MainNavProps {
  data: NavbarItem[];
}

const MainNav = ({ data }: MainNavProps) => {
  const pathname = usePathname();
  return (
    <div className="flex flex-row items-center justify-start gap-5">
      {data.map((nav, i) => (
        <Link
          key={i}
          href={nav.href}
          className={`${
            nav.action
              ? "text-orange-800 border-b-2 border-b-orange-800"
              : "text-black hover:text-orange-600"
          } font-normal transition p-5`}
        >
          {nav.label}
        </Link>
      ))}
    </div>
  );
};

export default MainNav;
