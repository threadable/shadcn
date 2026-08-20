<script setup lang="ts">
import { type PrimitiveProps } from "reka-ui";
import { type HTMLAttributes } from "vue";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/registry/threadable/ui/base-select";

interface Props extends PrimitiveProps {
  class?: HTMLAttributes["class"];
  triggerClass?: HTMLAttributes["class"];
  placeholder: string;
  id?: string;
  ariaLabel?: string;
}

const props = defineProps<Props>();

const model = defineModel<any | null>("modelValue");
</script>

<template>
  <Select v-model="model" :class="props.class">
    <SelectTrigger
      :id="props.id"
      :class="props.triggerClass"
      :aria-label="props.ariaLabel"
    >
      <div
        class="flex items-center justify-center gap-1 md:justify-start md:gap-2"
      >
        <slot name="icon" />
        <SelectValue :placeholder="props.placeholder" />
      </div>
    </SelectTrigger>
    <SelectContent>
      <slot name="items" />
    </SelectContent>
  </Select>
</template>
