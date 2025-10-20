import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatterCurrency = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});
