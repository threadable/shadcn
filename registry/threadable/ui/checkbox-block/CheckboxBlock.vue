<script setup lang="ts">
import { computed } from "vue";
import type { PrimitiveProps } from "reka-ui";
import { guidGenerator } from "@/registry/threadable/lib/utils";
import { cn } from "@/registry/threadable/lib/utils";
import { Label } from "@/registry/threadable/ui/label";
import { Checkbox } from "@/registry/threadable/ui/checkbox";
import FieldError from "@/registry/threadable/ui/base-field/FieldError.vue";

interface Props extends PrimitiveProps {
  error?: string | undefined;
  description?: string;
  name?: string;
  id?: string;
  label?: string;
  value?: string | number;
  dataTest?: string;
  disabled?: boolean;
  showError?: boolean;
  itemLabel: string;
  itemValue: string | number;
  checkboxPosition?: "start" | "end";
  required?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  showError: true,
  checkboxPosition: "start",
});

const generatedId = "checkbox-block-" + guidGenerator();
const checkboxId = computed(() => props.id || generatedId);

const model = defineModel<any | null>("modelValue");
</script>

<template>
  <div class="grid gap-1">
    <div
      :class="
        cn('flex min-w-0 items-center gap-3', {
          'flex-row-reverse justify-between': checkboxPosition === 'end',
        })
      "
    >
      <Checkbox
        role="checkbox"
        v-model="model"
        :id="checkboxId"
        :value="itemValue"
        :disabled="disabled"
        :required="required"
        :aria-required="required ? 'true' : undefined"
        class="cursor-pointer border border-primary"
        :data-test="dataTest"
      />
      <Label :for="checkboxId" class="block flex-1 cursor-pointer truncate">
        {{ itemLabel }}
        <span v-if="required" class="text-muted-foreground"> (required) </span>
      </Label>
    </div>

    <FieldError
      v-if="showError"
      :errors="[error]"
      class="min-h-5 text-xs md:text-sm"
      :aria-errormessage="error"
    />
  </div>
</template>
