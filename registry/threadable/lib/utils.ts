import { useMediaQuery } from "@vueuse/core";
import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind class values using the same behaviour as the source app. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Generate stable-enough DOM ids for the component's labelled controls. */
export function guidGenerator() {
  const S4 = () =>
    (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);

  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
}

export const defaultPageSize = 10;
export const defaultPageSizes = [10, 20, 30, 40, 50];

export const MOBILE_BREAKPOINT = "(max-width: 768px)";

export function useIsMobile() {
  return useMediaQuery(MOBILE_BREAKPOINT, { ssrWidth: 1280 });
}
