<script setup lang="ts">
import { useMediaQuery } from "@vueuse/core";
import { CalendarIcon } from "@lucide/vue";
import type { DateRange, DateValue, PrimitiveProps } from "reka-ui";
import { Primitive } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { computed, ref, shallowRef, watch } from "vue";
import { Field } from "@/registry/threadable/components/blocks/field";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn, guidGenerator } from "@/registry/threadable/lib/utils";
import RangeCalendarView from "./RangeCalendarView.vue";

interface Props extends PrimitiveProps {
  class?: HTMLAttributes["class"];
  error?: string;
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
  defaultValue?: DateRange;
  minValue?: DateValue;
  maxValue?: DateValue;
  triggerClass?: HTMLAttributes["class"];
  required?: boolean;
  clearLabel?: string;
  applyLabel?: string;
}
const props = withDefaults(defineProps<Props>(), {
  clearLabel: "Clear",
  applyLabel: "Apply",
  disabled: false,
  showError: true,
  placeholder: "Pick a date range",
  locale: "en-GB",
  dateFormat: "yyyy-MM-dd",
});
const model = defineModel<DateRange | undefined>("modelValue");
const emit = defineEmits<{
  (event: "apply", value: DateRange | undefined): void;
  (event: "clear"): void;
}>();
defineSlots<{ presets?: () => unknown; description?: () => unknown }>();
const generatedId = `range-calendar-${guidGenerator()}`;
const calendarId = computed(() => props.id ?? generatedId);
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
const isMobile = useMediaQuery("(max-width: 767px)");
const isOpen = ref(false);
function normalizeRange(value?: DateRange): DateRange | undefined {
  return value ? { start: value.start, end: value.end } : undefined;
}
const internalRange = shallowRef<DateRange | undefined>(
  normalizeRange(model.value ?? props.defaultValue),
);
const committedRange = shallowRef(normalizeRange(internalRange.value));
const canApplyDateRange = computed(() =>
  Boolean(internalRange.value?.start && internalRange.value?.end),
);
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
const dateRangeText = computed(() => {
  const range = committedRange.value;

  if (!range?.start) {
    return "";
  }

  const start = formatDate(range.start);

  return range.end ? `${start} - ${formatDate(range.end)}` : start;
});
function restoreRange(): void {
  internalRange.value = normalizeRange(committedRange.value);
}
function applyDateRange(): void {
  if (!canApplyDateRange.value) {
    return;
  }

  const range = normalizeRange(internalRange.value);
  committedRange.value = normalizeRange(range);
  model.value = range;
  emit("apply", range);
  isOpen.value = false;
}
function clearDateRange(): void {
  committedRange.value = undefined;
  internalRange.value = undefined;
  model.value = undefined;
  emit("clear");
  isOpen.value = false;
}
watch(
  model,
  (value) => {
    committedRange.value = normalizeRange(value);
    if (!isOpen.value) {
      internalRange.value = normalizeRange(value);
    }
  },
  { deep: true },
);
watch(isOpen, (open) => {
  if (open) {
    internalRange.value = normalizeRange(committedRange.value);
  } else {
    restoreRange();
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
    :show-error="showError"
    :required="required"
  >
    <component :is="isMobile ? Dialog : Popover" v-model:open="isOpen">
      <component :is="isMobile ? DialogTrigger : PopoverTrigger" as-child>
        <Primitive
          as="button"
          type="button"
          :id="calendarId"
          :class="
            cn(
              'inline-flex h-9 w-full cursor-pointer items-center justify-start gap-2 rounded-md border border-primary bg-background px-3 text-sm font-normal text-foreground shadow-xs transition-all hover:bg-accent disabled:pointer-events-none disabled:opacity-50',
              props.triggerClass,
            )
          "
          :disabled="disabled || processing"
          :aria-labelledby="
            label ? `${labelId} ${calendarId}-value` : undefined
          "
          :aria-describedby="describedBy"
          :aria-errormessage="errorId"
          :aria-invalid="error ? 'true' : 'false'"
          :data-test="dataTest || `range-calendar-block-${name}`"
        >
          <CalendarIcon
            class="size-5 text-foreground"
            aria-hidden="true"
          /><span :id="`${calendarId}-value`" class="text-foreground">{{
            dateRangeText || placeholder
          }}</span>
        </Primitive>
      </component>
      <component
        :is="isMobile ? DialogContent : PopoverContent"
        :class="
          isMobile
            ? 'top-0 left-0 h-dvh w-screen max-w-none translate-x-0 translate-y-0 rounded-none border-0 p-0 sm:max-w-none'
            : 'w-fit max-w-[calc(100vw-1rem)] p-0'
        "
        :aria-label="label || placeholder"
        @close-auto-focus="restoreTriggerFocus"
        align="start"
      >
        <div :class="isMobile ? 'h-full overflow-y-auto p-3' : 'w-fit p-3'">
          <DialogTitle v-if="isMobile" class="sr-only">
            {{ label || placeholder }}
          </DialogTitle>
          <DialogDescription v-if="isMobile" class="sr-only">
            {{ description || placeholder }}
          </DialogDescription>
          <h4 v-else class="sr-only">
            {{ label || placeholder }}
          </h4>
          <slot name="presets" />
          <RangeCalendarView
            v-model="internalRange"
            :disabled="disabled || processing"
            :initial-focus="true"
            :locale="locale"
            :min-value="minValue"
            :max-value="maxValue"
          />
          <div class="mt-3 flex gap-2 border-t pt-3">
            <Button
              type="button"
              size="sm"
              variant="outline"
              class="flex-1"
              data-test="range-calendar-block-clear-button"
              :disabled="disabled || processing"
              @click="clearDateRange"
            >
              {{ clearLabel }}
            </Button>
            <Button
              type="button"
              size="sm"
              class="flex-1"
              :disabled="!canApplyDateRange || disabled || processing"
              data-test="range-calendar-block-apply-button"
              @click="applyDateRange"
            >
              {{ applyLabel }}
            </Button>
          </div>
        </div>
      </component>
    </component>
    <slot name="description" />
  </Field>
</template>
