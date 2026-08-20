<script setup lang="ts">
import { computed, ref } from "vue";

import { ConfirmDialogBlock } from "@/registry/threadable/ui/confirm-dialog-block";

import {
  DropdownMenuBlock,
  DropdownMenuItemBlock,
} from "@/registry/threadable/ui/dropdown-menu-block";

import { SheetBlock } from "@/registry/threadable/ui/sheet-block";
import { SheetContentBlock } from "@/registry/threadable/ui/sheet-content-block";

import { Button } from "@/registry/threadable/ui/button";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/threadable/ui/dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/registry/threadable/ui/dropdown-menu";

import { Input } from "@/registry/threadable/ui/input";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/threadable/ui/popover";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/registry/threadable/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/registry/threadable/ui/tooltip";

const dialogOpen = ref(false);

const sheetOpen = ref(false);

const blockSheetOpen = ref(false);

const contentSheetOpen = ref(false);

const alertDialogOpen = ref(false);

const confirmDialogOpen = ref(false);

const popoverOpen = ref(false);

const dropdownValue = ref("none");

const dropdownBlockValue = ref("none");
</script>

<template>
  <section
    aria-labelledby="overlay-heading"
    class="rounded-xl border bg-card p-5 shadow-sm"
  >
    <div class="mb-5">
      <h2 id="overlay-heading" class="text-xl font-semibold">
        Overlays and keyboard interaction
      </h2>
      <p class="mt-1 text-sm text-muted-foreground">
        Open each overlay with a keyboard-friendly trigger, then use Escape to
        dismiss it.
      </p>
    </div>
    <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
      <div data-testid="registry-component-dialog" data-component="dialog">
        <Dialog v-model:open="dialogOpen">
          <DialogTrigger as-child
            ><Button data-testid="demo-dialog-trigger" type="button"
              >Open dialog</Button
            >
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Keyboard dialog</DialogTitle>
              <DialogDescription
                >Focus is trapped while this dialog is open.</DialogDescription
              >
            </DialogHeader>
            <Input aria-label="Dialog input" placeholder="Dialog input" />
            <DialogFooter>
              <DialogClose as-child
                ><Button type="button" variant="outline"
                  >Close dialog</Button
                ></DialogClose
              >
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div
        data-testid="registry-component-dropdown-menu"
        data-component="dropdown-menu"
      >
        <DropdownMenu>
          <DropdownMenuTrigger as-child
            ><Button
              data-testid="demo-dropdown-trigger"
              variant="outline"
              type="button"
              >Open menu</Button
            ></DropdownMenuTrigger
          >
          <DropdownMenuContent>
            <DropdownMenuItem @select="dropdownValue = 'first'"
              >First action</DropdownMenuItem
            >
            <DropdownMenuItem @select="dropdownValue = 'second'"
              >Second action</DropdownMenuItem
            >
          </DropdownMenuContent>
        </DropdownMenu>
        <p class="mt-2 text-sm" role="status">Selected: {{ dropdownValue }}</p>
      </div>
      <div
        data-testid="registry-component-dropdown-menu-block"
        data-component="dropdown-menu-block"
      >
        <DropdownMenuBlock
          label="Block menu"
          data-test="demo-dropdown-block-trigger"
        >
          <DropdownMenuItemBlock @select="dropdownBlockValue = 'block'"
            >Block action</DropdownMenuItemBlock
          >
        </DropdownMenuBlock>
        <p class="mt-2 text-sm" role="status">
          Selected: {{ dropdownBlockValue }}
        </p>
      </div>
      <div data-testid="registry-component-popover" data-component="popover">
        <Popover v-model:open="popoverOpen">
          <PopoverTrigger as-child
            ><Button
              data-testid="demo-popover-trigger"
              variant="outline"
              type="button"
              >Open popover</Button
            ></PopoverTrigger
          >
          <PopoverContent>
            <p class="max-w-xs text-sm">
              Popover content with a deliberately long sentence that wraps on
              narrow mobile layouts.
            </p>
          </PopoverContent>
        </Popover>
      </div>
      <div
        data-testid="registry-component-alert-dialog"
        data-component="alert-dialog"
      >
        <Dialog v-model:open="alertDialogOpen">
          <DialogTrigger as-child
            ><Button
              data-testid="demo-alert-trigger"
              variant="destructive"
              type="button"
              >Open alert</Button
            ></DialogTrigger
          >
          <DialogContent>
            <DialogTitle>Confirm action</DialogTitle>
            <DialogDescription
              >This action needs confirmation.</DialogDescription
            >
            <DialogFooter>
              <DialogClose as-child
                ><Button type="button" variant="outline"
                  >Cancel</Button
                ></DialogClose
              ><Button type="button" @click="alertDialogOpen = false"
                >Confirm</Button
              >
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div
        data-testid="registry-component-confirm-dialog-block"
        data-component="confirm-dialog-block"
      >
        <Button
          data-testid="demo-confirm-trigger"
          variant="outline"
          type="button"
          @click="confirmDialogOpen = true"
          >Confirm block</Button
        >
        <ConfirmDialogBlock
          :open="confirmDialogOpen"
          description="Confirmation dialog with isolated state"
          @cancel="confirmDialogOpen = false"
          @confirm="confirmDialogOpen = false"
        />
      </div>
      <div data-testid="registry-component-sheet" data-component="sheet">
        <Sheet v-model:open="sheetOpen">
          <SheetTrigger as-child
            ><Button data-testid="demo-sheet-trigger" type="button"
              >Open sheet</Button
            >
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Keyboard sheet</SheetTitle>
              <SheetDescription
                >Sheet focus is restored to its trigger.</SheetDescription
              >
            </SheetHeader>
            <div class="flex-1">Sheet body</div>
            <SheetFooter>
              <SheetClose as-child
                ><Button type="button">Close sheet</Button></SheetClose
              >
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
      <div
        data-testid="registry-component-sheet-block"
        data-component="sheet-block"
      >
        <Button
          data-testid="demo-sheet-block-trigger"
          type="button"
          variant="outline"
          @click="blockSheetOpen = true"
          >Open block sheet</Button
        >
        <SheetBlock
          :open="blockSheetOpen"
          title="Block sheet"
          description="A custom sheet wrapper"
          @update:open="blockSheetOpen = $event"
        >
          <template #content>
            <p>Block sheet content</p>
          </template>
        </SheetBlock>
      </div>
      <div
        data-testid="registry-component-sheet-content-block"
        data-component="sheet-content-block"
      >
        <Sheet v-model:open="contentSheetOpen">
          <SheetTrigger as-child
            ><Button
              data-testid="demo-content-sheet-trigger"
              variant="outline"
              type="button"
              >Open content sheet</Button
            ></SheetTrigger
          >
          <SheetContentBlock>
            <SheetHeader>
              <SheetTitle>Content sheet</SheetTitle>
              <SheetDescription>Direct content primitive.</SheetDescription>
            </SheetHeader>
            <p>Content primitive body</p>
          </SheetContentBlock>
        </Sheet>
      </div>
      <div data-testid="registry-component-tooltip" data-component="tooltip">
        <Tooltip>
          <TooltipTrigger as-child
            ><Button
              data-testid="demo-tooltip-trigger"
              variant="outline"
              type="button"
              >Focus for tooltip</Button
            ></TooltipTrigger
          >
          <TooltipContent>Tooltip text</TooltipContent>
        </Tooltip>
      </div>
    </div>
  </section>
</template>
