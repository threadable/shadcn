<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue";
import { cn, guidGenerator } from "@/registry/threadable/lib/utils";
import { Field } from "@/registry/threadable/ui/field";
import type { PrimitiveProps } from "reka-ui";
import {
  Select,
  SelectContent,
  SelectGroup as BaseSelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/registry/threadable/ui/base-select";

interface SelectItems {
  value: string | number;
  name: string;
}

interface SelectGroup {
  group: string;
  items: SelectItems[];
}

interface Props extends PrimitiveProps {
  defaultValue?: string | number;
  class?: HTMLAttributes["class"];
  error?: string | undefined;
  label?: string;
  description?: string;
  name: string;
  placeholder?: string;
  multiple?: boolean;
  id?: string;
  dataTest?: string;
  processing?: boolean;
  disabled?: boolean;
  items: SelectGroup[];
  showError?: boolean;
  required?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  multiple: false,
  id: "select-group-block-" + guidGenerator(),
  processing: false,
  disabled: false,
  showError: true,
});

const labelId = computed(() => `${props.id}-label`);

const model = defineModel<any | null>("modelValue");
</script>

<template>
  <Field
    :id="id"
    :label="label"
    :error="error"
    :description="description"
    :label-id="labelId"
    :class="cn('grid gap-1', props.class)"
    :showError="showError"
    :required="required"
  >
    <Select
      v-model="model"
      :name="name"
      :id="id"
      :multiple="multiple"
      :required="required"
      tabindex="0"
      :aria-placeholder="placeholder"
      class="w-full"
    >
      <SelectTrigger
        :class="cn(props.class)"
        :disabled="disabled || processing"
        :aria-invalid="error ? 'true' : 'false'"
        :aria-labelledby="label ? labelId : undefined"
        :aria-required="required ? 'true' : undefined"
        class="select-trigger cursor-pointer border-primary bg-white! aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40"
        :data-test="dataTest || 'select-block-' + name"
      >
        <div
          class="flex items-center justify-center gap-1 text-black md:justify-start md:gap-2"
        >
          <slot name="icon" />
          <SelectValue :placeholder="placeholder" />
        </div>
      </SelectTrigger>
      <SelectContent>
        <template v-for="group in items" :key="group.group">
          <BaseSelectGroup>
            <SelectLabel
              class="rounded-sm bg-black/5 text-sm font-bold text-black"
              :for="id"
            >
              {{ group.group }}
            </SelectLabel>
            <div class="ml-1">
              <template v-for="item in group.items" :key="item.value">
                <SelectItem :value="item.value" class="cursor-pointer">
                  {{ item.name }}
                </SelectItem>
              </template>
            </div>
          </BaseSelectGroup>
        </template>
      </SelectContent>
    </Select>
    <slot name="description" />
  </Field>
</template>
