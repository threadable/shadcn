<script setup lang="ts">
import { computed } from "vue";
import type { HTMLAttributes } from "vue";
import { cn } from "@/registry/threadable/lib/utils";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/registry/threadable/ui/base-field";
import FieldError from "@/registry/threadable/ui/base-field/FieldError.vue";
import { guidGenerator } from "@/registry/threadable/lib/utils";
import type { PrimitiveProps } from "reka-ui";

interface Props extends PrimitiveProps {
  class?: HTMLAttributes["class"];
  error?: string | undefined;
  label?: string;
  description?: string | undefined;
  id?: string;
  labelId?: string;
  descriptionId?: string;
  errorId?: string;
  showError?: boolean;
  showGap?: boolean;
  required?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showError: true,
  showGap: true,
});

const generatedId = "field-" + guidGenerator();
const fieldId = computed(() => props.id || generatedId);
</script>

<template>
  <Field :class="cn('grid gap-1', props.class)">
    <FieldLabel v-if="label" :id="labelId" :for="fieldId">
      {{ label }}
      <span v-if="required" class="text-muted-foreground"> (required) </span>
    </FieldLabel>
    <FieldDescription v-if="description" :id="descriptionId">
      {{ description }}
      <slot name="description" />
    </FieldDescription>
    <slot />
    <div v-if="showGap" class="min-h-5">
      <FieldError
        v-if="showError && error"
        :id="errorId"
        :errors="[error]"
        class="text-xs md:text-sm"
        :aria-errormessage="error"
      />
    </div>
  </Field>
</template>
