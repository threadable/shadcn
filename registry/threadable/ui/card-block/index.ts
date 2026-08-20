import { cva, type VariantProps } from "class-variance-authority";

export { default as CardBlock } from "./CardBlock.vue";
export { default as CardBlockFooter } from "./CardBlockFooter.vue";

export const cardBlockVariants = cva("", {
  variants: {
    variant: {
      default:
        "flex flex-col gap-6 rounded-xl border bg-card py-6 text-card-foreground shadow-sm",
      "datatable-mobile":
        "rounded-md border border-black/10 bg-accent p-2 text-primary",
      "bordered-orange":
        "rounded-md border border-orange/25 bg-card text-card-foreground shadow-none",
      checkout: "rounded-lg border border-orange/25 bg-card p-4 shadow-none",
      summary:
        "rounded-lg border border-orange/25 bg-orange/25 p-4 shadow-none",
      destructive:
        "rounded-lg border border-destructive/25 bg-destructive/25 p-4 shadow-none",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type CardBlockVariants = VariantProps<typeof cardBlockVariants>;
