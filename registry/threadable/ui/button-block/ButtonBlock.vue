<script setup lang="ts">
import { computed } from "vue";
import type { HTMLAttributes } from "vue";
import { cn, guidGenerator } from "@/registry/threadable/lib/utils";
import { Field } from "@/registry/threadable/ui/field";
import type { PrimitiveProps } from "reka-ui";
import { Button, type ButtonVariants } from "@/registry/threadable/ui/button";
import { LoaderCircle } from "@lucide/vue";

interface Props extends PrimitiveProps {
  class?: HTMLAttributes["class"];
  label?: string;
  description?: string;
  type?: "submit" | "button";
  id?: string;
  processing?: boolean;
  dataTest?: string;
  variant?: ButtonVariants["variant"];
  size?: ButtonVariants["size"];
  disabled?: boolean;
  showError?: boolean;
  showGap?: boolean;
  buttonClass?: HTMLAttributes["class"];
  ariaLabel?: string;
  ariaDescribedBy?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: "submit",
  processing: false,
  variant: "default",
  size: "default",
  disabled: false,
  showError: true,
  showGap: true,
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const generatedId = "button-" + guidGenerator();
const buttonId = computed(() => props.id || generatedId);
const isUnavailable = computed(() => props.disabled || props.processing);
</script>

<template>
  <Field
    :id="buttonId"
    :description="description"
    :class="cn('grid gap-1', props.class)"
    :showError="false"
    :showGap="showGap"
  >
    <Button
      as="button"
      :id="buttonId"
      :type="type"
      :variant="variant"
      :size="size"
      :data-test="dataTest || 'button-block-' + buttonId"
      :disabled="isUnavailable"
      :class="cn('w-full cursor-pointer', props.buttonClass)"
      :aria-label="ariaLabel"
      :aria-disabled="isUnavailable ? 'true' : undefined"
      :aria-describedby="ariaDescribedBy"
      @click="emit('click', $event)"
    >
      <LoaderCircle v-if="processing" class="h-4 w-4 animate-spin" />
      <span aria-hidden="true" class="contents">
        <slot name="icon" />
      </span>
      <slot>
        {{ label }}
      </slot>
    </Button>
    <slot name="description" />
  </Field>
</template>
