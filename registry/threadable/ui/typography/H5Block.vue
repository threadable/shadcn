<script setup lang="ts">
import { computed } from "vue";
import { cn } from "@/registry/threadable/lib/utils";
import { h5Variants, type H5Variants } from ".";
import type { PrimitiveProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { guidGenerator } from "@/registry/threadable/lib/utils";

const props = withDefaults(
  defineProps<
    PrimitiveProps & {
      variant?: H5Variants["variant"];
      id?: string;
      ariaLabel?: string;
      ariaLabelledby?: string;
      class?: HTMLAttributes["class"];
      dataTest?: string;
    }
  >(),
  {
    variant: "default",
  },
);

const generatedId = "h5-" + guidGenerator();
const elementId = computed(() => props.id || generatedId);
</script>

<template>
  <h5
    :id="elementId"
    :class="cn(h5Variants({ variant: props.variant }), props.class)"
    :aria-level="5"
    :aria-label="ariaLabel ?? ''"
    :aria-labelledby="ariaLabelledby ?? ''"
    :data-test="props.dataTest"
    v-bind="$attrs"
  >
    <slot />
  </h5>
</template>
