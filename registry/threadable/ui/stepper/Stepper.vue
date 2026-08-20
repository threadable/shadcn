<script setup lang="ts">
import {
  StepperRoot,
  type StepperRootEmits,
  type StepperRootProps,
  useForwardPropsEmits,
} from "reka-ui";

const props = defineProps<StepperRootProps>();
const emits = defineEmits<StepperRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <StepperRoot data-slot="stepper" v-bind="forwarded">
    <slot />
  </StepperRoot>
</template>
