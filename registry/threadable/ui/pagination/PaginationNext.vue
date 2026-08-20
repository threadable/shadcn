<script setup lang="ts">
import type { ButtonVariants } from "@/registry/threadable/ui/button";
import type { PaginationNextProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { ChevronRightIcon } from "@lucide/vue";
import { PaginationNext as UiPaginationNext } from "@/registry/threadable/ui/base-pagination";

const props = withDefaults(
  defineProps<
    PaginationNextProps & {
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
  <UiPaginationNext v-bind="props">
    <slot>
      <span class="hidden sm:block">Next</span>
      <ChevronRightIcon />
    </slot>
  </UiPaginationNext>
</template>
