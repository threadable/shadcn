<script setup lang="ts">
import { ref } from "vue";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/threadable/ui/collapsible";

import {
  Combobox,
  ComboboxAnchor,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
} from "@/registry/threadable/ui/combobox";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/registry/threadable/ui/context-menu";

import { DatePicker } from "@/registry/threadable/ui/date-picker";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/threadable/ui/drawer";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/registry/threadable/ui/empty";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/registry/threadable/ui/form";

import { Button } from "@/registry/threadable/ui/button";

import { Input } from "@/registry/threadable/ui/input";

const collapsibleOpen = ref(false);

const comboboxValue = ref("");

const datePickerValue = ref();

const drawerOpen = ref(false);
</script>

<template>
  <section aria-labelledby="interactive-controls-heading">
    <h3 id="interactive-controls-heading" class="mb-3 text-base font-semibold">
      Interactive controls
    </h3>
    <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      <div
        data-testid="registry-component-collapsible"
        data-component="collapsible"
      >
        <Collapsible v-model:open="collapsibleOpen">
          <CollapsibleTrigger as-child
            ><Button variant="outline"
              >Toggle details</Button
            ></CollapsibleTrigger
          >
          <CollapsibleContent class="mt-2 rounded-md border p-3 text-sm"
            >Details are keyboard accessible.</CollapsibleContent
          >
        </Collapsible>
      </div>

      <div data-testid="registry-component-combobox" data-component="combobox">
        <Combobox v-model="comboboxValue" by="label">
          <ComboboxAnchor class="flex w-full items-center gap-2">
            <ComboboxInput
              placeholder="Search teams"
              aria-label="Search teams"
            />
            <ComboboxTrigger aria-label="Open teams" />
          </ComboboxAnchor>
          <ComboboxList>
            <ComboboxEmpty>No teams found.</ComboboxEmpty>
            <ComboboxGroup heading="Teams">
              <ComboboxItem value="engineering">Engineering</ComboboxItem>
              <ComboboxItem value="design">Design</ComboboxItem>
            </ComboboxGroup>
          </ComboboxList>
        </Combobox>
      </div>

      <div
        data-testid="registry-component-context-menu"
        data-component="context-menu"
      >
        <ContextMenu>
          <ContextMenuTrigger
            class="flex h-20 items-center justify-center rounded-md border text-sm"
            >Right click or press Shift+F10</ContextMenuTrigger
          >
          <ContextMenuContent
            ><ContextMenuItem>Copy</ContextMenuItem
            ><ContextMenuItem>Rename</ContextMenuItem></ContextMenuContent
          >
        </ContextMenu>
      </div>

      <div
        data-testid="registry-component-date-picker"
        data-component="date-picker"
      >
        <DatePicker v-model="datePickerValue" aria-label="Choose a date" />
      </div>

      <div data-testid="registry-component-drawer" data-component="drawer">
        <Drawer v-model:open="drawerOpen">
          <DrawerTrigger as-child
            ><Button variant="outline">Open drawer</Button></DrawerTrigger
          >
          <DrawerContent>
            <DrawerHeader
              ><DrawerTitle>Drawer title</DrawerTitle
              ><DrawerDescription
                >Drawer description.</DrawerDescription
              ></DrawerHeader
            >
            <DrawerFooter
              ><DrawerClose as-child
                ><Button variant="outline">Close drawer</Button></DrawerClose
              ></DrawerFooter
            >
          </DrawerContent>
        </Drawer>
      </div>

      <div data-testid="registry-component-empty" data-component="empty">
        <Empty class="border">
          <EmptyHeader
            ><EmptyMedia variant="icon">∅</EmptyMedia
            ><EmptyTitle>No results</EmptyTitle
            ><EmptyDescription
              >Try a different search.</EmptyDescription
            ></EmptyHeader
          >
        </Empty>
      </div>

      <div data-testid="registry-component-form" data-component="form">
        <Form @submit.prevent>
          <FormField v-slot="{ componentField }" name="project">
            <FormItem>
              <FormLabel>Project name</FormLabel>
              <FormControl>
                <Input v-bind="componentField" placeholder="Project name" />
              </FormControl>
              <FormDescription
                >This field has an associated description.</FormDescription
              >
              <FormMessage />
            </FormItem>
          </FormField>
        </Form>
      </div>
    </div>
  </section>
</template>
