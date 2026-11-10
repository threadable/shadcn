import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

export { default as ActionButtonBlock } from "./ActionButtonBlock.vue";

export const actionButtonVariants = cva("w-auto px-2", {
  variants: {
    variant: {
      neutral:
        "border-slate-600 text-slate-700 hover:bg-slate-700 hover:text-white dark:text-slate-300",
      info: "border-blue-600 text-blue-700 hover:bg-blue-700 hover:text-white dark:text-blue-300",
      warning:
        "border-amber-600 text-amber-700 hover:bg-amber-800 hover:text-white dark:text-amber-300",
      success:
        "border-green-600 text-green-700 hover:bg-green-700 hover:text-white dark:text-green-300",
      destructive:
        "border-red-600 text-red-700 hover:bg-red-700 hover:text-white dark:text-red-300",
    },
  },
  defaultVariants: {
    variant: "neutral",
  },
});

export type ActionButtonVariants = VariantProps<typeof actionButtonVariants>;
export type ActionButtonVariant = NonNullable<ActionButtonVariants["variant"]>;
