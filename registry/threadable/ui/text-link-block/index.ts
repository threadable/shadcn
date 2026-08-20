import { cva, type VariantProps } from "class-variance-authority";

export { default as TextLinkBlock } from "./TextLinkBlock.vue";

export const textLinkBlockVariants = cva(
  "cursor-pointer text-foreground underline decoration-neutral-300 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500 text-sm",
  {
    variants: {
      variant: {
        default: "text-center",
        "card-footer": "mt-2 text-center",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
export type TextLinkBlockVariants = VariantProps<typeof textLinkBlockVariants>;
