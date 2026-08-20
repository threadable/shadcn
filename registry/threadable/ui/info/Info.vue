<script setup lang="ts">
import { Info, TriangleAlert } from "@lucide/vue";
import { cn } from "@/registry/threadable/lib/utils";
import { type InfoVariants, infoVariants } from "@/registry/threadable/ui/info";
import { type PrimitiveProps } from "reka-ui";
import type { HTMLAttributes } from "vue";

interface Props extends PrimitiveProps {
  message: string | null;
  variant?: InfoVariants["variant"];
  size?: InfoVariants["size"];
  class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();

const iconClass = props.size === "sm" ? "mr-2 size-6" : "mr-2 size-8";
</script>

<template>
  <div v-if="message" :class="cn(infoVariants({ variant, size }), props.class)">
    <TriangleAlert :class="iconClass" v-if="variant === 'destructive'" />
    <Info :class="iconClass" v-else />
    {{ message }}
  </div>
</template>
