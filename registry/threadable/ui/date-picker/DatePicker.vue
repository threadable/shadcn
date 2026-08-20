<script setup lang="ts">
import type { DateValue } from "@internationalized/date";
import type { HTMLAttributes } from "vue";
import {
  DateFormatter,
  getLocalTimeZone,
  today,
} from "@internationalized/date";
import { CalendarIcon } from "@lucide/vue";
import { computed, ref } from "vue";

import { cn } from "@/registry/threadable/lib/utils";
import { Button } from "@/registry/threadable/ui/button";
import { Calendar } from "@/registry/threadable/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/threadable/ui/popover";

const props = withDefaults(
  defineProps<{
    modelValue?: DateValue;
    placeholder?: string;
    disabled?: boolean;
    ariaLabel?: string;
    class?: HTMLAttributes["class"];
  }>(),
  {
    placeholder: "Pick a date",
    disabled: false,
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: DateValue | undefined];
}>();

const open = ref(false);
const date = computed({
  get: () => props.modelValue,
  set: (value: DateValue | undefined) => emit("update:modelValue", value),
});
const defaultPlaceholder = today(getLocalTimeZone());
const formatter = new DateFormatter("en-US", { dateStyle: "long" });
const triggerLabel = computed(
  () =>
    props.ariaLabel ??
    (date.value
      ? formatter.format(date.value.toDate(getLocalTimeZone()))
      : props.placeholder),
);

const handleUpdate = (value: DateValue | undefined) => {
  date.value = value;
  open.value = false;
};
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        type="button"
        variant="outline"
        :disabled="disabled"
        :aria-label="triggerLabel"
        :class="
          cn(
            'w-[240px] justify-start text-left font-normal',
            !date && 'text-muted-foreground',
            props.class,
          )
        "
      >
        <CalendarIcon aria-hidden="true" />
        <span>{{
          date ? formatter.format(date.toDate(getLocalTimeZone())) : placeholder
        }}</span>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0" align="start">
      <Calendar
        :model-value="date"
        :default-placeholder="defaultPlaceholder"
        layout="month-and-year"
        initial-focus
        @update:model-value="handleUpdate"
      />
    </PopoverContent>
  </Popover>
</template>
