<script setup lang="ts">
import { ButtonBlock } from "@/registry/threadable/components/blocks/button-block";
import { Field } from "@/registry/threadable/components/blocks/field";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

withDefaults(
  defineProps<{
    open: boolean;
    processing?: boolean;
    error?: string;
    title?: string;
    description: string;
    descriptionClass?: string;
    cancelLabel?: string;
    actionLabel?: string;
    actionVariant?: "default" | "destructive";
    dataTest?: string;
  }>(),
  {
    title: "Are you sure?",
    cancelLabel: "Cancel",
    actionLabel: "Continue",
    actionVariant: "default",
    processing: false,
  },
);

const emit = defineEmits<{
  (e: "confirm"): void;
  (e: "cancel"): void;
}>();
</script>

<template>
  <AlertDialog
    :open="open"
    :data-test="dataTest"
    @update:open="!processing && emit('cancel')"
  >
    <AlertDialogContent
      class="w-full"
      @escape-key-down="processing && $event.preventDefault()"
      @pointer-down-outside="processing && $event.preventDefault()"
    >
      <AlertDialogHeader>
        <AlertDialogTitle>{{ title }}</AlertDialogTitle>
      </AlertDialogHeader>

      <AlertDialogDescription
        :class="['text-primary', descriptionClass]"
        :data-test="dataTest ? `${dataTest}-desc` : undefined"
      >
        {{ description }}
      </AlertDialogDescription>

      <Field
        v-if="error"
        :error="error"
        role="alert"
        aria-live="assertive"
        :data-test="dataTest ? `${dataTest}-error` : undefined"
      />

      <AlertDialogFooter>
        <AlertDialogCancel
          :disabled="processing"
          class="cursor-pointer border-primary! bg-white! text-primary"
          :data-test="dataTest ? `${dataTest}-cancel` : undefined"
          @click="!processing && emit('cancel')"
        >
          {{ cancelLabel }}
        </AlertDialogCancel>

        <ButtonBlock
          class="w-full md:w-fit"
          type="button"
          :variant="actionVariant"
          :label="actionLabel"
          :processing="processing"
          :show-gap="false"
          :data-test="dataTest ? `${dataTest}-confirm` : undefined"
          @click="!processing && emit('confirm')"
        />
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
