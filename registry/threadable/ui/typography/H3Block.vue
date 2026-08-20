<script setup lang="ts">
import { computed } from "vue";
import { cn } from "@/registry/threadable/lib/utils";
import { h3Variants, type H3Variants } from ".";
import type { PrimitiveProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { guidGenerator } from "@/registry/threadable/lib/utils";

const props = withDefaults(
  defineProps<
    PrimitiveProps & {
      variant?: H3Variants["variant"];
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

const generatedId = "h3-" + guidGenerator();
const elementId = computed(() => props.id || generatedId);
</script>

<template>
  <h3
    :id="elementId"
    :class="cn(h3Variants({ variant: props.variant }), props.class)"
    :aria-level="3"
    :aria-label="ariaLabel ?? ''"
    :aria-labelledby="ariaLabelledby ?? ''"
    :data-test="props.dataTest"
    v-bind="$attrs"
  >
    <slot />
  </h3>
</template>
