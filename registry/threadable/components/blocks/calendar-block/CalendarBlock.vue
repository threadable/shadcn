<script setup lang="ts">
import type { DateValue } from "@internationalized/date";
import { CalendarIcon } from "@lucide/vue";
import { Primitive } from "reka-ui";
import type { PrimitiveProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { computed, ref, shallowRef, watch } from "vue";
import { Field } from "@/registry/threadable/components/blocks/field";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn, guidGenerator } from "@/registry/threadable/lib/utils";

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
  locale?: string;
  dateFormat?: string;
  defaultValue?: DateValue;
  minValue?: DateValue;
  maxValue?: DateValue;
  yearRange?: DateValue[];
  layout?: "month-and-year" | "month-only" | "year-only";
  required?: boolean;
  clearLabel?: string;
  applyLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  clearLabel: "Clear",
  applyLabel: "Apply",
  disabled: false,
  showError: true,
  placeholder: "Pick a date",
  locale: "en-GB",
  dateFormat: "dd-MM-yyyy",
});

const generatedId = "calendar-" + guidGenerator();
const calendarId = computed(() => props.id || generatedId);
const labelId = computed(() => `${calendarId.value}-label`);
const descriptionId = computed(() =>
  props.description ? `${calendarId.value}-description` : undefined,
);
const errorId = computed(() =>
  props.showError && props.error ? `${calendarId.value}-error` : undefined,
);
const describedBy = computed(
  () =>
    [descriptionId.value, errorId.value].filter(Boolean).join(" ") || undefined,
);

interface Emits {
  (e: "update:modelValue", value: DateValue | undefined): void;
  (e: "apply", value: DateValue | undefined): void;
  (e: "clear"): void;
}

const emit = defineEmits<Emits>();

const model = defineModel<DateValue | undefined>("modelValue");
const internalDate = shallowRef<DateValue | undefined>(
  model.value === undefined ? props.defaultValue : model.value,
);

const committedDate = shallowRef(internalDate.value);

const minDate = computed(() => props.minValue);
const maxDate = computed(() => props.maxValue);

const internalOpen = ref(false);

function pad(value: number): string {
  return String(value).padStart(2, "0");
}

function formatDate(value: DateValue): string {
  const tokens: Record<string, string> = {
    yyyy: String(value.year),
    yy: String(value.year).slice(-2),
    MM: pad(value.month),
    M: String(value.month),
    dd: pad(value.day),
    d: String(value.day),
  };

  return props.dateFormat.replace(
    /yyyy|yy|MM|M|dd|d/g,
    (token) => tokens[token] ?? token,
  );
}

const dateText = computed(() =>
  committedDate.value ? formatDate(committedDate.value) : "",
);

const applyDate = (): void => {
  committedDate.value = internalDate.value;
  model.value = internalDate.value;
  emit("apply", internalDate.value);
  internalOpen.value = false;
};

const clearDate = (): void => {
  committedDate.value = undefined;
  internalDate.value = undefined;
  model.value = undefined;
  emit("clear");
  internalOpen.value = false;
};

watch(
  () => model.value,
  (newVal) => {
    committedDate.value = newVal;
    internalDate.value = newVal;
  },
);

watch(internalOpen, (isOpen) => {
  if (!isOpen) {
    internalDate.value = committedDate.value;
  }
});
const restoreTriggerFocus = (event: Event): void => {
  event.preventDefault();
  document.getElementById(calendarId.value)?.focus();
};
</script>

<template>
  <Field
    :id="calendarId"
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
    <Dialog v-model:open="internalOpen">
      <DialogTrigger as-child>
        <Primitive
          as="button"
          type="button"
          :id="calendarId"
          :class="
            cn(
              'inline-flex h-9 w-full cursor-pointer items-center justify-start gap-2 rounded-md border border-primary bg-background px-3 text-sm font-normal text-foreground shadow-xs transition-all hover:bg-accent disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
            )
          "
          :disabled="disabled || processing"
          :aria-labelledby="
            label ? `${labelId} ${calendarId}-value` : undefined
          "
          :aria-label="label ? undefined : placeholder"
          :aria-describedby="describedBy"
          :aria-errormessage="errorId"
          :aria-invalid="error ? 'true' : 'false'"
          aria-haspopup="dialog"
          :aria-expanded="internalOpen"
          :data-test="dataTest || 'calendar-block-' + name"
        >
          <CalendarIcon class="h-5 w-5 text-foreground" aria-hidden="true" />
          <span :id="`${calendarId}-value`" class="text-foreground">{{
            dateText || placeholder
          }}</span>
        </Primitive>
      </DialogTrigger>
      <DialogContent
        class="w-auto max-w-[calc(100vw-1rem)] p-0"
        @close-auto-focus="restoreTriggerFocus"
      >
        <DialogTitle class="sr-only">
          {{ label || placeholder }}
        </DialogTitle>
        <DialogDescription class="sr-only">
          {{ description || placeholder }}
        </DialogDescription>
        <div class="p-3">
          <Calendar
            v-model="internalDate"
            :disabled="disabled || processing"
            :initial-focus="true"
            :locale="locale"
            :layout="layout"
            :min-value="minDate"
            :max-value="maxDate"
            :year-range="yearRange"
          />
          <div class="mt-3 flex gap-2 border-t pt-3">
            <Button
              type="button"
              :disabled="disabled || processing"
              @click="clearDate"
              size="sm"
              variant="outline"
              class="flex-1 cursor-pointer"
            >
              {{ clearLabel }}
            </Button>
            <Button
              type="button"
              :disabled="disabled || processing"
              @click="applyDate"
              size="sm"
              class="flex-1 cursor-pointer"
            >
              {{ applyLabel }}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
    <slot name="description" />
  </Field>
</template>
