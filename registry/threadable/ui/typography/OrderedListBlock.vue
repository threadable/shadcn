<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/registry/threadable/lib/utils";

defineProps<{
  items: string[];
  class?: HTMLAttributes["class"];
  itemClass?: HTMLAttributes["class"];
}>();
</script>

<template>
  <ol :class="cn('list-decimal space-y-2 pl-5', $props.class)">
    <li v-for="item in items" :key="item" :class="itemClass">
      {{ item }}
    </li>
  </ol>
</template>
