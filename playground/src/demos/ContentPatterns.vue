<script setup lang="ts">
import { ref } from "vue";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/registry/threadable/ui/hover-card";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/registry/threadable/ui/input-otp";

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/registry/threadable/ui/item";

import { Kbd, KbdGroup } from "@/registry/threadable/ui/kbd";

import {
  Marker,
  MarkerContent,
  MarkerIcon,
} from "@/registry/threadable/ui/marker";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/registry/threadable/ui/menubar";

import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageHeader,
} from "@/registry/threadable/ui/message";

import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/registry/threadable/ui/message-scroller";

import { Button } from "@/registry/threadable/ui/button";

const inputOtpValue = ref("");
</script>

<template>
  <section aria-labelledby="content-patterns-heading">
    <h3 id="content-patterns-heading" class="mb-3 text-base font-semibold">
      Content patterns
    </h3>
    <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      <div
        data-testid="registry-component-hover-card"
        data-component="hover-card"
      >
        <HoverCard>
          <HoverCardTrigger as-child
            ><Button variant="link">Hover or focus me</Button></HoverCardTrigger
          >
          <HoverCardContent
            >Supplemental information appears here.</HoverCardContent
          >
        </HoverCard>
      </div>

      <div
        data-testid="registry-component-input-otp"
        data-component="input-otp"
      >
        <InputOTP
          v-model="inputOtpValue"
          :maxlength="6"
          aria-label="One-time password"
        >
          <InputOTPGroup
            ><InputOTPSlot :index="0" /><InputOTPSlot :index="1" /><InputOTPSlot
              :index="2"
          /></InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup
            ><InputOTPSlot :index="3" /><InputOTPSlot :index="4" /><InputOTPSlot
              :index="5"
          /></InputOTPGroup>
        </InputOTP>
      </div>

      <div data-testid="registry-component-item" data-component="item">
        <Item variant="outline" size="sm">
          <ItemMedia variant="icon">✓</ItemMedia>
          <ItemContent
            ><ItemTitle>Accessible item</ItemTitle
            ><ItemDescription>Supporting content</ItemDescription></ItemContent
          >
        </Item>
      </div>

      <div data-testid="registry-component-kbd" data-component="kbd">
        <KbdGroup aria-label="Keyboard shortcut"
          ><Kbd>⌘</Kbd><Kbd>K</Kbd></KbdGroup
        >
      </div>

      <div data-testid="registry-component-marker" data-component="marker">
        <Marker variant="border"
          ><MarkerIcon>•</MarkerIcon
          ><MarkerContent>Important marker</MarkerContent></Marker
        >
      </div>

      <div data-testid="registry-component-menubar" data-component="menubar">
        <Menubar>
          <MenubarMenu
            ><MenubarTrigger>File</MenubarTrigger
            ><MenubarContent
              ><MenubarItem>New file</MenubarItem
              ><MenubarSeparator /><MenubarItem
                >Close</MenubarItem
              ></MenubarContent
            ></MenubarMenu
          >
        </Menubar>
      </div>

      <div data-testid="registry-component-message" data-component="message">
        <Message>
          <MessageAvatar><span class="text-xs">TW</span></MessageAvatar>
          <MessageContent
            ><MessageHeader>Threadable</MessageHeader>
            <p>Message content with a clear reading order.</p>
            <MessageFooter>Just now</MessageFooter></MessageContent
          >
        </Message>
      </div>

      <div
        data-testid="registry-component-message-scroller"
        data-component="message-scroller"
      >
        <MessageScrollerProvider>
          <MessageScroller class="h-32 rounded-md border">
            <MessageScrollerViewport>
              <MessageScrollerContent class="gap-2 p-3">
                <MessageScrollerItem
                  v-for="message in [
                    'First message',
                    'Second message',
                    'Long message content',
                  ]"
                  :key="message"
                  ><Message
                    ><MessageContent
                      ><p>{{ message }}</p></MessageContent
                    ></Message
                  ></MessageScrollerItem
                >
              </MessageScrollerContent>
            </MessageScrollerViewport>
            <MessageScrollerButton aria-label="Scroll to latest message" />
          </MessageScroller>
        </MessageScrollerProvider>
      </div>
    </div>
  </section>
</template>
