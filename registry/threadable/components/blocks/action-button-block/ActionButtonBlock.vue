<script setup lang="ts">
import type { Component } from "vue";
import { computed } from "vue";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "@lucide/vue";
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { actionButtonVariants } from ".";
import type { ActionButtonVariant } from ".";

interface Props {
  label: string;
  icon: Component;
  dataTest: string;
  variant?: ActionButtonVariant;
  disabled?: boolean;
  processing?: boolean;
  disabledMessage?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "neutral",
  disabled: false,
  processing: false,
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const isUnavailable = computed(() => props.disabled || props.processing);

const buttonClass = computed(() =>
  actionButtonVariants({ variant: props.variant }),
);

const tooltipMessage = computed(() =>
  props.disabled && props.disabledMessage
    ? `${props.label}. ${props.disabledMessage}`
    : props.label,
);
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger v-if="isUnavailable" as-child>
        <span
          class="inline-flex rounded-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          tabindex="0"
          role="group"
          :aria-label="tooltipMessage"
          :aria-busy="processing ? 'true' : undefined"
        >
          <Button
            type="button"
            variant="outline"
            size="sm"
            :class="buttonClass"
            :aria-label="label"
            :data-test="dataTest"
            disabled
          >
            <LoaderCircle
              v-if="processing"
              class="size-4 animate-spin"
              aria-hidden="true"
            />
            <component :is="icon" class="size-4" aria-hidden="true" />
            <span class="sr-only">{{ label }}</span>
          </Button>
        </span>
      </TooltipTrigger>
      <TooltipTrigger v-else as-child>
        <Button
          type="button"
          variant="outline"
          size="sm"
          :class="buttonClass"
          :aria-label="label"
          :data-test="dataTest"
          @click="emit('click', $event)"
        >
          <component :is="icon" class="size-4" aria-hidden="true" />
          <span class="sr-only">{{ label }}</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        {{ tooltipMessage }}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
