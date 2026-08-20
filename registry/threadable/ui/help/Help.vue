<script setup lang="ts">
import { cn } from "@/registry/threadable/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/registry/threadable/ui/tooltip";

import { Info } from "@lucide/vue";
import type { HTMLAttributes } from "vue";

const props = defineProps<{
  class?: HTMLAttributes["class"];
  side: "top" | "right" | "bottom" | "left" | undefined;
  tooltip: string;
}>();
</script>

<template>
  <Tooltip :class="cn(props.class)">
    <TooltipTrigger as-child>
      <div class="flex flex-row items-center" :class="cn(props.class)">
        <slot />
        <Info class="ml-1 size-4" />
      </div>
    </TooltipTrigger>
    <TooltipContent :side="side" align="center" class="w-[200px]">
      {{ tooltip }}
    </TooltipContent>
  </Tooltip>
</template>
