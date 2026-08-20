<script setup lang="ts">
import { computed, ref } from "vue";

import { CheckboxBlock } from "@/registry/threadable/ui/checkbox-block";

import { ComboboxGroupBlock } from "@/registry/threadable/ui/combobox-group-block";

import { DataTableSearch } from "@/registry/threadable/ui/datatable-search";

import { Field } from "@/registry/threadable/ui/field";

import { InputBlock } from "@/registry/threadable/ui/input-block";

import { Label } from "@/registry/threadable/ui/label";

import { RadioGroupBlock } from "@/registry/threadable/ui/radio-block";

import { Search } from "@/registry/threadable/ui/search";

import { SelectBlock } from "@/registry/threadable/ui/select-block";

import { SelectGroupBlock } from "@/registry/threadable/ui/select-group-block";

import { TextareaBlock } from "@/registry/threadable/ui/textarea-block";

import { TypeaheadInput } from "@/registry/threadable/ui/typeahead-input";

import { Input } from "@/registry/threadable/ui/input";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/registry/threadable/ui/input-group";

import { Textarea } from "@/registry/threadable/ui/textarea";

const email = ref("");

const notes = ref("");

const checkboxBlockValue = ref(false);

const selectBlockValue = ref<string | number>("");

const groupedValue = ref<string | number>("engineering");

const comboboxValue = ref<string | number>("");

const typeaheadValue = ref("ap");

const searchValue = ref("");

const dataTableSearchValue = ref("");

const radioBlockValue = ref("email");

const selectItems = [
  { value: "all", name: "All teams" },
  { value: "design", name: "Design" },
  { value: "engineering", name: "Engineering" },
];

const groupedItems = [
  { group: "Teams", items: [{ value: "engineering", name: "Engineering" }] },
  { group: "Functions", items: [{ value: "design", name: "Design" }] },
];

const comboboxGroups = [
  {
    group: "Teams",
    items: [
      { value: "eng", name: "Engineering" },
      { value: "design", name: "Design" },
    ],
  },
  {
    group: "Functions",
    items: [{ value: "support", name: "Customer support" }],
  },
];

const typeaheadSuggestions = ["apple", "apricot", "avocado"];

const typeaheadOpen = computed(() => typeaheadValue.value.length >= 2);
</script>

<template>
  <section
    aria-labelledby="controls-heading"
    class="rounded-xl border bg-card p-5 shadow-sm"
  >
    <div class="mb-5">
      <h2 id="controls-heading" class="text-xl font-semibold">
        Form controls and states
      </h2>
      <p class="mt-1 text-sm text-muted-foreground">
        Every labelled control includes representative default, focusable,
        disabled or invalid states.
      </p>
    </div>
    <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      <div
        data-testid="registry-component-input-block"
        data-component="input-block"
        class="space-y-3"
      >
        <InputBlock
          id="demo-email"
          v-model="email"
          name="email"
          label="Email address"
          description="Use a work email address."
          error="Email is required"
          data-test="demo-input"
          placeholder="you@example.com"
          required
        />
        <InputBlock
          name="disabled-email"
          label="Disabled email"
          model-value="Unavailable"
          disabled
          data-test="demo-input-disabled"
        />
      </div>

      <div
        data-testid="registry-component-textarea-block"
        data-component="textarea-block"
      >
        <TextareaBlock
          id="demo-notes"
          v-model="notes"
          name="notes"
          label="Notes"
          description="Long content wraps without changing the label association."
          placeholder="Add a note"
          error="Please add a note"
          data-test="demo-textarea"
          :rows="4"
        />
      </div>

      <div
        data-testid="registry-component-checkbox-block"
        data-component="checkbox-block"
      >
        <CheckboxBlock
          id="demo-updates"
          v-model="checkboxBlockValue"
          name="updates"
          item-label="Send me product updates"
          item-value="updates"
          error="Choose whether to receive updates"
          required
          data-test="demo-checkbox"
        />
      </div>

      <div
        data-testid="registry-component-select-block"
        data-component="select-block"
      >
        <SelectBlock
          id="demo-team"
          v-model="selectBlockValue"
          name="team"
          label="Team"
          description="Choose a team."
          :items="selectItems"
          error="A team is required"
          data-test="demo-select-trigger"
          placeholder="Choose a team"
          :all-option-show="false"
        />
        <SelectBlock
          name="disabled-team"
          label="Disabled team"
          :items="selectItems"
          disabled
          placeholder="Unavailable"
          data-test="demo-select-disabled"
        />
      </div>

      <div
        data-testid="registry-component-select-group-block"
        data-component="select-group-block"
      >
        <SelectGroupBlock
          id="demo-grouped-team"
          v-model="groupedValue"
          name="grouped-team"
          label="Grouped team"
          :items="groupedItems"
          placeholder="Choose a group"
          data-test="demo-select-group-trigger"
        />
      </div>

      <div
        data-testid="registry-component-combobox-group-block"
        data-component="combobox-group-block"
      >
        <ComboboxGroupBlock
          id="demo-combobox"
          v-model="comboboxValue"
          name="combobox-team"
          label="Search teams"
          :groups="comboboxGroups"
          placeholder="Search teams"
          error="Choose a team"
          data-test="demo-combobox"
        />
      </div>

      <div
        data-testid="registry-component-radio-block"
        data-component="radio-block"
      >
        <RadioGroupBlock
          v-model="radioBlockValue"
          label="Contact preference"
          name="contact"
          :items="[
            { uuid: 'email', label: 'Email' },
            { uuid: 'phone', label: 'Phone' },
          ]"
          data-test="demo-radio"
        />
      </div>

      <div
        data-testid="registry-component-typeahead-input"
        data-component="typeahead-input"
      >
        <Field
          id="demo-typeahead"
          label="Fruit suggestions"
          description="Use Arrow Down and Enter to choose a suggestion."
        >
          <TypeaheadInput
            id="demo-typeahead-input"
            v-model="typeaheadValue"
            name="fruit"
            :suggestions="typeaheadSuggestions"
            :open="typeaheadOpen"
            data-test="demo-typeahead"
            placeholder="Type a fruit"
          />
        </Field>
      </div>

      <div
        data-testid="registry-component-search"
        data-component="search"
        class="space-y-2"
      >
        <label for="demo-search" class="text-sm font-medium">Search</label>
        <Search
          id="demo-search"
          v-model="searchValue"
          placeholder="Search components"
        />
      </div>

      <div
        data-testid="registry-component-datatable-search"
        data-component="datatable-search"
      >
        <DataTableSearch
          id="demo-datatable-search"
          v-model="dataTableSearchValue"
          placeholder="Search table"
          description="Search by name or status."
        />
      </div>

      <div
        data-testid="registry-component-input-group"
        data-component="input-group"
        class="space-y-2"
      >
        <label for="demo-group-input" class="text-sm font-medium"
          >Input group</label
        >
        <InputGroup>
          <InputGroupText>https://</InputGroupText>
          <InputGroupInput id="demo-group-input" placeholder="example.com" />
          <InputGroupAddon>Public</InputGroupAddon>
        </InputGroup>
      </div>

      <div
        data-testid="registry-component-input"
        data-component="input"
        class="space-y-2"
      >
        <Label for="demo-plain-input">Plain input</Label>
        <Input id="demo-plain-input" placeholder="Plain input" />
      </div>

      <div
        data-testid="registry-component-textarea"
        data-component="textarea"
        class="space-y-2"
      >
        <Label for="demo-plain-textarea">Plain textarea</Label>
        <Textarea id="demo-plain-textarea" placeholder="Plain textarea" />
      </div>
    </div>
  </section>
</template>
