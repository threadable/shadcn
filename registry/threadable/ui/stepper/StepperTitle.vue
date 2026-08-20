<script setup lang="ts">
import { StepperTitle, type StepperTitleProps } from "reka-ui";
import { cn } from "@/registry/threadable/lib/utils";
import { computed } from "vue";

const props = defineProps<
  StepperTitleProps & {
    class?: string;
  }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;
  return delegated;
});
</script>

<template>
  <StepperTitle
    data-slot="stepper-title"
    v-bind="delegatedProps"
    :class="
      cn(
        'text-sm font-medium',
        'group-data-[state=active]:text-foreground',
        'group-data-[state=completed]:text-foreground',
        'group-data-[state=inactive]:text-muted-foreground',
        props.class,
      )
    "
  >
    <slot />
  </StepperTitle>
</template>
