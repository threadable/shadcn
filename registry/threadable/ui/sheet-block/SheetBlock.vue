<script setup lang="ts">
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/registry/threadable/ui/sheet";
import { Form } from "@inertiajs/vue3";
import { ref, type Component } from "vue";
import { DialogClose } from "reka-ui";

interface Props {
  open: boolean;
  side?: "left" | "right" | "top" | "bottom";
  customClass?: string;
  title?: string;
  titleAriaLabel?: string;
  description?: string;
  descriptionAriaLabel?: string;
  icon?: Component;
  isForm?: boolean;
  formBind?: Record<string, unknown>;
  dataTest?: string;
}

withDefaults(defineProps<Props>(), {
  side: "right",
  customClass: "w-full p-4 sm:max-w-lg",
  isForm: false,
});

defineSlots<{
  content(props: { processing: boolean; errors: Record<string, string> }): any;
  footer(props: {
    processing: boolean;
    errors: Record<string, string>;
    isDirty?: boolean;
  }): any;
}>();

const emit = defineEmits<{
  (e: "update:open", value: boolean): void;
  (e: "formSuccess"): void;
}>();

const handleClose = () => {
  emit("update:open", false);
};

const handleFormSuccess = () => {
  emit("formSuccess");
};

const headerRef = ref<InstanceType<typeof SheetHeader> | null>(null);

const handleOpenAutoFocus = (event: Event) => {
  event.preventDefault();
  const el = headerRef.value?.$el as HTMLElement | undefined;
  el?.focus();
};
</script>

<template>
  <Sheet :open="open" @update:open="handleClose">
    <SheetContent
      :side="side"
      :class="customClass"
      :data-test="dataTest || ''"
      @openAutoFocus="handleOpenAutoFocus"
    >
      <DialogClose
        aria-label="Close dialog"
        data-test="dialog-close-button"
        class="absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:bg-secondary"
      >
        <span class="sr-only">Close</span>
      </DialogClose>
      <SheetHeader
        v-if="title || description || icon"
        ref="headerRef"
        tabindex="0"
        class="text-left focus:outline-none"
      >
        <div class="mb-6 flex items-start gap-2">
          <component
            v-if="icon"
            :is="icon"
            class="h6 mt-1 -ml-3 w-6 shrink-0 text-primary"
          />
          <div class="flex w-full flex-col gap-y-2">
            <SheetTitle
              v-if="title"
              class="text-2xl font-normal"
              :title="title"
              :aria-label="titleAriaLabel || title"
            >
              {{ title }}
            </SheetTitle>
            <SheetDescription
              v-if="description"
              class="mr-4 break-words text-primary"
              :title="description"
              :aria-label="descriptionAriaLabel || description"
            >
              {{ description }}
            </SheetDescription>
          </div>
        </div>
      </SheetHeader>

      <template v-if="isForm">
        <Form
          v-bind="formBind"
          v-slot="{ errors, processing, isDirty }"
          class="flex flex-1 flex-col overflow-hidden"
          novalidate
          @success="() => handleFormSuccess()"
        >
          <div class="flex-1 overflow-y-auto">
            <slot name="content" :errors="errors" :processing="processing" />
          </div>
          <SheetFooter class="p-0">
            <slot
              name="footer"
              :errors="errors"
              :processing="processing"
              :isDirty="isDirty"
            />
          </SheetFooter>
        </Form>
      </template>

      <template v-else>
        <div class="flex-1 overflow-y-auto">
          <slot name="content" :processing="false" :errors="{}" />
        </div>
        <SheetFooter class="p-0">
          <slot name="footer" :processing="false" :errors="{}"></slot>
        </SheetFooter>
      </template>
    </SheetContent>
  </Sheet>
</template>

<style scoped>
:deep([data-slot="sheet-content"] > button:last-of-type) {
  display: none !important;
}
</style>
