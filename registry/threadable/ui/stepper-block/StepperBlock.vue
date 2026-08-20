<script setup lang="ts">
import { Check } from "@lucide/vue";
import {
  Stepper,
  StepperItem,
  StepperTrigger,
  StepperIndicator,
  StepperSeparator,
  StepperTitle,
} from "@/registry/threadable/ui/stepper";

interface Step {
  value: number;
  title: string;
}

interface Props {
  steps: Step[];
  currentStep: number;
}

defineProps<Props>();
</script>

<template>
  <Stepper :model-value="currentStep" class="flex w-full items-center">
    <StepperItem
      v-for="(step, index) in steps"
      :key="step.value"
      :step="step.value"
      :class="index === steps.length - 1 ? 'flex-none!' : ''"
    >
      <StepperTrigger class="flex items-center gap-2">
        <StepperIndicator
          :class="index === currentStep - 1 ? 'border-orange! bg-orange!' : ''"
        >
          <Check v-if="currentStep > step.value" class="h-4 w-4" />
          <span v-else>{{ step.value }}</span>
        </StepperIndicator>
        <StepperTitle as="span" class="hidden md:block">
          {{ step.title }}
        </StepperTitle>
      </StepperTrigger>
      <StepperSeparator v-if="index < steps.length - 1" />
    </StepperItem>
  </Stepper>
</template>
