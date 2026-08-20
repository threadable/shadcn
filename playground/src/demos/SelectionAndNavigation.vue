<script setup lang="ts">
import { ref } from "vue";

import {
  NativeSelect,
  NativeSelectOption,
} from "@/registry/threadable/ui/native-select";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/registry/threadable/ui/navigation-menu";

import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@/registry/threadable/ui/number-field";

import {
  PinInput,
  PinInputGroup,
  PinInputSeparator,
  PinInputSlot,
} from "@/registry/threadable/ui/pin-input";

import { Progress } from "@/registry/threadable/ui/progress";

import {
  Questionnaire,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnaireProgress,
  QuestionnaireTitle,
} from "@/registry/threadable/ui/questionnaire";

import { RangeCalendar } from "@/registry/threadable/ui/range-calendar";

const numberValue = ref(3);

const pinValue = ref<string[]>([]);

const progressValue = ref(64);

const rangeCalendarValue = ref();

const questionnaireValue = ref("");

const questionnaireItems = [{ name: "profile", required: true }];
</script>

<template>
  <section aria-labelledby="selection-navigation-heading">
    <h3 id="selection-navigation-heading" class="mb-3 text-base font-semibold">
      Selection and navigation
    </h3>
    <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      <div
        data-testid="registry-component-native-select"
        data-component="native-select"
      >
        <NativeSelect aria-label="Native select" class="w-full"
          ><NativeSelectOption value="">Choose a team</NativeSelectOption
          ><NativeSelectOption value="engineering"
            >Engineering</NativeSelectOption
          ><NativeSelectOption value="design"
            >Design</NativeSelectOption
          ></NativeSelect
        >
      </div>

      <div
        data-testid="registry-component-navigation-menu"
        data-component="navigation-menu"
      >
        <NavigationMenu aria-label="Primary navigation"
          ><NavigationMenuList
            ><NavigationMenuItem
              ><NavigationMenuLink href="#"
                >Components</NavigationMenuLink
              ></NavigationMenuItem
            ><NavigationMenuItem
              ><NavigationMenuLink href="#"
                >Documentation</NavigationMenuLink
              ></NavigationMenuItem
            ></NavigationMenuList
          ></NavigationMenu
        >
      </div>

      <div
        data-testid="registry-component-number-field"
        data-component="number-field"
      >
        <NumberField
          v-model="numberValue"
          :min="0"
          :max="10"
          aria-label="Quantity"
          ><NumberFieldContent
            ><NumberFieldDecrement
              aria-label="Decrease quantity" /><NumberFieldInput
              aria-label="Quantity" /><NumberFieldIncrement
              aria-label="Increase quantity" /></NumberFieldContent
        ></NumberField>
      </div>

      <div
        data-testid="registry-component-pin-input"
        data-component="pin-input"
      >
        <PinInput v-model="pinValue" aria-label="Security PIN"
          ><PinInputGroup
            ><PinInputSlot :index="0" /><PinInputSlot
              :index="1" /><PinInputSeparator /><PinInputSlot
              :index="2" /><PinInputSlot :index="3" /></PinInputGroup
        ></PinInput>
      </div>

      <div data-testid="registry-component-progress" data-component="progress">
        <label for="component-progress" class="mb-2 block text-sm"
          >Upload progress</label
        ><Progress
          id="component-progress"
          v-model="progressValue"
          aria-label="Upload progress"
        />
      </div>

      <div
        data-testid="registry-component-questionnaire"
        data-component="questionnaire"
      >
        <Questionnaire
          :items="questionnaireItems"
          default-item="profile"
          @submit.prevent
        >
          <QuestionnaireItem name="profile" required>
            <QuestionnaireTitle>Profile details</QuestionnaireTitle>
            <QuestionnaireDescription
              >Answer the question to continue.</QuestionnaireDescription
            >
            <QuestionnaireChoices
              ><QuestionnaireChoice value="ready" default-checked
                >Ready to continue</QuestionnaireChoice
              ><QuestionnaireInput
                v-model="questionnaireValue"
                placeholder="Or add a note"
                aria-label="Profile note"
            /></QuestionnaireChoices>
            <div class="mt-3 flex items-center justify-between">
              <QuestionnaireProgress /><QuestionnaireNext />
            </div>
          </QuestionnaireItem>
        </Questionnaire>
      </div>

      <div
        data-testid="registry-component-range-calendar"
        data-component="range-calendar"
      >
        <div role="group" aria-label="Choose a date range">
          <RangeCalendar
            v-model="rangeCalendarValue"
            class="rounded-md border"
          />
        </div>
      </div>
    </div>
  </section>
</template>
