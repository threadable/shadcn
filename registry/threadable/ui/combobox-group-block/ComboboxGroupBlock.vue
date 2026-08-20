<script setup lang="ts">
import { computed, ref, useTemplateRef } from "vue";
import type { HTMLAttributes } from "vue";
import { cn, guidGenerator } from "@/registry/threadable/lib/utils";
import { Field } from "@/registry/threadable/ui/field";
import type { PrimitiveProps } from "reka-ui";
import { CheckIcon, ChevronDownIcon } from "@lucide/vue";
import { Button } from "@/registry/threadable/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/registry/threadable/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/threadable/ui/popover";

import { useElementSize } from "@vueuse/core";

interface ComboboxItems {
  value: string | number;
  name: string;
}

interface ComboboxGroup {
  group: string;
  items: ComboboxItems[];
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
  id?: string;
  dataTest?: string;
  processing?: boolean;
  disabled?: boolean;
  groups: ComboboxGroup[];
  showError?: boolean;
  required?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  processing: false,
  placeholder: "Please select value",
  disabled: false,
  showError: true,
});

const model = defineModel<any | null>("modelValue");

const open = ref(false);
const generatedId = "combobox-group-block-" + guidGenerator();
const comboboxId = computed(() => props.id || generatedId);
const labelId = computed(() => `${comboboxId.value}-label`);
const valueId = computed(() => `${comboboxId.value}-value`);
const contentId = computed(() => `${comboboxId.value}-content`);
const descriptionId = computed(() =>
  props.description ? `${comboboxId.value}-description` : undefined,
);
const errorId = computed(() =>
  props.showError && props.error ? `${comboboxId.value}-error` : undefined,
);
const describedBy = computed(
  () =>
    [descriptionId.value, errorId.value].filter(Boolean).join(" ") || undefined,
);

const allItems = computed(() =>
  props.groups.flatMap((group: ComboboxGroup) => group.items),
);

const hasSelection = computed(
  () => model.value !== null && model.value !== undefined && model.value !== "",
);

const selectedLabel = computed(() => {
  if (!hasSelection.value) return "";

  return (
    allItems.value.find((item) => item.value === model.value)?.name ??
    String(model.value)
  );
});

const triggerLabelledBy = computed(() => {
  if (props.ariaLabel || !props.label) return undefined;

  return `${labelId.value} ${valueId.value}`;
});

const triggerAriaLabel = computed(() => {
  if (!props.ariaLabel && props.label) return undefined;

  const baseLabel =
    props.ariaLabel || props.label || props.placeholder || props.name;
  const valueLabel = selectedLabel.value || props.placeholder;

  if (!valueLabel || valueLabel === baseLabel) return baseLabel;

  return `${baseLabel}: ${valueLabel}`;
});

const el = useTemplateRef("el");
const { width } = useElementSize(el);

const selectItem = (value: string | number) => {
  model.value = value;
  open.value = false;
};
</script>

<template>
  <Field
    :id="comboboxId"
    :label="label"
    :error="error"
    :description="description"
    :label-id="labelId"
    :description-id="descriptionId"
    :error-id="errorId"
    :class="cn('grid gap-1', props.class)"
    :showError="showError"
    :required="required"
    ref="el"
  >
    <input type="hidden" :name="name" :value="model" :required="required" />
    <Popover v-model:open="open">
      <PopoverTrigger as-child>
        <Button
          :id="comboboxId"
          :disabled="disabled || processing"
          variant="outline"
          role="combobox"
          :aria-expanded="open"
          :aria-controls="contentId"
          :aria-invalid="error ? 'true' : 'false'"
          :aria-required="required ? 'true' : undefined"
          :aria-errormessage="errorId"
          :aria-describedby="describedBy"
          :aria-labelledby="triggerLabelledBy"
          :aria-label="triggerAriaLabel"
          class="select-trigger w-full cursor-pointer justify-between border-primary! bg-white! aria-invalid:border-destructive! aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40"
          :data-test="dataTest || 'combobox-block-' + comboboxId"
        >
          <span :id="valueId" class="min-w-0 truncate">
            {{ selectedLabel || placeholder }}
          </span>
          <ChevronDownIcon
            aria-hidden="true"
            class="size-4 shrink-0 opacity-50"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        :id="contentId"
        class="p-0"
        :style="'width:' + width + 'px !important;'"
      >
        <Command>
          <CommandInput class="h-9" :placeholder="placeholder" />
          <CommandList>
            <CommandEmpty>No found.</CommandEmpty>
            <template v-for="group in groups" :key="group.group">
              <CommandGroup :heading="group.group">
                <CommandItem
                  v-for="item in group.items"
                  :key="item.value"
                  :value="item.value"
                  :data-value="item.value"
                  @select="
                    () => {
                      selectItem(item.value);
                    }
                  "
                  @click="() => selectItem(item.value)"
                >
                  {{ item.name }}
                  <CheckIcon
                    :class="
                      cn(
                        'ml-auto',
                        model === item.value ? 'opacity-100' : 'opacity-0',
                      )
                    "
                  />
                </CommandItem>
              </CommandGroup>
            </template>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>

    <slot name="description" />
  </Field>
</template>
