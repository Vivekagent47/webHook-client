import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function decodeToken(token: string) {
  if (!token) {
    return;
  }
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  const data = JSON.parse(window.atob(base64));
  return data;
}

export function getClampTextSx(lines = 1) {
  return {
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: lines.toString(),
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    whiteSpace: "normal",
    maxWidth: "100%",
    lineBreak: "anywhere",
  } as const;
}
