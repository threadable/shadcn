<script setup lang="ts">
import { ref } from "vue";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/registry/threadable/ui/resizable";

import { ScrollArea, ScrollBar } from "@/registry/threadable/ui/scroll-area";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/registry/threadable/ui/sidebar";

import { Slider } from "@/registry/threadable/ui/slider";

import { Spinner } from "@/registry/threadable/ui/spinner";

import { Toaster } from "@/registry/threadable/ui/sonner";

import { Switch } from "@/registry/threadable/ui/switch";

import {
  TagsInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDelete,
  TagsInputItemText,
} from "@/registry/threadable/ui/tags-input";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/registry/threadable/ui/toast";

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/registry/threadable/ui/toggle-group";

import { Toggle as TogglePrimitive } from "@/registry/threadable/ui/toggle";

const sliderValue = ref([42]);

const switchValue = ref(false);

const togglePressed = ref(false);

const tagsValue = ref(["Vue", "Accessible"]);

const toastOpen = ref(true);

const toggleGroupValue = ref("bold");
</script>

<template>
  <section aria-labelledby="layout-feedback-heading">
    <h3 id="layout-feedback-heading" class="mb-3 text-base font-semibold">
      Layout and feedback
    </h3>
    <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      <div
        data-testid="registry-component-resizable"
        data-component="resizable"
      >
        <ResizablePanelGroup
          direction="horizontal"
          class="min-h-24 rounded-md border"
          ><ResizablePanel :default-size="50"
            ><div class="flex h-full items-center justify-center text-sm">
              Panel one
            </div></ResizablePanel
          ><ResizableHandle with-handle /><ResizablePanel :default-size="50"
            ><div class="flex h-full items-center justify-center text-sm">
              Panel two
            </div></ResizablePanel
          ></ResizablePanelGroup
        >
      </div>

      <div
        data-testid="registry-component-scroll-area"
        data-component="scroll-area"
      >
        <ScrollArea class="h-24 rounded-md border p-3"
          ><div class="space-y-2 text-sm">
            <p v-for="line in 5" :key="line">
              Scrollable content line {{ line }}.
            </p>
          </div>
          <ScrollBar orientation="vertical"
        /></ScrollArea>
      </div>

      <div data-testid="registry-component-sidebar" data-component="sidebar">
        <SidebarProvider :default-open="true" class="min-h-36 rounded-md border"
          ><Sidebar collapsible="none"
            ><SidebarContent
              ><SidebarGroup
                ><SidebarGroupLabel>Workspace</SidebarGroupLabel
                ><SidebarGroupContent
                  ><SidebarMenu
                    ><SidebarMenuItem
                      ><SidebarMenuButton tooltip="Dashboard"
                        >Dashboard</SidebarMenuButton
                      ></SidebarMenuItem
                    ><SidebarMenuItem
                      ><SidebarMenuButton tooltip="Settings"
                        >Settings</SidebarMenuButton
                      ></SidebarMenuItem
                    ></SidebarMenu
                  ></SidebarGroupContent
                ></SidebarGroup
              ></SidebarContent
            ></Sidebar
          >
          <div class="p-3">
            <SidebarTrigger aria-label="Toggle sidebar" /></div
        ></SidebarProvider>
      </div>

      <div data-testid="registry-component-slider" data-component="slider">
        <label for="component-slider" class="mb-2 block text-sm">Volume</label
        ><Slider
          id="component-slider"
          v-model="sliderValue"
          :max="100"
          :step="1"
          aria-label="Volume"
        />
      </div>

      <div
        data-testid="registry-component-spinner"
        data-component="spinner"
        class="flex items-center gap-2"
      >
        <Spinner />
        <span class="text-sm">Loading results</span>
      </div>

      <div data-testid="registry-component-sonner" data-component="sonner">
        <Toaster aria-label="Notifications" />
        <p class="text-sm text-muted-foreground">Notification host ready.</p>
      </div>

      <div
        data-testid="registry-component-switch"
        data-component="switch"
        class="flex items-center gap-3"
      >
        <Switch v-model="switchValue" aria-label="Enable notifications" /><span
          class="text-sm"
          >{{ switchValue ? "Enabled" : "Disabled" }}</span
        >
      </div>

      <div
        data-testid="registry-component-tags-input"
        data-component="tags-input"
      >
        <TagsInput v-model="tagsValue" aria-label="Technologies" class="w-full">
          <TagsInputItem v-for="tag in tagsValue" :key="tag" :value="tag"
            ><TagsInputItemText /><TagsInputItemDelete aria-label="Remove tag"
          /></TagsInputItem>
          <TagsInputInput placeholder="Add technology" />
        </TagsInput>
      </div>

      <div data-testid="registry-component-toast" data-component="toast">
        <ToastProvider
          ><Toast v-model:open="toastOpen"
            ><ToastTitle>Saved</ToastTitle
            ><ToastDescription>Your changes were saved.</ToastDescription
            ><ToastClose aria-label="Dismiss notification" /></Toast
          ><ToastViewport
        /></ToastProvider>
      </div>

      <div data-testid="registry-component-toggle" data-component="toggle">
        <TogglePrimitive v-model:pressed="togglePressed" aria-label="Bold text"
          >Bold</TogglePrimitive
        >
      </div>

      <div
        data-testid="registry-component-toggle-group"
        data-component="toggle-group"
      >
        <ToggleGroup
          v-model="toggleGroupValue"
          type="single"
          aria-label="Text alignment"
          ><ToggleGroupItem value="bold" aria-label="Bold">B</ToggleGroupItem
          ><ToggleGroupItem value="italic" aria-label="Italic"
            >I</ToggleGroupItem
          ></ToggleGroup
        >
      </div>
    </div>
  </section>
</template>
