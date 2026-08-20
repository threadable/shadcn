<script setup lang="ts">
import type { PaginationListItemProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import type { ButtonVariants } from "@/registry/threadable/ui/button";
import { reactiveOmit } from "@vueuse/core";
import { PaginationListItem } from "reka-ui";
import { cn } from "@/registry/threadable/lib/utils";
import { buttonVariants } from "@/registry/threadable/ui/button";

const props = withDefaults(
  defineProps<
    PaginationListItemProps & {
      size?: ButtonVariants["size"];
      class?: HTMLAttributes["class"];
      isActive?: boolean;
    }
  >(),
  {
    size: "icon",
  },
);

const delegatedProps = reactiveOmit(props, "class", "size", "isActive");
</script>

<template>
  <PaginationListItem
    data-slot="pagination-item"
    v-bind="delegatedProps"
    :class="
      cn(
        buttonVariants({
          variant: isActive ? 'outline' : 'ghost',
          size,
        }),
        props.class,
      )
    "
  >
    <template v-if="$slots.default" #default>
      <slot />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </PaginationListItem>
</template>
