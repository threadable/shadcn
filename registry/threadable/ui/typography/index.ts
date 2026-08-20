import { cva, type VariantProps } from "class-variance-authority";

export { default as H1Block } from "./H1Block.vue";
export { default as H2Block } from "./H2Block.vue";
export { default as H3Block } from "./H3Block.vue";
export { default as H4Block } from "./H4Block.vue";
export { default as H5Block } from "./H5Block.vue";
export { default as H6Block } from "./H6Block.vue";
export { default as OrderedListBlock } from "./OrderedListBlock.vue";
export { default as PBlock } from "./PBlock.vue";

// H1 Variants
export const h1Variants = cva("text-[24px] font-[400] tracking-[-1.2%]", {
  variants: {
    variant: {
      default: "bg-[--foreground] text-[--primary-foreground]",
      ghost: "hover:bg-[--accent] hover:text-[--accent-foreground]",
      link: "text-[--primary] underline-offset-4 hover:underline",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
export type H1Variants = VariantProps<typeof h1Variants>;

// H2 Variants
export const h2Variants = cva("text-[20px] font-normal tracking-[-0.75%]", {
  variants: {
    variant: {
      default: "bg-[--foreground] text-[--primary-foreground]",
      ghost: "hover:bg-[--accent] hover:text-[--accent-foreground]",
      link: "text-[--primary] underline-offset-4 hover:underline",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
export type H2Variants = VariantProps<typeof h2Variants>;

// H3 Variants
export const h3Variants = cva(
  "text-[16px] leading-none font-semibold font-[600]",
  {
    variants: {
      variant: {
        default: "bg-[--foreground] text-[--primary-foreground]",
        ghost: "hover:bg-[--accent] hover:text-[--accent-foreground]",
        link: "text-[--primary] underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
export type H3Variants = VariantProps<typeof h3Variants>;

// H4 Variants
export const h4Variants = cva("text-[14px] font-normal tracking-[-0.5%]", {
  variants: {
    variant: {
      default: "bg-[--foreground] text-[--primary-foreground]",
      ghost: "hover:bg-[--accent] hover:text-[--accent-foreground]",
      link: "text-[--primary] underline-offset-4 hover:underline",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
export type H4Variants = VariantProps<typeof h4Variants>;

// H5 Variants
export const h5Variants = cva("text-[12px] font-normal tracking-[-0.25%]", {
  variants: {
    variant: {
      default: "bg-[--foreground] text-[--primary-foreground]",
      ghost: "hover:bg-[--accent] hover:text-[--accent-foreground]",
      link: "text-[--primary] underline-offset-4 hover:underline",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
export type H5Variants = VariantProps<typeof h5Variants>;

// H6 Variants
export const h6Variants = cva("text-[11px] font-normal tracking-[-0.1%]", {
  variants: {
    variant: {
      default: "bg-[--foreground] text-[--primary-foreground]",
      ghost: "hover:bg-[--accent] hover:text-[--accent-foreground]",
      link: "text-[--primary] underline-offset-4 hover:underline",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
export type H6Variants = VariantProps<typeof h6Variants>;

// P Variants
export const pVariants = cva("text-[14px] font-normal leading-normal", {
  variants: {
    variant: {
      default: "bg-[--foreground] text-[--primary-foreground]",
      ghost: "hover:bg-[--accent] hover:text-[--accent-foreground]",
      link: "text-[--primary] underline-offset-4 hover:underline",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
export type PVariants = VariantProps<typeof pVariants>;
