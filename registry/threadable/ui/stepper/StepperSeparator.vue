<script setup lang="ts">
import { StepperSeparator, type StepperSeparatorProps } from "reka-ui";
import { cn } from "@/registry/threadable/lib/utils";
import { computed } from "vue";

const props = defineProps<
  StepperSeparatorProps & {
    class?: string;
  }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;
  return delegated;
});
</script>

<template>
  <StepperSeparator
    data-slot="stepper-separator"
    v-bind="delegatedProps"
    :class="
      cn(
        'mx-2 h-0.5 flex-1 rounded-full bg-muted-foreground/30 group-data-[state=completed]:bg-primary',
        props.class,
      )
    "
  />
</template>
