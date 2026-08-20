<script setup lang="ts">
import { StepperTrigger, type StepperTriggerProps } from "reka-ui";
import { cn } from "@/registry/threadable/lib/utils";
import { computed } from "vue";

const props = defineProps<
  StepperTriggerProps & {
    class?: string;
  }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;
  return delegated;
});
</script>

<template>
  <StepperTrigger
    data-slot="stepper-trigger"
    v-bind="delegatedProps"
    :class="
      cn(
        'inline-flex items-center gap-3 rounded-md text-sm font-medium',
        props.class,
      )
    "
  >
    <slot />
  </StepperTrigger>
</template>
