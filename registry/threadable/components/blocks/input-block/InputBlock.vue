<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { computed } from "vue";
import { Field } from "@/registry/threadable/components/blocks/field";
import { Input } from "@/components/ui/input";
import { cn, guidGenerator } from "@/registry/threadable/lib/utils";

interface Props extends PrimitiveProps {
  class?: HTMLAttributes["class"];
  error?: string | undefined;
  label?: string;
  description?: string;
  name: string;
  placeholder?: string;
  type?: "text" | "number" | "email" | "password" | "tel";
  inputmode?:
    | "none"
    | "text"
    | "tel"
    | "url"
    | "email"
    | "numeric"
    | "decimal"
    | "search";
  id?: string;
  dataTest?: string;
  processing?: boolean;
  disabled?: boolean;
  showError?: boolean;
  showGap?: boolean;
  maxlength?: number;
  min?: number;
  max?: number;
  autocomplete?: string;
  required?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  disabled: false,
  showError: true,
  showGap: true,
  maxlength: 255,
  autocomplete: "off",
});

const generatedId = "input-" + guidGenerator();
const inputId = computed(() => props.id || generatedId);
const labelId = computed(() => `${inputId.value}-label`);
const descriptionId = computed(() =>
  props.description ? `${inputId.value}-description` : undefined,
);
const errorId = computed(() =>
  props.showError && props.error ? `${inputId.value}-error` : undefined,
);
const describedBy = computed(
  () =>
    [descriptionId.value, errorId.value].filter(Boolean).join(" ") || undefined,
);

const model = defineModel<any | null>("modelValue");

function enforceMinMax(event: Event): void {
  if (
    props.type !== "number" ||
    (props.min !== undefined &&
      props.max !== undefined &&
      props.min > props.max)
  ) {
    return;
  }

  const input = event.target;

  if (!(input instanceof HTMLInputElement) || input.value.trim() === "") {
    return;
  }

  const value = input.valueAsNumber;

  if (!Number.isFinite(value)) {
    return;
  }

  const boundedValue = Math.min(
    props.max ?? Number.POSITIVE_INFINITY,
    Math.max(props.min ?? Number.NEGATIVE_INFINITY, value),
  );

  if (boundedValue !== value) {
    input.value = String(boundedValue);
    model.value = boundedValue;
  }
}
</script>

<template>
  <Field
    :id="inputId"
    :label="label"
    :error="error"
    :description="description"
    :label-id="labelId"
    :description-id="descriptionId"
    :error-id="errorId"
    :class="cn('grid gap-1', props.class)"
    :showError="showError"
    :showGap="showGap"
    :required="required"
  >
    <Input
      v-model="model"
      :id="inputId"
      :type="type"
      :name="name"
      :tabindex="0"
      :placeholder="placeholder"
      :inputmode="inputmode"
      :disabled="disabled || processing"
      :required="required"
      :data-test="dataTest || 'input-block-' + name"
      role="textbox"
      :aria-labelledby="label ? labelId : undefined"
      :aria-placeholder="placeholder"
      :aria-describedby="describedBy"
      :aria-errormessage="errorId"
      class="w-full border-primary bg-white! focus-visible:border-primary focus-visible:ring-[2px] focus-visible:ring-primary/20! disabled:bg-gray-100! disabled:text-black/50 disabled:opacity-100"
      :aria-invalid="error ? 'true' : 'false'"
      :aria-required="required ? 'true' : undefined"
      :maxlength="maxlength"
      :min="min"
      :max="max"
      @change="enforceMinMax"
    />
    <slot name="description" />
  </Field>
</template>
