import { cva, type VariantProps } from "class-variance-authority";

export { default as Info } from "./Info.vue";

export const infoVariants = cva(
  "rounded p-2 text-white border-1 flex flex-row items-center",
  {
    variants: {
      variant: {
        default:
          "border-blue-800 bg-blue-400/20 text-blue-800 dark:text-blue-100 dark:border-blue-800/20",
        destructive:
          "border-red-800 bg-red-400/20 text-red-800 dark:text-red-100 dark:border-red-800/20",
      },
      size: {
        default: "",
        sm: "text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type InfoVariants = VariantProps<typeof infoVariants>;
