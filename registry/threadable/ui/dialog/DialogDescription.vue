<script setup lang="ts">
import { cn } from "@/registry/threadable/lib/utils";
import {
  DialogDescription,
  type DialogDescriptionProps,
  useForwardProps,
} from "reka-ui";
import { computed, type HTMLAttributes } from "vue";

const props = defineProps<
  DialogDescriptionProps & { class?: HTMLAttributes["class"] }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <DialogDescription
    data-slot="dialog-description"
    v-bind="forwardedProps"
    :class="cn('text-sm text-muted-foreground text-primary', props.class)"
  >
    <slot />
  </DialogDescription>
</template>
