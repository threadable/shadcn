<script setup lang="ts">
import { computed } from "vue";
import { guidGenerator } from "@/registry/threadable/lib/utils";
import { RadioGroup } from "@/registry/threadable/ui/radio-group";
import { Field } from "@/registry/threadable/ui/field";
import type { PrimitiveProps } from "reka-ui";
import RadioGroupBlockItem from "./RadioGroupBlockItem.vue";

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
  itemKey?: string | number;
  itemLabel?: string | number;
  itemValue?: string | number;
  itemAriaLabel?: string | number;
  ariaLabel?: string;
  required?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  disabled: false,
  showError: true,
  itemKey: "uuid",
  itemLabel: "label",
  itemValue: "uuid",
  itemAriaLabel: "ariaLabel",
});

const generatedId = "radio-group-" + guidGenerator();
const groupId = computed(() => props.id || generatedId);

const model = defineModel<any | null>("modelValue");
</script>

<template>
  <Field
    :id="groupId"
    :label="label"
    :error="error"
    :description="description"
    :showError="showError"
    :required="required"
  >
    <RadioGroup
      v-model="model"
      class="grid gap-2"
      :required="required"
      :aria-required="required ? 'true' : undefined"
    >
      <RadioGroupBlockItem
        v-for="item in items"
        :key="item[itemKey]"
        :id="`${groupId}-${item[itemKey]}`"
        :item-value="item[itemValue]"
        :item-label="item[itemLabel]"
        :item-aria-label="item[itemAriaLabel] ?? item[itemLabel]"
        @select="model = $event"
      />
    </RadioGroup>
  </Field>
</template>
