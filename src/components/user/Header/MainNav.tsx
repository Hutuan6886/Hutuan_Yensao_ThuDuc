"use client";
import React, { Fragment, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { CategoryType } from "@/types";
import useToggle from "@/hooks/useToggle";
import useSize from "@/hooks/useSize";
import { ChevronDown } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface MainNavProps {
  categories: CategoryType[];
  className?: string;
}
const MainNav: React.FC<MainNavProps> = ({ categories, className }) => {
  const navDefault = [
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
  //todo: state dropdown
  const [activeDropdown, setActiveDropdown] = useState<number | undefined>(
    undefined
  );
  //todo: Open or close dropdown
  const { isOpen, setIsOpen } = useToggle();
  //todo: state clientWidth
  const { clientWidth } = useSize();

  //todo: handle open dropdown for mobile screen
  const handleClickNavForMobile = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const i = Number(e.currentTarget.getAttribute("aria-valuenow"));
    if (!isOpen) {
      setActiveDropdown(i);
    } else {
      setActiveDropdown(undefined);
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className={cn("w-full h-auto py-5", className)}>
      <div className="flex flex-row items-center justify-center md:gap-x-10 lg:gap-x-15 xl:gap-x-20">
        {navDefault.map((navItem, i: number) => (
          <Fragment key={i}>
            <div className="relative flex flex-row items-center justify-center md:gap-x-5 xl:gap-x-10 
                                            group"
              onMouseEnter={() => setActiveDropdown(i)}
              onMouseLeave={() => setActiveDropdown(undefined)}
            >
              <Link
                href={`/${navItem.normalizedName}`}
                className="flex flex-row items-center justify-start gap-1 group"
              >
                <p
                  className={`${
                    clientWidth > 769 && clientWidth < 904
                      ? "text-[0.9rem] tracking-0"
                      : "text-[1.05rem] tracking-[.06rem]"
                  }  font-semibold 
                     text-[#613613] transition cursor-pointer`}
                >
                  {navItem.name}
                </p>
                <div
                  className="w-fit h-fit"
                  aria-valuenow={i}
                  onClick={handleClickNavForMobile}
                >
                  <ChevronDown
                    className={`${
                      navItem.children?.length !== undefined
                        ? "block"
                        : "hidden"
                    } 
                    size-3 lg:size-4 text-[#613613]
                    group-hover:-rotate-180 
                    group-hover:text-[#c62101] duration-300 transition-all`}
                  />
                </div>
              </Link>
              {/* //todo: Dropdown */}
              {activeDropdown === i &&
                navItem.children?.length !== undefined && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    className={`w-[200px] h-fit  
                                absolute z-10 top-6 left-0
                                bg-transparent pt-3`}
                  >
                    <div
                      className="flex flex-col items-start gap-4 
                                 bg-white shadow-xl p-5"
                    >
                      {navItem.children?.map((subNavItem, i) => (
                        <Fragment key={subNavItem.id}>
                          <Link
                            href={`/${navItem.normalizedName}/${subNavItem.normalizedName}`}
                            className="text-zinc-600 hover:text-[#613613] cursor-pointer transition"
                          >
                            {subNavItem.name}
                          </Link>
                          <Separator
                            className={`${
                              i === navItem.children!.length - 1 ? "hidden" : "block"
                            }`}
                          />
                        </Fragment>
                      ))}
                    </div>
                  </motion.div>
                )}
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default MainNav;
