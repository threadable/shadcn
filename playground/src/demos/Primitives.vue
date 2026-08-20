<script setup lang="ts">
import { computed, ref } from "vue";

import { Label } from "@/registry/threadable/ui/label";

import { Select } from "@/registry/threadable/ui/select";

import { Checkbox } from "@/registry/threadable/ui/checkbox";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/registry/threadable/ui/command";

import {
  RadioGroup,
  RadioGroupItem,
} from "@/registry/threadable/ui/radio-group";

import { SelectItem } from "@/registry/threadable/ui/base-select";

import {
  H1Block,
  H2Block,
  H3Block,
  H4Block,
  H5Block,
  H6Block,
  OrderedListBlock,
  PBlock,
} from "@/registry/threadable/ui/typography";

const email = ref("");

const checkboxValue = ref(false);

const selectValue = ref<string | number>("");

const commandValue = ref("");

const radioValue = ref("email");
</script>

<template>
  <section
    aria-labelledby="primitive-heading"
    class="rounded-xl border bg-card p-5 shadow-sm"
  >
    <div class="mb-5">
      <h2 id="primitive-heading" class="text-xl font-semibold">
        Primitive coverage
      </h2>
    </div>
    <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
      <div data-testid="registry-component-checkbox" data-component="checkbox">
        <Checkbox v-model="checkboxValue" aria-label="Checkbox" />
      </div>
      <div data-testid="registry-component-command" data-component="command">
        <Command class="rounded-lg border">
          <CommandInput
            v-model="commandValue"
            :auto-focus="false"
            placeholder="Filter commands"
          />
          <CommandList aria-label="Command suggestions">
            <CommandEmpty>No commands</CommandEmpty>
            <CommandGroup heading="Actions">
              <CommandItem value="save" text-value="Save">Save</CommandItem>
              <CommandItem value="share" text-value="Share">Share</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
      <div
        data-testid="registry-component-radio-group"
        data-component="radio-group"
      >
        <RadioGroup v-model="radioValue" aria-label="Contact preference">
          <div class="flex items-center gap-2">
            <RadioGroupItem id="email" value="email" /><Label for="email"
              >Email</Label
            >
          </div>
          <div class="flex items-center gap-2">
            <RadioGroupItem id="phone" value="phone" /><Label for="phone"
              >Phone</Label
            >
          </div>
        </RadioGroup>
      </div>
      <div
        data-testid="registry-component-select"
        data-component="select"
        class="space-y-2"
      >
        <Select
          v-model="selectValue"
          placeholder="Select an option"
          aria-label="Select"
        >
          <template #items>
            <SelectItem value="one">One</SelectItem>
            <SelectItem value="two">Two</SelectItem>
          </template>
        </Select>
      </div>
      <div
        data-testid="registry-component-typography"
        data-component="typography"
        class="space-y-2"
      >
        <H1Block>Heading one</H1Block>
        <H2Block>Heading two</H2Block>
        <H3Block>Heading three</H3Block>
        <H4Block>Heading four</H4Block>
        <H5Block>Heading five</H5Block>
        <H6Block>Heading six</H6Block>
        <PBlock>Paragraph text</PBlock>
        <OrderedListBlock :items="['Ordered item']" />
      </div>
    </div>
  </section>
</template>
