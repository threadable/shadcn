<script setup lang="ts">
import { cn } from "@/registry/threadable/lib/utils";
import { DropdownMenuItem } from "@/registry/threadable/ui/dropdown-menu";
import type { HTMLAttributes } from "vue";

interface Props {
  disabled?: boolean;
  class?: HTMLAttributes["class"];
  dataTest?: string;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});
</script>

<template>
  <DropdownMenuItem
    :disabled="disabled"
    :data-test="dataTest"
    :class="
      cn(
        '!h-10 cursor-pointer !rounded-none bg-black/5 !px-2 !py-1.5 hover:!bg-black/8 focus:!bg-black/8',
        props.class,
      )
    "
  >
    <slot />
  </DropdownMenuItem>
</template>
