<script setup lang="ts">
import { Label } from "@/registry/threadable/ui/base-label";

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<{
  for?: string | number;
  id?: string | number;
  label?: string;
}>();
</script>

<template>
  <Label v-bind="$attrs" :for="(props.for ?? props.id) as string">
    <slot />
  </Label>
</template>
