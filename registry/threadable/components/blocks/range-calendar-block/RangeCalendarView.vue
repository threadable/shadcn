<script setup lang="ts">
import type { DateRange, DateValue } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { RangeCalendar } from "@/components/ui/range-calendar";

interface Props {
  class?: HTMLAttributes["class"];
  locale?: string;
  minValue?: DateValue;
  maxValue?: DateValue;
  disabled?: boolean;
  initialFocus?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  locale: "en-GB",
  disabled: false,
  initialFocus: false,
});
const model = defineModel<DateRange | undefined>();
</script>

<template>
  <RangeCalendar v-model="model" v-bind="props" />
</template>
