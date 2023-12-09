import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isValidUrl(string: string) {
  try {
    const data = new URL(string);
    return !!data;
  } catch (err) {
    return false;
  }
}
