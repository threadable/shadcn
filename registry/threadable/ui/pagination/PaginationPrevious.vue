<script setup lang="ts">
import type { ButtonVariants } from "@/registry/threadable/ui/button";
import type { PaginationPrevProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { ChevronLeftIcon } from "@lucide/vue";
import { PaginationPrevious as UiPaginationPrevious } from "@/registry/threadable/ui/base-pagination";

const props = withDefaults(
  defineProps<
    PaginationPrevProps & {
      size?: ButtonVariants["size"];
      class?: HTMLAttributes["class"];
    }
  >(),
  {
    size: "default",
  },
);
</script>

<template>
  <UiPaginationPrevious v-bind="props">
    <slot>
      <ChevronLeftIcon />
      <span class="hidden sm:block">Previous</span>
    </slot>
  </UiPaginationPrevious>
</template>
