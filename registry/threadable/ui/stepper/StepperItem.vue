<script setup lang="ts">
import { StepperItem, type StepperItemProps } from "reka-ui";
import { cn } from "@/registry/threadable/lib/utils";
import { computed } from "vue";

const props = defineProps<
  StepperItemProps & {
    class?: string;
  }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;
  return delegated;
});
</script>

<template>
  <StepperItem
    data-slot="stepper-item"
    v-bind="delegatedProps"
    :class="
      cn(
        'group flex flex-1 items-center gap-2 data-[disabled]:pointer-events-none',
        props.class,
      )
    "
  >
    <slot />
  </StepperItem>
</template>
