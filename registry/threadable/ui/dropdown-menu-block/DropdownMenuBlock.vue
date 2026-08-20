<script setup lang="ts">
import { computed, useSlots, Comment, Fragment, type VNode } from "vue";
import { ChevronDown } from "@lucide/vue";
import { Button, type ButtonVariants } from "@/registry/threadable/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/registry/threadable/ui/dropdown-menu";

interface Props {
  label: string;
  variant?: ButtonVariants["variant"];
  align?: "start" | "center" | "end";
  dataTest?: string;
}

withDefaults(defineProps<Props>(), {
  variant: "default",
  align: "center",
});

const slots = useSlots();

const hasItems = computed(() => {
  const vnodes = slots.default?.() ?? [];
  return vnodes.some((node) => {
    if (node.type === Comment) return false;
    if (node.type === Fragment) {
      return (node.children as VNode[])?.some(
        (child) => child.type !== Comment,
      );
    }
    return true;
  });
});
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        :variant="variant"
        :data-test="dataTest"
        :disabled="!hasItems"
        class="w-full gap-2 !rounded-b-md data-[state=closed]:!rounded-t-md data-[state=open]:!rounded-t-none"
      >
        {{ label }}
        <ChevronDown class="size-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent
      v-if="hasItems"
      :align="align"
      :side-offset="0"
      class="w-[var(--reka-dropdown-menu-trigger-width)] !translate-y-0 !rounded-none !rounded-t-md !border-0 !p-0"
    >
      <slot />
    </DropdownMenuContent>
  </DropdownMenu>
</template>
