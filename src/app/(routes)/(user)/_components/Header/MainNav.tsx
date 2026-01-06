"use client";
import React, { Fragment, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
// import { CategoryType } from "@/types";
import useToggle from "@/hooks/useToggle";
import useSize from "@/hooks/useSize";
import { ChevronDown } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { NavType } from ".";

interface MainNavProps {
  navData: NavType[];
  className?: string;
}
const MainNav: React.FC<MainNavProps> = ({ navData, className }) => {
  //todo: state clientWidth
  const { clientWidth } = useSize();
  //todo: state dropdown
  const [activeDropdown, setActiveDropdown] = useState<number | undefined>(
    undefined
  );
  const toggleDropdown = (index: number) => {
    setActiveDropdown((prev) => (prev === index ? undefined : index));
  };

  return (
    <div className={cn("w-full h-auto py-5", className)}>
      <div className="flex flex-row items-center justify-center md:gap-x-10 lg:gap-x-15 xl:gap-x-20">
        {navData.map((navItem, i: number) => {
          const hasChildren = !!navItem.children?.length;

          return (
            <div
              key={i}
              className="relative flex items-center gap-2 group"
              onMouseEnter={() => clientWidth >= 1024 && setActiveDropdown(i)}
              onMouseLeave={() =>
                clientWidth >= 1024 && setActiveDropdown(undefined)
              }
            >
              {/* TEXT LINK */}
              <Link
                href={`/${navItem.normalizedName}`}
                className="font-semibold text-[#613613] hover:text-[#c62101] transition"
              >
                {navItem.name}
              </Link>
              {/* ICON CLICK */}
              {hasChildren && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleDropdown(i);
                  }}
                  aria-expanded={activeDropdown === i}
                  className="p-1"
                >
                  <ChevronDown
                    className={cn(
                      "text-[#613613] transition-transform duration-300",
                      activeDropdown === i && "-rotate-180 text-[#c62101]"
                    )}
                    size={16}
                  />
                </button>
              )}
              {/* DROPDOWN */}
              {activeDropdown === i && hasChildren && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  className="absolute top-6 left-0 z-20 pt-3"
                >
                  <div className="bg-white shadow-xl p-5 w-[200px] flex flex-col gap-4">
                    {navItem.children!.map((sub, idx) => (
                      <Fragment key={sub.id}>
                        <Link
                          href={`/${navItem.normalizedName}/${sub.normalizedName}`}
                          className="text-zinc-600 hover:text-[#613613] transition"
                        >
                          {sub.name}
                        </Link>
                        {idx !== navItem.children!.length - 1 && <Separator />}
                      </Fragment>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MainNav;
