<script setup lang="ts">
import { computed } from "vue";
import type { HTMLAttributes } from "vue";
import { cn, guidGenerator } from "@/registry/threadable/lib/utils";
import type { PrimitiveProps } from "reka-ui";
import { Button, type ButtonVariants } from "@/registry/threadable/ui/button";
import { LoaderCircle } from "@lucide/vue";
import { Link } from "@inertiajs/vue3";
import { Field } from "@/registry/threadable/ui/field";

interface Props extends PrimitiveProps {
  class?: HTMLAttributes["class"];
  label: string;
  description?: string;
  id?: string;
  processing?: boolean;
  dataTest?: string;
  variant?: ButtonVariants["variant"];
  size?: ButtonVariants["size"];
  disabled?: boolean;
  showError?: boolean;
  showGap?: boolean;
  href?: string;
  buttonClass?: HTMLAttributes["class"];
  ariaLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  processing: false,
  variant: "default",
  size: "default",
  disabled: false,
  showGap: true,
});

const generatedId = "button-link-" + guidGenerator();
const buttonLinkId = computed(() => props.id || generatedId);
const isUnavailable = computed(() => props.disabled || props.processing);
</script>

<template>
  <Field
    :id="buttonLinkId"
    :description="description"
    :class="cn('grid gap-1', props.class)"
    :showError="false"
    :showGap="showGap"
  >
    <Button
      :id="buttonLinkId"
      :tabindex="0"
      :variant="variant"
      :size="size"
      :class="cn('w-full cursor-pointer', props.buttonClass)"
      :aria-label="ariaLabel || label"
      :aria-disabled="isUnavailable"
      as-child
    >
      <Link
        :href="href"
        :data-test="dataTest || 'button-link-block-' + buttonLinkId"
        :class="cn(isUnavailable && 'pointer-events-none opacity-50')"
      >
        <LoaderCircle v-if="processing" class="h-4 w-4 animate-spin" />
        <span aria-hidden="true" class="contents">
          <slot name="icon" />
        </span>
        {{ label }}
      </Link>
    </Button>
    <slot name="description" />
  </Field>
</template>
