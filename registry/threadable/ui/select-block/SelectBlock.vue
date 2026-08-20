<script setup lang="ts">
import { computed } from "vue";
import type { HTMLAttributes } from "vue";
import { cn, guidGenerator } from "@/registry/threadable/lib/utils";
import { Field } from "@/registry/threadable/ui/field";
import type { PrimitiveProps } from "reka-ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/threadable/ui/base-select";

interface SelectItemOption {
  value: string | number;
  name: string;
  lang?: string;
  assistiveLabel?: string;
  assistiveLang?: string;
}

interface Props extends PrimitiveProps {
  defaultValue?: string | number;
  class?: HTMLAttributes["class"];
  error?: string | undefined;
  label?: string;
  ariaLabel?: string;
  description?: string;
  name: string;
  placeholder?: string;
  multiple?: boolean;
  id?: string;
  dataTest?: string;
  processing?: boolean;
  disabled?: boolean;
  items?: SelectItemOption[] | null;
  allOptionShow?: boolean;
  allOptionValue?: string | number | null;
  allOptionLabel?: string;
  showError?: boolean;
  fitContentToTrigger?: boolean;
  contentClass?: HTMLAttributes["class"];
  required?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  multiple: false,
  processing: false,
  disabled: false,
  items: () => [],
  allOptionShow: true,
  allOptionValue: null,
  allOptionLabel: "All",
  showError: true,
  fitContentToTrigger: false,
});

const generatedId = "select-block-" + guidGenerator();
const selectId = computed(() => props.id || generatedId);
const labelId = computed(() => `${selectId.value}-label`);
const valueId = computed(() => `${selectId.value}-value`);
const descriptionId = computed(() =>
  props.description ? `${selectId.value}-description` : undefined,
);
const errorId = computed(() =>
  props.showError && props.error ? `${selectId.value}-error` : undefined,
);
const describedBy = computed(
  () =>
    [descriptionId.value, errorId.value].filter(Boolean).join(" ") || undefined,
);

const model = defineModel<any | null>("modelValue");
const items = computed<SelectItemOption[]>(() =>
  Array.isArray(props.items) ? props.items : [],
);

const selectedLabel = computed(() => {
  const values = Array.isArray(model.value) ? model.value : [model.value];
  const labels = values
    .map((value) => {
      if (value === null || value === undefined || value === "") return null;

      if (props.allOptionShow && value === props.allOptionValue) {
        return props.allOptionLabel;
      }

      return (
        items.value.find((item) => item.value === value)?.name ?? String(value)
      );
    })
    .filter((label): label is string => Boolean(label));

  return labels.join(", ");
});

const selectedLang = computed(() => {
  if (Array.isArray(model.value)) return undefined;

  return items.value.find((item) => item.value === model.value)?.lang;
});

const selectedAssistiveLabel = computed(() => {
  if (Array.isArray(model.value)) return undefined;

  return items.value.find((item) => item.value === model.value)?.assistiveLabel;
});

const selectedAssistiveLang = computed(() => {
  if (Array.isArray(model.value)) return undefined;

  return items.value.find((item) => item.value === model.value)?.assistiveLang;
});

const triggerLabelledBy = computed(() => {
  if (selectedAssistiveLabel.value || props.ariaLabel || !props.label) {
    return undefined;
  }

  return `${labelId.value} ${valueId.value}`;
});

const triggerAriaLabel = computed(() => {
  const baseLabel =
    props.ariaLabel || props.label || props.placeholder || props.name;
  const valueLabel =
    selectedAssistiveLabel.value || selectedLabel.value || props.placeholder;

  if (!selectedAssistiveLabel.value && !props.ariaLabel && props.label) {
    return undefined;
  }

  if (!valueLabel || valueLabel === baseLabel) return baseLabel;

  return `${baseLabel}: ${valueLabel}`;
});

const contentClasses = computed(() =>
  cn(
    "max-w-[calc(100vw-2rem)]",
    props.fitContentToTrigger && "w-[var(--reka-select-trigger-width)]",
    props.contentClass,
  ),
);
</script>

<template>
  <Field
    :id="selectId"
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
    <Select
      v-model="model"
      :name="name"
      :multiple="multiple"
      :required="required"
      tabindex="0"
      :aria-placeholder="placeholder"
      class="w-full"
    >
      <SelectTrigger
        :id="selectId"
        :class="cn(props.class)"
        :disabled="disabled || processing"
        :aria-invalid="error ? 'true' : 'false'"
        :aria-required="required ? 'true' : undefined"
        :aria-errormessage="errorId"
        :aria-describedby="describedBy"
        :aria-labelledby="triggerLabelledBy"
        :aria-label="triggerAriaLabel"
        class="select-trigger w-full max-w-full cursor-pointer overflow-hidden border-primary bg-white! aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40"
        :data-test="dataTest || 'select-block-' + name"
      >
        <div
          class="flex min-w-0 items-center justify-start gap-1 truncate text-black md:gap-2"
        >
          <slot name="icon" />
          <SelectValue
            :id="valueId"
            :placeholder="placeholder"
            :lang="selectedLang"
            :aria-label="selectedAssistiveLabel"
            :data-assistive-lang="selectedAssistiveLang"
          />
        </div>
      </SelectTrigger>
      <SelectContent :class="contentClasses">
        <SelectItem v-if="allOptionShow" :value="allOptionValue">
          {{ allOptionLabel }}
        </SelectItem>
        <template v-for="item in items" :key="item.value">
          <SelectItem
            :value="item.value"
            :lang="item.assistiveLang ?? item.lang"
            :aria-label="item.assistiveLabel"
          >
            <span :lang="item.lang">
              {{ item.name }}
            </span>
          </SelectItem>
        </template>
      </SelectContent>
    </Select>
    <slot name="description" />
  </Field>
</template>
