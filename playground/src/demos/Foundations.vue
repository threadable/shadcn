<script setup lang="ts">
import { ref } from "vue";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/threadable/ui/accordion";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/registry/threadable/ui/alert";

import { AspectRatio } from "@/registry/threadable/ui/aspect-ratio";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/threadable/ui/card";

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/registry/threadable/ui/attachment";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/threadable/ui/avatar";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/registry/threadable/ui/breadcrumb";

import {
  Bubble,
  BubbleContent,
  BubbleGroup,
} from "@/registry/threadable/ui/bubble";

import { Button } from "@/registry/threadable/ui/button";

const accordionValue = ref("overview");
</script>

<template>
  <section aria-labelledby="foundations-heading">
    <h3 id="foundations-heading" class="mb-3 text-base font-semibold">
      Foundations
    </h3>
    <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      <div
        data-testid="registry-component-accordion"
        data-component="accordion"
        class="space-y-2"
      >
        <Accordion
          v-model="accordionValue"
          type="single"
          collapsible
          class="w-full"
        >
          <AccordionItem value="overview">
            <AccordionTrigger>Accessible overview</AccordionTrigger>
            <AccordionContent
              >Long content remains readable and keyboard
              reachable.</AccordionContent
            >
          </AccordionItem>
        </Accordion>
      </div>

      <div data-testid="registry-component-alert" data-component="alert">
        <Alert>
          <AlertTitle>Heads up</AlertTitle>
          <AlertDescription
            >Review this information before continuing.</AlertDescription
          >
        </Alert>
      </div>

      <div data-testid="registry-component-card" data-component="card">
        <Card>
          <CardHeader>
            <CardTitle>Project card</CardTitle>
            <CardDescription>Reusable content structure.</CardDescription>
          </CardHeader>
          <CardContent class="text-sm">
            Long content stays grouped with its heading.
          </CardContent>
          <CardFooter>
            <Button variant="outline" type="button">View project</Button>
          </CardFooter>
        </Card>
      </div>

      <div
        data-testid="registry-component-aspect-ratio"
        data-component="aspect-ratio"
      >
        <AspectRatio
          :ratio="16 / 9"
          class="overflow-hidden rounded-md bg-muted"
        >
          <div class="flex h-full items-center justify-center text-sm">
            16:9 content
          </div>
        </AspectRatio>
      </div>

      <div
        data-testid="registry-component-attachment"
        data-component="attachment"
      >
        <Attachment class="w-full" state="done">
          <AttachmentMedia variant="icon"
            ><span aria-hidden="true">📄</span></AttachmentMedia
          >
          <AttachmentContent>
            <AttachmentTitle>report.pdf</AttachmentTitle>
            <AttachmentDescription>Completed · 2.4 MB</AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction aria-label="Download report">↓</AttachmentAction>
          </AttachmentActions>
        </Attachment>
      </div>

      <div
        data-testid="registry-component-avatar"
        data-component="avatar"
        class="flex items-center gap-3"
      >
        <Avatar>
          <AvatarImage
            src="https://i.pravatar.cc/80?img=12"
            alt="Profile photo"
          />
          <AvatarFallback>TW</AvatarFallback>
        </Avatar>
        <span class="text-sm">Threadable user</span>
      </div>

      <div
        data-testid="registry-component-breadcrumb"
        data-component="breadcrumb"
      >
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem
              ><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem
            >
            <BreadcrumbSeparator />
            <BreadcrumbItem
              ><BreadcrumbLink href="#"
                >Components</BreadcrumbLink
              ></BreadcrumbItem
            >
            <BreadcrumbSeparator />
            <BreadcrumbItem
              ><BreadcrumbPage>Current</BreadcrumbPage></BreadcrumbItem
            >
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div data-testid="registry-component-bubble" data-component="bubble">
        <BubbleGroup>
          <Bubble
            ><BubbleContent
              >Accessible message bubble with long content.</BubbleContent
            ></Bubble
          >
        </BubbleGroup>
      </div>
    </div>
  </section>
</template>
