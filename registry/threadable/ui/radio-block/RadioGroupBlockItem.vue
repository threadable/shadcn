<script setup lang="ts">
import { computed } from "vue";
import { RadioGroupItem } from "@/registry/threadable/ui/radio-group";
import type { PrimitiveProps } from "reka-ui";
import { guidGenerator } from "@/registry/threadable/lib/utils";
import { Label } from "@/registry/threadable/ui/label";

interface Props extends PrimitiveProps {
  error?: string | undefined;
  description?: string;
  name?: string;
  id?: string;
  label?: string;
  value?: string | number;
  dataTest?: string;
  processing?: boolean;
  disabled?: boolean;
  showError?: boolean;
  itemLabel: string | number;
  itemAriaLabel?: string | number;
  itemValue: string | number;
  verticalAlign?: "items-start" | "items-center" | "items-end";
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  showError: true,
  verticalAlign: "items-start",
});
const emit = defineEmits<{
  select: [value: string | number];
}>();

const generatedId = "radio-group-item-" + guidGenerator();
const itemId = computed(() => props.id || generatedId);
const accessibleLabel = computed(
  () => props.itemAriaLabel?.toString() ?? props.itemLabel.toString(),
);
const hasCustomAccessibleLabel = computed(
  () => accessibleLabel.value !== props.itemLabel.toString(),
);

const selectItem = () => {
  if (props.disabled || props.processing) {
    return;
  }

  emit("select", props.itemValue);
};
</script>

<template>
  <div class="flex space-x-2" :class="verticalAlign">
    <RadioGroupItem
      :id="itemId"
      :value="props.itemValue"
      :aria-label="hasCustomAccessibleLabel ? accessibleLabel : undefined"
      :disabled="disabled || processing"
      class="cursor-pointer"
    ></RadioGroupItem>
    <Label :for="itemId" class="cursor-pointer break-all" @click="selectItem">
      <template v-if="hasCustomAccessibleLabel">
        <span class="sr-only">{{ accessibleLabel }}</span>
        <span aria-hidden="true">{{ props.itemLabel }}</span>
      </template>
      <template v-else>
        {{ props.itemLabel }}
      </template>
    </Label>
  </div>
</template>
