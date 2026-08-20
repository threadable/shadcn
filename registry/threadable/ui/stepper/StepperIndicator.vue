<script setup lang="ts">
import { StepperIndicator, type StepperIndicatorProps } from "reka-ui";
import { cn } from "@/registry/threadable/lib/utils";
import { computed } from "vue";

const props = defineProps<
  StepperIndicatorProps & {
    class?: string;
  }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;
  return delegated;
});
</script>

<template>
  <StepperIndicator
    data-slot="stepper-indicator"
    v-bind="delegatedProps"
    :class="
      cn(
        'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold',
        'group-data-[state=active]:border-primary group-data-[state=active]:bg-primary group-data-[state=active]:text-primary-foreground',
        'group-data-[state=completed]:border-primary group-data-[state=completed]:bg-primary group-data-[state=completed]:text-primary-foreground',
        'group-data-[state=inactive]:border-muted-foreground/30 group-data-[state=inactive]:text-muted-foreground',
        props.class,
      )
    "
  >
    <slot />
  </StepperIndicator>
</template>
