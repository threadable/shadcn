<script setup lang="ts">
import { ref } from "vue";

import { Dialog, DialogTitle } from "@/components/ui/dialog";
import { ConfirmDialogBlock } from "@/registry/threadable/components/blocks/confirm-dialog-block";
import { SheetBlock } from "@/registry/threadable/components/blocks/sheet-block";
import { SheetContentBlock } from "@/registry/threadable/components/blocks/sheet-content-block";

const confirmOpen = ref(false);
const confirmProcessing = ref(false);
const sheetOpen = ref(false);
const customSheetOpen = ref(false);
</script>

<template>
  <section class="demo-category" data-testid="category-overlay-blocks">
    <div class="demo-category-heading">
      <div>
        <p class="eyebrow">Component type</p>
        <h2>Overlay blocks</h2>
      </div>
      <p>
        Dialogs, menus and panels with focus movement and dismissal behavior.
      </p>
    </div>

    <div class="demo-grid">
      <article
        data-testid="registry-block-confirm-dialog-block"
        data-block="confirm-dialog-block"
      >
        <h3>Confirm dialog block</h3>
        <p class="demo-description">
          The dialog requires an explicit decision.
        </p>
        <button
          data-testid="demo-dialog-trigger"
          class="demo-button"
          type="button"
          @click="confirmOpen = true"
        >
          Delete item
        </button>
        <label class="demo-checkbox-label">
          <input
            v-model="confirmProcessing"
            type="checkbox"
            data-testid="demo-confirm-processing"
          />
          Confirmation is processing
        </label>
        <ConfirmDialogBlock
          :open="confirmOpen"
          :processing="confirmProcessing"
          title="Delete item?"
          description="This action cannot be undone."
          action-label="Delete"
          action-variant="destructive"
          data-test="demo-confirm-dialog"
          @confirm="confirmOpen = false"
          @cancel="confirmOpen = false"
        />
      </article>

      <article
        data-testid="registry-block-sheet-block"
        data-block="sheet-block"
      >
        <h3>Sheet block</h3>
        <p class="demo-description">
          A responsive panel with a labelled header and close action.
        </p>
        <button
          data-testid="demo-sheet-trigger"
          class="demo-button"
          type="button"
          @click="sheetOpen = true"
        >
          Open sheet
        </button>
        <SheetBlock
          :open="sheetOpen"
          title="Filters"
          description="Refine the results shown in the list."
          data-test="demo-sheet"
          @update:open="sheetOpen = $event"
        >
          <template #content>
            <p class="max-w-prose text-sm text-muted-foreground">
              This content is deliberately long enough to exercise a scrolling
              panel on a narrow viewport.
            </p>
          </template>
        </SheetBlock>
      </article>

      <article
        data-testid="registry-block-sheet-content-block"
        data-block="sheet-content-block"
      >
        <h3>Sheet content block</h3>
        <p class="demo-description">
          Lower-level content for custom panel composition.
        </p>
        <button
          data-testid="demo-custom-sheet-trigger"
          class="demo-button"
          type="button"
          @click="customSheetOpen = true"
        >
          Open custom sheet content
        </button>
        <Dialog v-model:open="customSheetOpen">
          <SheetContentBlock side="right" class="p-6">
            <DialogTitle>Custom panel</DialogTitle>
            <p class="text-sm text-muted-foreground">
              Compose your own labelled panel content while retaining overlay
              behavior.
            </p>
          </SheetContentBlock>
        </Dialog>
      </article>
    </div>
  </section>
</template>
