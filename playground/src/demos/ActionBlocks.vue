<script setup lang="ts">
import { ref } from "vue";
import { Pencil, Info, AlertTriangle, Check, Trash } from "@lucide/vue";
import { ActionButtonBlock } from "@/registry/threadable/components/blocks/action-button-block";

import { ButtonBlock } from "@/registry/threadable/components/blocks/button-block";
import { ButtonLinkBlock } from "@/registry/threadable/components/blocks/button-link-block";
import {
  CardBlock,
  CardBlockFooter,
} from "@/registry/threadable/components/blocks/card-block";
import {
  DropdownMenuBlock,
  DropdownMenuItemBlock,
} from "@/registry/threadable/components/blocks/dropdown-menu-block";
import { StepperBlock } from "@/registry/threadable/components/blocks/stepper-block";
import { TextLinkBlock } from "@/registry/threadable/components/blocks/text-link-block";

const actionButtonStatus = ref("No icon action yet");
const actionProcessing = ref(false);
const buttonStatus = ref("No action yet");
const dropdownStatus = ref("No menu action yet");

const steps = [
  { value: 1, title: "Details" },
  { value: 2, title: "Review" },
  { value: 3, title: "Complete" },
];
</script>

<template>
  <section class="demo-category" data-testid="category-action-blocks">
    <div class="demo-category-heading">
      <div>
        <p class="eyebrow">Component type</p>
        <h2>Action blocks</h2>
      </div>
      <p>Actions, navigation links, menus and progress patterns.</p>
    </div>

    <div class="demo-grid">
      <article
        data-testid="registry-block-button-block"
        data-block="button-block"
      >
        <h3>Button block</h3>
        <p class="demo-description">
          A labelled action with an isolated status.
        </p>
        <ButtonBlock
          id="demo-button-block"
          label="Save changes"
          type="button"
          data-test="demo-button-block"
          @click="buttonStatus = 'Block activated'"
        />
        <p data-testid="button-block-status" class="demo-status" role="status">
          {{ buttonStatus }}
        </p>
        <ButtonBlock
          id="demo-button-disabled"
          label="Unavailable action"
          type="button"
          data-test="demo-button-disabled"
          disabled
        />
      </article>

      <article
        data-testid="registry-block-button-link-block"
        data-block="button-link-block"
      >
        <h3>Button link block</h3>
        <p class="demo-description">
          An Inertia-aware link styled as a button.
        </p>
        <ButtonLinkBlock
          id="demo-button-link"
          href="/docs"
          label="Open documentation"
          data-test="demo-button-link"
        />
      </article>

      <article
        data-testid="registry-block-dropdown-menu-block"
        data-block="dropdown-menu-block"
      >
        <h3>Dropdown menu block</h3>
        <p class="demo-description">
          Enter opens the menu; arrow keys move between actions.
        </p>
        <DropdownMenuBlock
          label="Actions"
          data-test="demo-dropdown-trigger"
          align="start"
        >
          <DropdownMenuItemBlock
            data-test="demo-dropdown-first"
            @select="dropdownStatus = 'Edit selected'"
          >
            Edit
          </DropdownMenuItemBlock>
          <DropdownMenuItemBlock
            data-test="demo-dropdown-second"
            @select="dropdownStatus = 'Archive selected'"
          >
            Archive
          </DropdownMenuItemBlock>
        </DropdownMenuBlock>
        <p data-testid="dropdown-status" class="demo-status" role="status">
          {{ dropdownStatus }}
        </p>
      </article>

      <article
        data-testid="registry-block-stepper-block"
        data-block="stepper-block"
      >
        <h3>Stepper block</h3>
        <p class="demo-description">Progress through a three-step workflow.</p>
        <StepperBlock :steps="steps" :current-step="2" />
      </article>

      <article data-testid="registry-block-card-block" data-block="card-block">
        <h3>Card block</h3>
        <CardBlock variant="bordered-orange" class="gap-3 p-4">
          <h4 class="font-semibold">A reusable content surface</h4>
          <p class="text-sm text-muted-foreground">
            Card content remains readable when its copy becomes longer than the
            demo width.
          </p>
          <CardBlockFooter>
            <TextLinkBlock href="/details" variant="card-footer">
              View details
            </TextLinkBlock>
          </CardBlockFooter>
        </CardBlock>
      </article>

      <article
        data-testid="registry-block-text-link-block"
        data-block="text-link-block"
      >
        <h3>Text link block</h3>
        <p class="demo-description">
          A named Inertia link with visible focus styling.
        </p>
        <TextLinkBlock
          href="/accessibility"
          aria-label="Read accessibility guidance"
        >
          Read accessibility guidance
        </TextLinkBlock>
      </article>
      <article
        data-testid="registry-block-action-button-block"
        data-block="action-button-block"
      >
        <h3>Action button block</h3>
        <p class="demo-description">
          Icon actions have accessible labels; disabled reasons remain reachable
          by keyboard.
        </p>
        <div class="flex flex-wrap gap-2">
          <ActionButtonBlock
            :icon="Pencil"
            label="Edit item"
            data-test="demo-action-button"
            :processing="actionProcessing"
            @click="actionButtonStatus = 'Edit activated'"
          />
          <ActionButtonBlock
            :icon="Info"
            label="View details"
            variant="info"
            data-test="demo-action-info"
          />
          <ActionButtonBlock
            :icon="AlertTriangle"
            label="Review warning"
            variant="warning"
            data-test="demo-action-warning"
          />
          <ActionButtonBlock
            :icon="Check"
            label="Approve item"
            variant="success"
            data-test="demo-action-success"
          />
          <ActionButtonBlock
            :icon="Trash"
            label="Delete item"
            variant="destructive"
            data-test="demo-action-destructive"
          />
          <ActionButtonBlock
            :icon="Trash"
            label="Delete locked item"
            variant="destructive"
            data-test="demo-action-disabled"
            disabled
            disabled-message="This item is locked by another editor. Ask them to finish editing before deleting it."
          />
          <ActionButtonBlock
            :icon="Pencil"
            label="Saving item"
            data-test="demo-action-processing"
            processing
          />
        </div>
        <label class="demo-checkbox-label"
          ><input
            v-model="actionProcessing"
            type="checkbox"
            data-testid="demo-action-processing-toggle"
          />Action is processing</label
        >
        <p role="status" class="demo-status" data-testid="action-button-status">
          {{ actionButtonStatus }}
        </p>
      </article>
    </div>
  </section>
</template>
