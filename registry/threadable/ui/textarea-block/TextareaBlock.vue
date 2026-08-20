<script setup lang="ts">
import { computed } from "vue";
import type { HTMLAttributes } from "vue";
import { cn, guidGenerator } from "@/registry/threadable/lib/utils";
import { Field } from "@/registry/threadable/ui/field";
import type { PrimitiveProps } from "reka-ui";
import { Textarea } from "@/registry/threadable/ui/textarea";

interface Props extends PrimitiveProps {
  class?: HTMLAttributes["class"];
  error?: string | undefined;
  label?: string;
  description?: string;
  name: string;
  placeholder?: string;
  id?: string;
  dataTest?: string;
  processing?: boolean;
  disabled?: boolean;
  showError?: boolean;
  maxLength?: number;
  rows?: number;
  required?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  showError: true,
  rows: 3,
});

const generatedId = "textarea-" + guidGenerator();
const textareaId = computed(() => props.id || generatedId);
const labelId = computed(() => `${textareaId.value}-label`);
const descriptionId = computed(() =>
  props.description ? `${textareaId.value}-description` : undefined,
);
const errorId = computed(() =>
  props.showError && props.error ? `${textareaId.value}-error` : undefined,
);
const describedBy = computed(
  () =>
    [descriptionId.value, errorId.value].filter(Boolean).join(" ") || undefined,
);

const model = defineModel<string | number | undefined>("modelValue");
</script>

<template>
  <Field
    :id="textareaId"
    :label="label"
    :error="error"
    :description="description"
    :label-id="labelId"
    :description-id="descriptionId"
    :error-id="errorId"
    :class="cn('grid gap-1', props.class)"
    :showError="showError"
    :required="required"
  >
    <Textarea
      v-model="model"
      :id="textareaId"
      :name="name"
      :tabindex="0"
      :placeholder="placeholder"
      :disabled="disabled || processing"
      :required="required"
      :data-test="dataTest || 'textarea-block-' + name"
      :rows="rows"
      :aria-labelledby="label ? labelId : undefined"
      :aria-placeholder="placeholder"
      :aria-describedby="describedBy"
      :aria-errormessage="errorId"
      class="flex field-sizing-content min-h-16 w-full rounded-md border border-primary bg-white! px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:text-black/50 disabled:opacity-100 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:ring-destructive/40"
      :aria-invalid="error ? 'true' : 'false'"
      :aria-required="required ? 'true' : undefined"
      :maxlength="maxLength || undefined"
    />
    <slot name="description" />
  </Field>
</template>
