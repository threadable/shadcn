<script setup lang="ts">
import { computed } from "vue";
import { guidGenerator } from "@/registry/threadable/lib/utils";
import { Field } from "@/registry/threadable/ui/field";
import type { PrimitiveProps } from "reka-ui";
import CheckboxBlock from "./CheckboxBlock.vue";

interface Props extends PrimitiveProps {
  items: any[];
  error?: string | undefined;
  label?: string;
  description?: string;
  name?: string;
  id?: string;
  dataTest?: string;
  processing?: boolean;
  disabled?: boolean;
  showError?: boolean;
  showGap?: boolean;
  itemKey?: string | number;
  itemLabel?: string | number;
  itemValue?: string | number;
  ariaLabel?: string;
  itemDataTestPrefix?: string;
  checkboxPosition?: "start" | "end";
  required?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  showError: true,
  itemKey: "uuid",
  itemLabel: "label",
  itemValue: "uuid",
  checkboxPosition: "start",
});

const generatedId = "checkbox-group-" + guidGenerator();
const groupId = computed(() => props.id || generatedId);

const model = defineModel<any[]>("modelValue", { default: () => [] });

function isSelected(itemValue: string | number): boolean {
  return model.value.includes(itemValue);
}

function toggleItem(
  itemValue: string | number,
  checked: boolean | "indeterminate",
): void {
  const nextSelectedValues = new Set(model.value);

  if (checked === true) {
    nextSelectedValues.add(itemValue);
  } else {
    nextSelectedValues.delete(itemValue);
  }

  model.value = [...nextSelectedValues];
}
</script>

<template>
  <Field
    :id="groupId"
    :label="label"
    :error="error"
    :description="description"
    :showError="showError"
    :show-gap="showGap"
    :required="required"
  >
    <div class="grid gap-6">
      <CheckboxBlock
        v-for="item in items"
        :key="item[itemKey]"
        :id="`${groupId}-${item[itemKey]}`"
        :model-value="isSelected(item[itemValue])"
        :item-value="item[itemValue]"
        :item-label="item[itemLabel]"
        :disabled="disabled || processing"
        :show-error="false"
        :checkbox-position="checkboxPosition"
        :data-test="
          itemDataTestPrefix
            ? `${itemDataTestPrefix}-${item[itemKey]}`
            : undefined
        "
        @update:model-value="toggleItem(item[itemValue], $event)"
      />
    </div>
  </Field>
</template>
