<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/registry/threadable/ui/alert-dialog";

withDefaults(
  defineProps<{
    open: boolean;
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
  },
);

const emit = defineEmits<{
  (e: "confirm"): void;
  (e: "cancel"): void;
}>();
</script>

<template>
  <AlertDialog :open="open" :data-test="dataTest" @update:open="emit('cancel')">
    <AlertDialogContent class="w-full">
      <AlertDialogHeader>
        <AlertDialogTitle>{{ title }}</AlertDialogTitle>
      </AlertDialogHeader>

      <AlertDialogDescription
        :class="['text-primary', descriptionClass]"
        :data-test="dataTest ? `${dataTest}-desc` : undefined"
      >
        {{ description }}
      </AlertDialogDescription>

      <AlertDialogFooter>
        <AlertDialogCancel
          class="cursor-pointer border-primary! bg-white! text-primary"
          :data-test="dataTest ? `${dataTest}-cancel` : undefined"
          @click="emit('cancel')"
        >
          {{ cancelLabel }}
        </AlertDialogCancel>

        <AlertDialogAction
          class="cursor-pointer"
          :data-test="dataTest ? `${dataTest}-confirm` : undefined"
          :class="
            actionVariant === 'destructive'
              ? 'bg-destructive hover:bg-red-400'
              : ''
          "
          @click="emit('confirm')"
        >
          {{ actionLabel }}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
