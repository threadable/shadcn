<script setup lang="ts">
import { computed } from "vue";
import type { LinkComponentBaseProps, Method } from "@inertiajs/core";
import { Link } from "@inertiajs/vue3";
import type { PrimitiveProps } from "reka-ui";
import { textLinkBlockVariants, type TextLinkBlockVariants } from ".";
import { cn, guidGenerator } from "@/registry/threadable/lib/utils";

interface Props extends PrimitiveProps {
  href: LinkComponentBaseProps["href"];
  tabindex?: number;
  method?: Method;
  as?: string;
  id?: string;
  variant?: TextLinkBlockVariants["variant"];
  ariaLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
  as: "a",
});

const generatedId = "text-link-" + guidGenerator();
const linkId = computed(() => props.id || generatedId);
const ariaAttributes = computed(() =>
  props.ariaLabel ? { "aria-label": props.ariaLabel } : {},
);
</script>

<template>
  <Link
    :id="linkId"
    :href="href"
    :tabindex="tabindex"
    :method="method"
    :as="as"
    v-bind="ariaAttributes"
    :class="cn(textLinkBlockVariants({ variant }))"
  >
    <slot />
  </Link>
</template>
