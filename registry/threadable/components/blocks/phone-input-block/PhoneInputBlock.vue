<script setup lang="ts">
import { ChevronDown } from "@lucide/vue";
import PhoneInput from "base-vue-phone-input";
import type { CountryCode } from "libphonenumber-js";
import type { PrimitiveProps } from "reka-ui";
import { computed, nextTick, ref } from "vue";
import type { HTMLAttributes } from "vue";
import { Field } from "@/registry/threadable/components/blocks/field";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn, guidGenerator } from "@/registry/threadable/lib/utils";
import FlagComponent from "./FlagComponent.vue";

interface CountryOption {
  iso2: string;
  dialCode: string;
  name: string;
}

interface Props extends PrimitiveProps {
  class?: HTMLAttributes["class"];
  error?: string;
  label: string;
  description?: string;
  name: string;
  placeholder?: string;
  selectCountryLabel?: string;
  searchCountryPlaceholder?: string;
  noCountryFoundText?: string;
  id?: string;
  dataTest?: string;
  processing?: boolean;
  disabled?: boolean;
  showError?: boolean;
  showGap?: boolean;
  required?: boolean;
  fetchCountry?: boolean;
  countryLocale?: string;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: "Enter phone number",
  selectCountryLabel: "Select country",
  searchCountryPlaceholder: "Search country",
  noCountryFoundText: "No country found",
  fetchCountry: false,
  countryLocale: "en",
  disabled: false,
  processing: false,
  showError: true,
  showGap: true,
});

const model = defineModel<string | null>();
const countryCode = defineModel<string>("countryCode", { default: "" });
const selectedCountryCode = computed<CountryCode | undefined>({
  get: () =>
    countryCode.value ? (countryCode.value as CountryCode) : undefined,
  set: (value) => {
    countryCode.value = value ?? "";
  },
});
const open = ref(false);
const generatedId = `phone-input-${guidGenerator()}`;
const inputId = computed(() => props.id || generatedId);
const labelId = computed(() => `${inputId.value}-label`);
const descriptionId = computed(() =>
  props.description ? `${inputId.value}-description` : undefined,
);
const errorId = computed(() =>
  props.showError && props.error ? `${inputId.value}-error` : undefined,
);
const describedBy = computed(
  () =>
    [descriptionId.value, errorId.value].filter(Boolean).join(" ") || undefined,
);
const isDisabled = computed(() => props.disabled || props.processing);

const getCountrySelectorAriaLabel = (
  inputValue: string,
  countries: CountryOption[],
): string => {
  const selectedCountry = countries.find(
    (country) => country.iso2 === inputValue,
  );

  return selectedCountry
    ? `${props.selectCountryLabel}: ${selectedCountry.name}`
    : props.selectCountryLabel;
};

const focusPhoneInput = (): void => {
  open.value = false;
  void nextTick(() => document.getElementById(inputId.value)?.focus());
};
</script>

<template>
  <Field
    :id="inputId"
    :label="label"
    :error="error"
    :description="description"
    :label-id="labelId"
    :description-id="descriptionId"
    :error-id="errorId"
    :class="cn('grid gap-1', props.class)"
    :show-error="showError"
    :show-gap="showGap"
    :required="required"
  >
    <PhoneInput
      :model-value="model ?? ''"
      v-model:country-code="selectedCountryCode"
      :disabled="isDisabled"
      no-use-browser-locale
      :fetch-country="fetchCountry"
      :country-locale="countryLocale"
      :ignored-countries="['AC']"
      class="flex h-10 items-center gap-2"
      @update:model-value="model = $event"
    >
      <template #selector="{ inputValue, updateInputValue, countries }">
        <div
          :key="inputValue"
          aria-live="polite"
          aria-atomic="true"
          class="sr-only"
        >
          {{ getCountrySelectorAriaLabel(inputValue, countries) }}
        </div>

        <Button
          v-if="isDisabled"
          :aria-label="getCountrySelectorAriaLabel(inputValue, countries)"
          disabled
          variant="outline"
          size="sm"
          type="button"
          class="h-10 w-25 flex-row justify-between rounded-md border-primary disabled:text-zinc-500 disabled:opacity-100 dark:border-input"
        >
          <span class="flex w-6 justify-center" aria-hidden="true">
            <FlagComponent :country="inputValue" class="drop-shadow-lg" />
          </span>
          <span class="font-normal" aria-hidden="true">
            {{
              countries.find(
                (country: CountryOption) => country.iso2 === inputValue,
              )?.dialCode || ""
            }}
          </span>
          <ChevronDown class="mt-1 -ml-1 size-4" aria-hidden="true" />
        </Button>
        <Popover v-else v-model:open="open">
          <PopoverTrigger as-child>
            <Button
              :aria-label="getCountrySelectorAriaLabel(inputValue, countries)"
              :aria-expanded="open"
              variant="outline"
              size="sm"
              type="button"
              class="h-10 w-25 flex-row justify-between rounded-md border-primary dark:border-input"
            >
              <span class="flex w-6 justify-center" aria-hidden="true">
                <FlagComponent :country="inputValue" class="drop-shadow-lg" />
              </span>
              <span class="font-normal" aria-hidden="true">
                {{
                  countries.find(
                    (country: CountryOption) => country.iso2 === inputValue,
                  )?.dialCode || ""
                }}
              </span>
              <ChevronDown class="mt-1 -ml-1 size-4" aria-hidden="true" />
            </Button>
          </PopoverTrigger>
          <PopoverContent class="h-70 w-[300px] p-0">
            <Command>
              <CommandInput
                :placeholder="searchCountryPlaceholder"
                :aria-label="searchCountryPlaceholder"
              />
              <CommandEmpty>
                {{ noCountryFoundText }}
              </CommandEmpty>
              <CommandList>
                <CommandGroup>
                  <CommandItem
                    v-for="country in countries"
                    :key="country.iso2"
                    :value="country.name"
                    :aria-label="country.name"
                    class="flex items-center gap-2 px-3 py-2"
                    @select="
                      () => {
                        updateInputValue(country.iso2);
                        focusPhoneInput();
                      }
                    "
                  >
                    <span class="w-6 text-sm" aria-hidden="true">
                      {{ country.iso2 }}
                    </span>
                    <span class="flex w-6 justify-center" aria-hidden="true">
                      <FlagComponent :country="country.iso2" />
                    </span>
                    <span class="flex-1 truncate text-sm" aria-hidden="true">
                      {{ country.name }}
                    </span>
                    <span class="text-sm text-foreground/50" aria-hidden="true">
                      {{ country.dialCode }}
                    </span>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </template>

      <template #input="{ inputValue, updateInputValue }">
        <div class="flex w-full">
          <Input
            :id="inputId"
            :name="name"
            :disabled="isDisabled"
            :required="required"
            type="tel"
            inputmode="tel"
            :model-value="inputValue"
            :placeholder="placeholder"
            :data-test="dataTest || `phone-input-block-${name}`"
            :aria-labelledby="labelId"
            :aria-describedby="describedBy"
            :aria-errormessage="errorId"
            :aria-invalid="error ? 'true' : 'false'"
            :aria-required="required ? 'true' : undefined"
            autocomplete="tel"
            class="h-10 w-full rounded-md border-primary bg-white! focus-visible:border-primary focus-visible:ring-[2px] focus-visible:ring-primary/20! disabled:text-black/50 disabled:opacity-100 dark:border-input"
            @input="updateInputValue"
          />
        </div>
      </template>
    </PhoneInput>
  </Field>
</template>
