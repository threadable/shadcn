<script setup lang="ts">
import { StepperDescription, type StepperDescriptionProps } from "reka-ui";
import { cn } from "@/registry/threadable/lib/utils";
import { computed } from "vue";

const props = defineProps<
  StepperDescriptionProps & {
    class?: string;
  }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;
  return delegated;
});
</script>

<template>
  <StepperDescription
    data-slot="stepper-description"
    v-bind="delegatedProps"
    :class="cn('text-xs text-muted-foreground', props.class)"
  >
    <slot />
  </StepperDescription>
</template>
