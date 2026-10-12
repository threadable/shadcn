<script setup lang="ts">
import { ref } from "vue";

import { CheckboxBlock } from "@/registry/threadable/components/blocks/checkbox-block";
import { ComboboxGroupBlock } from "@/registry/threadable/components/blocks/combobox-group-block";
import { Field } from "@/registry/threadable/components/blocks/field";
import { InputBlock } from "@/registry/threadable/components/blocks/input-block";
import { RadioGroupBlock } from "@/registry/threadable/components/blocks/radio-block";
import { SelectBlock } from "@/registry/threadable/components/blocks/select-block";
import { SelectGroupBlock } from "@/registry/threadable/components/blocks/select-group-block";
import { TextareaBlock } from "@/registry/threadable/components/blocks/textarea-block";

import { PasswordBlock } from "@/registry/threadable/components/blocks/password-block";
import { AppPhoneInput } from "@/registry/threadable/components/blocks/phone-input-block";
import { PostcodeBlock } from "@/registry/threadable/components/blocks/postcode-block";

const password = ref("example-password");
const phone = ref("");
const phoneCountry = ref("GB");
const postcode = ref("");
const postcodeCountry = ref("GB");

const email = ref("");
const notes = ref("");
const accepted = ref(false);
const radioValue = ref("engineering");
const selectValue = ref("engineering");
const groupedSelectValue = ref("design");
const comboboxValue = ref("engineering");

const selectItems = [
  { value: "engineering", name: "Engineering" },
  { value: "design", name: "Design" },
  { value: "support", name: "Support" },
];

const groupedItems = [
  {
    group: "Teams",
    items: [
      { value: "design", name: "Design" },
      { value: "engineering", name: "Engineering" },
    ],
  },
  {
    group: "Functions",
    items: [{ value: "support", name: "Support" }],
  },
];
</script>

<template>
  <section class="demo-category" data-testid="category-form-blocks">
    <div class="demo-category-heading">
      <div>
        <p class="eyebrow">Component type</p>
        <h2>Form blocks</h2>
      </div>
      <p>Labels, descriptions, validation and keyboard-friendly controls.</p>
    </div>

    <div class="demo-grid">
      <article data-testid="registry-block-field" data-block="field">
        <h3>Field</h3>
        <p class="demo-description">A labelled control with helper text.</p>
        <Field
          id="demo-field"
          label="Workspace name"
          description="Use a name people will recognise."
          error="This field is shown in an invalid state."
        >
          <input
            id="demo-field"
            class="demo-native-input"
            value="Threadable"
            aria-invalid="true"
          />
        </Field>
      </article>

      <article
        data-testid="registry-block-input-block"
        data-block="input-block"
      >
        <h3>Input block</h3>
        <p class="demo-description">Invalid and disabled states.</p>
        <InputBlock
          id="demo-email"
          v-model="email"
          name="email"
          label="Email address"
          description="We will only use this for account notifications."
          error="Email is required"
          data-test="demo-input"
          required
        />
        <InputBlock
          id="demo-input-disabled"
          name="disabled-email"
          label="Disabled email"
          model-value="Unavailable"
          data-test="demo-input-disabled"
          disabled
        />
      </article>

      <article
        data-testid="registry-block-textarea-block"
        data-block="textarea-block"
      >
        <h3>Textarea block</h3>
        <p class="demo-description">
          Long content remains associated with its label.
        </p>
        <TextareaBlock
          id="demo-notes"
          v-model="notes"
          name="notes"
          label="Notes"
          description="Add any context the next person should know."
          placeholder="Write a longer note..."
          data-test="demo-textarea"
          :rows="4"
        />
      </article>

      <article
        data-testid="registry-block-checkbox-block"
        data-block="checkbox-block"
      >
        <h3>Checkbox block</h3>
        <p class="demo-description">A labelled checkbox with required state.</p>
        <CheckboxBlock
          v-model="accepted"
          id="demo-checkbox"
          item-label="Send me product updates"
          item-value="updates"
          data-test="demo-checkbox"
          required
        />
      </article>

      <article
        data-testid="registry-block-radio-block"
        data-block="radio-block"
      >
        <h3>Radio block</h3>
        <p class="demo-description">Arrow-key navigation between choices.</p>
        <RadioGroupBlock
          v-model="radioValue"
          id="demo-radio"
          label="Team"
          :items="[
            { uuid: 'engineering', label: 'Engineering' },
            { uuid: 'design', label: 'Design' },
          ]"
          item-key="uuid"
          item-label="label"
          item-value="uuid"
          required
        />
      </article>

      <article
        data-testid="registry-block-select-block"
        data-block="select-block"
      >
        <h3>Select block</h3>
        <p class="demo-description">
          The trigger stays labelled as the value changes.
        </p>
        <SelectBlock
          v-model="selectValue"
          name="team"
          label="Team"
          placeholder="Choose a team"
          :items="selectItems"
          :all-option-show="false"
          data-test="demo-select-trigger"
          required
        />
      </article>

      <article
        data-testid="registry-block-select-group-block"
        data-block="select-group-block"
      >
        <h3>Select group block</h3>
        <p class="demo-description">
          Grouped options retain their accessible names.
        </p>
        <SelectGroupBlock
          v-model="groupedSelectValue"
          name="grouped-team"
          label="Grouped team"
          placeholder="Choose a team"
          :items="groupedItems"
          data-test="demo-select-group-trigger"
        />
      </article>

      <article
        data-testid="registry-block-combobox-group-block"
        data-block="combobox-group-block"
      >
        <h3>Combobox group block</h3>
        <p class="demo-description">
          Searchable groups with real keyboard selection.
        </p>
        <ComboboxGroupBlock
          v-model="comboboxValue"
          name="combobox-team"
          label="Search teams"
          description="Type to filter the grouped options."
          :groups="groupedItems"
          data-test="demo-combobox"
        />
      </article>
      <article
        data-testid="registry-block-password-block"
        data-block="password-block"
      >
        <h3>Password block</h3>
        <p class="demo-description">
          Toggle visibility with the keyboard; errors stay associated with the
          field.
        </p>
        <PasswordBlock
          id="demo-password"
          v-model="password"
          name="password"
          label="Password"
          description="Use a long, unique password that you can store in a password manager."
          error="Choose a stronger password"
          required
          data-test="demo-password"
        />
        <PasswordBlock
          id="demo-password-disabled"
          name="password-disabled"
          label="Disabled password"
          model-value="secret"
          disabled
          data-test="demo-password-disabled"
        />
      </article>
      <article
        data-testid="registry-block-phone-input-block"
        data-block="phone-input-block"
      >
        <h3>Phone input block</h3>
        <p class="demo-description">
          Search countries, select one, and return focus to the phone field.
        </p>
        <AppPhoneInput
          id="demo-phone"
          v-model="phone"
          v-model:country-code="phoneCountry"
          name="phone"
          label="Phone number"
          description="Include the area code so we can reach you about your request."
          error="Enter a valid phone number"
          required
          data-test="demo-phone"
        />
        <AppPhoneInput
          id="demo-phone-disabled"
          name="phone-disabled"
          label="Disabled phone"
          country-code="GB"
          disabled
          data-test="demo-phone-disabled"
        />
      </article>
      <article
        data-testid="registry-block-postcode-block"
        data-block="postcode-block"
      >
        <h3>Postcode block</h3>
        <p class="demo-description">
          Country-specific formatting and validation after leaving the field.
        </p>
        <label for="demo-postcode-country">Postcode country</label>
        <select
          id="demo-postcode-country"
          v-model="postcodeCountry"
          class="demo-native-input"
        >
          <option value="GB">United Kingdom</option>
          <option value="US">United States</option>
          <option value="">No country</option>
        </select>
        <PostcodeBlock
          id="demo-postcode"
          v-model="postcode"
          :country-code="postcodeCountry"
          name="postcode"
          label="Postcode"
          description="Select the destination country before entering the postal code."
          invalid-format-message="Enter a valid postcode for the selected country"
          required
          data-test="demo-postcode"
        />
        <PostcodeBlock
          id="demo-postcode-invalid"
          name="postcode-invalid"
          label="Invalid postcode"
          country-code="GB"
          model-value="invalid"
          error="This postcode could not be found"
          data-test="demo-postcode-invalid"
        />
        <PostcodeBlock
          id="demo-postcode-disabled"
          name="postcode-disabled"
          label="Disabled postcode"
          disabled
          data-test="demo-postcode-disabled"
        />
      </article>
    </div>
  </section>
</template>
