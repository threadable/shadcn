import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

export { default as Badge } from "./Badge.vue";

export const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        "gray-200": "bg-gray-200 border-gray-200 text-gray-900",
        orange: "bg-amber-700 border-amber-700 text-white",
        amber: "bg-amber-500 border-amber-500 text-amber-950",
        success: "bg-success border-success text-white",
        gray: "bg-gray-500 border-gray-500 text-white",
        red: "bg-red-700 border-red-700 text-white",
        blue: "bg-blue-700 border-blue-700 text-white",
        indigo: "bg-indigo-700 border-indigo-700 text-white",
        green: "bg-green-700 border-green-700 text-white",
        slate: "bg-slate-600 border-slate-600 text-white",
        swatch:
          "size-5 rounded-lg p-0 self-center border border-black/5 cursor-pointer hover:scale-95 aria-hidden",
        "swatch-count":
          "size-5 rounded-lg p-0 border border-black/5 text-[10px] leading-none",
        filter:
          "border-transparent bg-primary text-primary-foreground p-2 cursor-pointer [a&]:hover:bg-primary/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
export type BadgeVariants = VariantProps<typeof badgeVariants>;
