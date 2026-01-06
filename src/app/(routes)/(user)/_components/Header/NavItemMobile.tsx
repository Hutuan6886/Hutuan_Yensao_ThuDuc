"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavType } from ".";

interface NavItemMobileProps {
  item: NavType;
  level?: number;
  onNavigate?: () => void;
}

const NavItemMobile: React.FC<NavItemMobileProps> = ({
  item,
  level = 0,
  onNavigate,
}) => {
  const [open, setOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <li className="w-full">
      <div
        className={cn(
          "flex items-center justify-between w-full py-2",
          level > 0 && "pl-4"
        )}
      >
        <Link
          href={`/${item.normalizedName}`}
          className="text-[#613613] text-sm"
          onClick={onNavigate}
        >
          {item.name}
        </Link>
        {hasChildren && (
          <button
            onClick={() => setOpen(!open)}
            className="p-1"
            aria-label="toggle submenu"
          >
            <ChevronDown
              className={cn(
                "size-4 text-[#613613] transition-transform duration-300",
                open && "rotate-180"
              )}
            />
          </button>
        )}
      </div>
      <AnimatePresence>
        {hasChildren && open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            {item.children!.map((child, idx) => (
              <NavItemMobile
                key={idx}
                item={child}
                level={level + 1}
                onNavigate={onNavigate}
              />
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
};

export default NavItemMobile;
