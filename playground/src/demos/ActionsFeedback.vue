<script setup lang="ts">
import { computed, ref } from "vue";

import { Badge } from "@/registry/threadable/ui/badge";

import { ButtonBlock } from "@/registry/threadable/ui/button-block";

import { ButtonLinkBlock } from "@/registry/threadable/ui/button-link-block";

import {
  CardBlock,
  CardBlockFooter,
} from "@/registry/threadable/ui/card-block";

import { Field } from "@/registry/threadable/ui/field";

import { Help } from "@/registry/threadable/ui/help";

import { Info } from "@/registry/threadable/ui/info";

import { Label } from "@/registry/threadable/ui/label";

import LoadingSpinner from "@/registry/threadable/ui/loading-spinner/LoadingSpinner.vue";

import { SkeletonBlock } from "@/registry/threadable/ui/skeleton-block";

import { TextLinkBlock } from "@/registry/threadable/ui/text-link-block";

import { Button } from "@/registry/threadable/ui/button";

import { Input } from "@/registry/threadable/ui/input";

import { Separator } from "@/registry/threadable/ui/separator";

import { Skeleton } from "@/registry/threadable/ui/skeleton";

import NoResultIcon from "@/registry/threadable/ui/no-result-icon/NoResultIcon.vue";

const buttonMessage = ref("No action yet");

const buttonBlockMessage = ref("No action yet");
</script>

<template>
  <section
    aria-labelledby="actions-heading"
    class="rounded-xl border bg-card p-5 shadow-sm"
  >
    <div class="mb-5">
      <h2 id="actions-heading" class="text-xl font-semibold">
        Actions, links and feedback
      </h2>
    </div>
    <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
      <div
        data-testid="registry-component-button"
        data-component="button"
        class="space-y-2"
      >
        <Button
          data-testid="demo-button"
          type="button"
          @click="buttonMessage = 'Button activated'"
          >Activate button</Button
        >
        <p data-testid="button-status" class="text-sm" role="status">
          {{ buttonMessage }}
        </p>
        <Button data-testid="demo-button-disabled" type="button" disabled
          >Disabled button</Button
        >
      </div>
      <div
        data-testid="registry-component-button-block"
        data-component="button-block"
      >
        <ButtonBlock
          id="demo-button-block"
          label="Button block"
          data-test="demo-button-block"
          type="button"
          @click="buttonBlockMessage = 'Block activated'"
        />
        <p data-testid="button-block-status" class="mt-2 text-sm" role="status">
          {{ buttonBlockMessage }}
        </p>
      </div>
      <div
        data-testid="registry-component-button-link-block"
        data-component="button-link-block"
      >
        <ButtonLinkBlock
          id="demo-button-link"
          label="Button link"
          href="/components"
          data-test="demo-button-link"
        />
      </div>
      <div
        data-testid="registry-component-text-link-block"
        data-component="text-link-block"
        class="flex items-center"
      >
        <TextLinkBlock id="demo-text-link" href="/components"
          >View all components</TextLinkBlock
        >
      </div>
      <div
        data-testid="registry-component-badge"
        data-component="badge"
        class="flex items-start gap-2"
      >
        <Badge>Default</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="destructive">Error</Badge>
      </div>
      <div data-testid="registry-component-info" data-component="info">
        <Info message="This is a useful status message." />
      </div>
      <div data-testid="registry-component-help" data-component="help">
        <Help side="top" tooltip="Additional context is available here."
          >Need help?</Help
        >
      </div>
      <div data-testid="registry-component-label" data-component="label">
        <Label for="demo-label-control">Explicit label</Label>
        <Input id="demo-label-control" placeholder="Labelled by the demo" />
      </div>
      <div data-testid="registry-component-field" data-component="field">
        <Field
          id="demo-field-control"
          label="Field wrapper"
          description="Field description"
          ><Input id="demo-field-control"
        /></Field>
      </div>
      <div
        data-testid="registry-component-card-block"
        data-component="card-block"
      >
        <CardBlock variant="bordered-orange" class="p-4">
          <h3 class="font-semibold">Card block</h3>
          <p class="text-sm">Long content stays readable in the card.</p>
          <CardBlockFooter><Button size="sm">Action</Button></CardBlockFooter>
        </CardBlock>
      </div>
      <div
        data-testid="registry-component-loading-spinner"
        data-component="loading-spinner"
      >
        <LoadingSpinner class="relative" />
      </div>
      <div
        data-testid="registry-component-skeleton-block"
        data-component="skeleton-block"
      >
        <SkeletonBlock :rows="2" />
      </div>
      <div data-testid="registry-component-skeleton" data-component="skeleton">
        <Skeleton class="h-5 w-32" />
      </div>
      <div
        data-testid="registry-component-separator"
        data-component="separator"
      >
        <p class="mb-2">Above separator</p>
        <Separator />
        <p class="mt-2">Below separator</p>
      </div>
      <div
        data-testid="registry-component-no-result-icon"
        data-component="no-result-icon"
        class="text-center"
      >
        <NoResultIcon aria-hidden="true" />
        <p>No results</p>
      </div>
    </div>
  </section>
</template>
