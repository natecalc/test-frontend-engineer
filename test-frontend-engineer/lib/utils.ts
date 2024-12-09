import { clsx, type ClassValue } from "clsx";
import { concat, slice } from "ramda";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength
    ? concat(slice(0, maxLength, text), "...")
    : text;
};

export const formatUSD = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};
