# Block catalogue

Every item below is a public `registry:block` item. Install one with the official shadcn-vue CLI, for example:

```sh
pnpm dlx shadcn-vue@latest add threadable/shadcn/input-block
```

The import examples use the installed registry path `@/components/blocks/<name>`. Upstream primitives are installed into the consumer's normal `@/components/ui` path and are deliberately not part of this registry.

## Form blocks

### `field`

- Import and usage: `import { Field } from "@/components/blocks/field"`; compose `<Field id="email" label="Email address" error="Email is required"><Input id="email" /></Field>`.
- Accessible text: provide a meaningful label; use `description` for instructions and `error` for actionable validation text. The control ID must match the field ID when composing manually.
- Keyboard: the block is a semantic wrapper; its child control keeps native or primitive keyboard behaviour.
- Important props/events: `id`, `@shadcn/label`, `description`, `error`, `required`, `disabled`, `class`; child controls and slots remain consumer-owned.
- Dependencies: npm `@vueuse/core`, `class-variance-authority`, `reka-ui`; registry `@shadcn/separator` and the block's internal field support files.
- Difference from upstream: Threadable's field API centralises label, description, error and required-state relationships for the blocks in this registry.
- Accessibility: do not omit the label or replace an error with colour alone. Automated tests do not replace screen-reader review.

### `input-block`

- Import and usage: `import { InputBlock } from "@/components/blocks/input-block"`; use `<InputBlock v-model="email" id="email" label="Email address" type="email" />`.
- Accessible text: supply `@shadcn/label`; use `description` and `error` when needed. Keep the generated or explicit ID stable.
- Keyboard: preserves native input editing, Tab order and browser validation.
- Important props/events: `modelValue`, `id`, `@shadcn/label`, `description`, `error`, `disabled`, `required`, native input attributes and `update:modelValue`.
- Dependencies: npm `reka-ui`; registry `@shadcn/input` and hosted `/field`.
- Difference from upstream: adds labelled field composition and validation relationships around the upstream input primitive.
- Accessibility: never use placeholder text as the only label; verify `aria-invalid` and error association for invalid states.

### `textarea-block`

- Import and usage: `import { TextareaBlock } from "@/components/blocks/textarea-block"`; use `<TextareaBlock v-model="message" label="Message" />`.
- Accessible text: supply a visible label and useful description/error text for long-form input.
- Keyboard: preserves native textarea editing, multiline behaviour and Tab order.
- Important props/events: `modelValue`, `id`, `@shadcn/label`, `description`, `error`, `disabled`, `required`, native textarea attributes and `update:modelValue`.
- Dependencies: npm `reka-ui`; registry `@shadcn/textarea` and hosted `/field`.
- Difference from upstream: adds field labelling, descriptions and error relationships around the upstream textarea primitive.
- Accessibility: maintain sufficient visible size and do not communicate validation only through border colour.

### `checkbox-block`

- Import and usage: `import { CheckboxBlock } from "@/components/blocks/checkbox-block"`; use `<CheckboxBlock v-model="accepted" label="Accept terms" />`.
- Accessible text: every checkbox needs a visible label or explicit accessible label; groups need a group label.
- Keyboard: Space toggles; Tab moves through the control; disabled controls do not toggle.
- Important props/events: `modelValue`, `@shadcn/label`, `error`, `description`, `disabled`, `id`; the group variant accepts `items` and emits `update:modelValue`.
- Dependencies: npm `reka-ui`; registry `@shadcn/checkbox`, `@shadcn/label` and hosted `/field`.
- Difference from upstream: adds the label, field messaging and grouped item API while preserving the upstream checkbox primitive.
- Accessibility: keep the checkbox role and mixed state exposed; do not rely on the check mark colour alone.

### `radio-block`

- Import and usage: `import { RadioGroupBlock } from "@/components/blocks/radio-block"`; use `<RadioGroupBlock v-model="team" label="Team" :items="items" />`.
- Accessible text: the group needs a label and each item needs visible text or an explicit accessible label.
- Keyboard: Tab enters the group; Arrow keys move and select; Space selects the focused radio.
- Important props/events: `modelValue`, `items`, `@shadcn/label`, `error`, `description`, `disabled`, `orientation` and `update:modelValue`.
- Dependencies: npm `reka-ui`; registry `@shadcn/label`, `@shadcn/radio-group` and hosted `/field`.
- Difference from upstream: supplies a labelled item wrapper and custom accessible-label support around the upstream radio group.
- Accessibility: keep values unique and expose group validation without preventing keyboard navigation.

### `select-block`

- Import and usage: `import { SelectBlock } from "@/components/blocks/select-block"`; use `<SelectBlock v-model="role" label="Role" :items="roles" />`.
- Accessible text: supply a label and meaningful option text; descriptions and errors should explain the action or correction.
- Keyboard: Enter/Space opens; Arrow keys move; Enter selects; Escape closes and returns focus to the trigger.
- Important props/events: `modelValue`, `items`, `@shadcn/label`, `description`, `error`, `disabled`, `required` and `update:modelValue`.
- Dependencies: npm `reka-ui`; registry `@shadcn/select` and hosted `/field`.
- Difference from upstream: adds labelled field composition and custom option display/assistive text.
- Accessibility: test the closed and open names, selected state, disabled state and error relationship in a real browser.

### `select-group-block`

- Import and usage: `import { SelectGroupBlock } from "@/components/blocks/select-group-block"`; use it with grouped `items` and `v-model`.
- Accessible text: label the control and each option group; group names must add information rather than duplicate option text.
- Keyboard: follows the select pattern: Enter/Space opens, Arrow keys navigate, Enter selects and Escape closes.
- Important props/events: `modelValue`, grouped `items`, `id`, `@shadcn/label`, `description`, `error`, `disabled` and `update:modelValue`.
- Dependencies: npm `reka-ui`; registry `@shadcn/select` and hosted `/field`.
- Difference from upstream: adds grouped data input and field/error relationships.
- Accessibility: verify group announcements and the selected option with a screen reader.

### `combobox-group-block`

- Import and usage: `import { ComboboxGroupBlock } from "@/components/blocks/combobox-group-block"`; use `<ComboboxGroupBlock v-model="team" label="Team" :groups="groups" />`.
- Accessible text: provide a label, useful search text, meaningful option names and an informative empty state.
- Keyboard: Enter/Space opens; Arrow keys move; Enter selects; Escape closes; focus remains in the combobox interaction as the list changes.
- Important props/events: `modelValue`, `groups`, `@shadcn/label`, `description`, `error`, `disabled`, `placeholder` and `update:modelValue`.
- Dependencies: npm `@lucide/vue`, `@vueuse/core`, `reka-ui`; registry `@shadcn/button`, `@shadcn/command`, `@shadcn/popover` and hosted `/field`.
- Difference from upstream: provides grouped data mapping, selected-label handling and field validation around upstream command/popover primitives.
- Accessibility: preserve active-option announcements, stable IDs and a visible label; test long lists and no results.

## Action and navigation blocks

### `button-block`

- Import and usage: `import { ButtonBlock } from "@/components/blocks/button-block"`; use `<ButtonBlock label="Save changes" @click="save" />`.
- Accessible text: visible action text or an explicit accessible label is required; processing text must describe the resulting state.
- Keyboard: native button Enter/Space activation is preserved; disabled and processing states do not activate.
- Important props/events: `@shadcn/label`, `description`, `processing`, `disabled`, `variant`, `size`, `id` and native button events including `click`.
- Dependencies: npm `@lucide/vue`, `reka-ui`; registry `@shadcn/button` and hosted `/field`.
- Difference from upstream: adds field messaging and a processing state while using the consumer's upstream button primitive.
- Accessibility: ensure the processing state is understandable without relying on the spinner animation.

### `button-link-block`

- Import and usage: `import { ButtonLinkBlock } from "@/components/blocks/button-link-block"`; use `<ButtonLinkBlock href="/settings" label="Settings" />`.
- Accessible text: link text must describe its destination; supply description or processing text when navigation is delayed.
- Keyboard: uses a real Inertia link/button-compatible element; Enter activates, disabled links do not navigate and focus remains predictable.
- Important props/events: Inertia `href`, `method`, `data`, `replace`, `preserveState`, `processing`, `disabled`, `@shadcn/label`, `variant` and link events.
- Dependencies: npm `@inertiajs/vue3`, `@lucide/vue`, `reka-ui`; registry `@shadcn/button` and hosted `/field`.
- Difference from upstream: Threadable block combining Inertia navigation, button styling and field messaging.
- Accessibility: do not use a link when the action is not navigation; provide a clear destination and test the disabled state.

### `text-link-block`

- Import and usage: `import { TextLinkBlock } from "@/components/blocks/text-link-block"`; use `<TextLinkBlock href="/profile">View profile</TextLinkBlock>`.
- Accessible text: link content must identify the destination; do not rely on surrounding text that is not part of the link name.
- Keyboard: native link Tab and Enter behaviour is preserved.
- Important props/events: Inertia link props, `href`, `method`, `external`, `variant`, `disabled`, `id` and link events.
- Dependencies: npm `@inertiajs/core`, `@inertiajs/vue3`, `class-variance-authority`, `reka-ui`.
- Difference from upstream: Threadable Inertia-aware text-link variants with explicit disabled and ARIA forwarding.
- Accessibility: preserve visible focus and sufficient contrast; use a button for mutations.

### `dropdown-menu-block`

- Import and usage: `import { DropdownMenuBlock, DropdownMenuItemBlock } from "@/components/blocks/dropdown-menu-block"`; place labelled items in the block slot.
- Accessible text: give the trigger a name and each menu item action-oriented text.
- Keyboard: Enter/Space opens; Arrow keys move; Enter/Space activates; Escape closes and restores trigger focus.
- Important props/events: `@shadcn/label`, `items`, `variant`, `size`, `disabled`, item `@shadcn/label`, `disabled`, `inset` and `variant`.
- Dependencies: npm `@lucide/vue`; registry `@shadcn/button` and `@shadcn/dropdown-menu`.
- Difference from upstream: provides a labelled trigger and item wrapper with Threadable defaults around shadcn-vue menu primitives.
- Accessibility: do not put arbitrary form controls in the menu without testing the resulting pattern; disabled items must not activate.

### `stepper-block`

- Import and usage: `import { StepperBlock } from "@/components/blocks/stepper-block"`; use `<StepperBlock :steps="steps" :current-step="2" />`.
- Accessible text: each step needs concise, meaningful text; current and completed states must be conveyed beyond colour.
- Keyboard: the underlying stepper preserves its primitive keyboard semantics; do not add extra tab stops to decorative connectors.
- Important props/events: `steps` and `currentStep`; step entries contain a label and state.
- Dependencies: npm `@lucide/vue`; registry `@shadcn/stepper`.
- Difference from upstream: maps a simple data model to the upstream stepper with Threadable completed/current styling.
- Accessibility: ensure the current step is exposed and that a visual progress indicator is not the sole status signal.

## Overlay blocks

### `confirm-dialog-block`

- Import and usage: `import { ConfirmDialogBlock } from "@/components/blocks/confirm-dialog-block"`; use it with `open`, `title`, `description`, `@confirm` and `@cancel`.
- Accessible text: provide a specific title, useful description, and action/cancel labels that explain consequences.
- Keyboard: focus enters the alert dialog, Tab is trapped, Escape/cancel closes where allowed, and focus is restored to the trigger.
- Important props/events: `open`, `title`, `description`, `actionLabel`, `cancelLabel`, `dataTest`, `processing` (default `false`); emits `confirm` and `cancel`. Set `processing` to disable the action button while a request is running.
- Dependencies: registry `@shadcn/alert-dialog`.
- Difference from upstream: a task-oriented confirmation API on top of the consumer's alert-dialog primitive.
- Accessibility: destructive actions need explicit labels; do not remove the title to make the design visually simpler.

### `sheet-block`

- Import and usage: `import { SheetBlock } from "@/components/blocks/sheet-block"`; supply `open`, a labelled header, content slot and Inertia form configuration.
- Accessible text: provide a sheet title, useful description and labels for every form control and close action.
- Keyboard: opening moves focus into the sheet, Tab is contained, Escape closes and focus returns to the trigger.
- Important props/events: `open`, `side`, `title`, `description`, Inertia `action`/`method`/`data`, `@close` and form success events.
- Dependencies: npm `@inertiajs/vue3`, `reka-ui`; registry `@shadcn/sheet`.
- Difference from upstream: Inertia-aware form sheet with Threadable header and close/focus behaviour.
- Accessibility: keep title and description in the accessible dialog structure; test scrollable content and mobile widths.

### `sheet-content-block`

- Import and usage: `import { SheetContentBlock } from "@/components/blocks/sheet-content-block"`; use it inside the consumer's `Sheet` root with a `SheetTitle`.
- Accessible text: the containing sheet must provide a title; close controls and form fields need names.
- Keyboard: preserves the sheet's focus trapping, Escape dismissal and focus restoration through the upstream dialog primitive.
- Important props/events: dialog content props, `side`, `overlayClass`, `class` and forwarded dialog content events.
- Dependencies: npm `@vueuse/core`, `reka-ui`; registry `@shadcn/sheet`.
- Difference from upstream: custom responsive content and overlay composition that can replace the consumer's generated sheet content while keeping the API boundary.
- Accessibility: never use it without a labelled containing sheet; verify focus and scroll behaviour at mobile widths.

## Feedback and layout blocks

### `card-block`

- Import and usage: `import { CardBlock, CardBlockFooter } from "@/components/blocks/card-block"`; use `<CardBlock><CardBlockFooter>Actions</CardBlockFooter></CardBlock>`.
- Accessible text: cards are layout containers; use a heading and landmarks when the card represents a named region.
- Keyboard: the block is not interactive by itself; interactive descendants keep their normal order.
- Important props/events: `as`, `variant`, `class`; `CardBlockFooter` accepts class and slot content.
- Dependencies: npm `@vueuse/core`, `class-variance-authority`, `reka-ui`.
- Difference from upstream: Threadable layout variants and footer spacing rather than an upstream card primitive.
- Accessibility: do not add a card role to every visual panel; choose semantics based on content.

### `skeleton-block`

- Import and usage: `import { SkeletonBlock } from "@/components/blocks/skeleton-block"`; use `<SkeletonBlock :rows="3" :show-separator="true" />`.
- Accessible text: provide a loading status in the surrounding region when users need to know content is loading; the skeleton itself is decorative.
- Keyboard: not focusable or interactive.
- Important props/events: `rows`, `showSeparator`, `class`; there are no emitted events.
- Dependencies: registry `@shadcn/separator` and `@shadcn/skeleton`.
- Difference from upstream: structured multi-row loading layout built from consumer primitives.
- Accessibility: do not expose decorative skeleton shapes as meaningful text and provide a reduced-motion-friendly loading experience.

## Password block

```vue
<script setup lang="ts">
import { ref } from "vue";
import { PasswordBlock } from "@/components/blocks/password-block";
const password = ref("");
</script>
<template>
  <PasswordBlock v-model="password" name="password" label="Password" required />
</template>
```

- Provide a visible `label` or an accessible name. The visibility button exposes its pressed state and controls the input; Enter and Space toggle visibility. Disabled and processing states disable both controls.
- Props include `error`, `description`, `required`, `autocomplete` (default `new-password`), `showPasswordLabel` and `hidePasswordLabel`. Supply translated labels through those props.
- Dependencies: npm `@lucide/vue`, `clsx`, `reka-ui`, `tailwind-merge`; registry `@shadcn/input-group` and hosted `/field`.
- Difference from upstream: combines the field's labels and validation relationships with a password visibility toggle. Review password-manager behaviour and focus visibility in the consuming theme.

## Phone input block

```vue
<script setup lang="ts">
import { ref } from "vue";
import { AppPhoneInput } from "@/components/blocks/phone-input-block";
const phone = ref("");
const country = ref("GB");
</script>
<template>
  <AppPhoneInput
    v-model="phone"
    v-model:country-code="country"
    name="phone"
    label="Phone number"
  />
</template>
```

- `label` and `name` are required. `countryCode` is a two-letter country code. The country selector includes the country name in its accessible label. Enter opens the selector, typing filters countries, arrow keys navigate, Enter selects and focuses the phone input, and Escape closes and restores focus.
- Text props: `placeholder`, `selectCountryLabel`, `searchCountryPlaceholder`, `noCountryFoundText`, with English defaults. `countryLocale` defaults to `en`; `fetchCountry` defaults to false and opts into the upstream external country lookup. Supply an initial country explicitly for predictable behaviour.
- Dependencies: npm `base-vue-phone-input`, `libphonenumber-js`, `@lucide/vue`, `clsx`, `reka-ui`, `tailwind-merge`; registry `@shadcn/button`, `@shadcn/command`, `@shadcn/input`, `@shadcn/popover` and hosted `/field`.
- Difference from upstream: adds field validation semantics, searchable country selection and bundled flags. `FlagComponent` and `flags.ts` belong to this block; they are not separate public items. The flag module contains data URLs from the original PNGs. A consumer CSP must allow `data:` image sources for flags. Flags are decorative when the country name is provided separately. Phone formatting does not establish that a number is reachable; validate submitted values on the server.

## Postcode block

```vue
<script setup lang="ts">
import { ref } from "vue";
import { PostcodeBlock } from "@/components/blocks/postcode-block";
const postcode = ref("");
</script>
<template>
  <PostcodeBlock
    v-model="postcode"
    country-code="GB"
    name="postcode"
    label="Postcode"
  />
</template>
```

- Supply a visible `label` or accessible name. The input is disabled without a country; `countryCode` is normalized to uppercase. Tab follows normal input navigation. Local format errors appear after focus leaves the field or an existing value becomes invalid after a country change.
- `invalidFormatMessage` supplies translated validation text; the English fallback includes `label` or `name`. The `error` prop takes priority. Other input props include `placeholder`, `required`, `disabled`, `processing` and `maxlength`, capped by the known country format.
- Dependencies: npm `reka-ui`; registry hosted `/input-block`. `postcodeFormat.ts` and `formats.json` are internal files included with the block.
- Difference from upstream: formats supported fixed patterns and checks country regexes. Country formats without supported masks remain unmasked. Format matching cannot confirm that a postcode exists; use server validation where needed and review the format dataset for your supported countries.

## Calendar block

```vue
<script setup lang="ts">
import { shallowRef } from "vue";
import type { DateValue } from "@internationalized/date";
import { CalendarBlock } from "@/components/blocks/calendar-block";
const date = shallowRef<DateValue>();
</script>
<template>
  <CalendarBlock v-model="date" name="date" label="Appointment date" />
</template>
```

- A visible label names the trigger and dialog. Without a label, the placeholder names them. Enter or Space opens the dialog; arrow keys move through dates and Enter or Space selects. Apply commits the draft and emits `apply`; Escape cancels, restores the previous date and returns focus. Clear removes the date and emits `clear`. Disabled and processing states disable the trigger and actions.
- Props include `minValue`, `maxValue`, `defaultValue`, `locale` (default `en-GB`), `dateFormat` (default `dd-MM-yyyy`), `layout`, `yearRange`, `required`, `error`, `description`, and text props `placeholder`, `clearLabel`, `applyLabel`. The model uses `DateValue`, not a JavaScript Date. Formats support `yyyy`, `yy`, `MM`, `M`, `dd`, `d`; they format calendar fields without timezone conversion.
- Dependencies: npm `@internationalized/date`, `@lucide/vue`, `reka-ui`, `clsx`, `tailwind-merge`; registry `@shadcn/calendar`, `@shadcn/button`, `@shadcn/dialog` and hosted `/field`.
- Difference from upstream: wraps the calendar in a labelled field and confirmation dialog. Supply translated text through props and pass `locale` for calendar labels. Submit and validate dates on the server; `required` adds a visible required marker to the label and does not provide native form validation.

## Range calendar block

```vue
<script setup lang="ts">
import { shallowRef } from "vue";
import type { DateRange } from "reka-ui";
import { RangeCalendarBlock } from "@/components/blocks/range-calendar-block";
const range = shallowRef<DateRange>();
</script>
<template>
  <RangeCalendarBlock v-model="range" name="dates" label="Travel dates" />
</template>
```

- Select a start and end date with the keyboard before Apply is enabled. Escape cancels changes and restores trigger focus; Apply commits the range and emits `apply`, Clear resets the range and emits `clear`. Below 768px the desktop popover becomes a named dialog with trapped focus. Bounds, disabled and processing states are passed to the calendar.
- Props include `defaultValue`, `minValue`, `maxValue`, `locale`, `dateFormat` (default `yyyy-MM-dd`), `triggerClass`, field validation props, and text props `placeholder`, `clearLabel`, `applyLabel`. The model is `DateRange | undefined`, whose endpoints use `DateValue`. `presets` and `description` slots are supported; `RangeCalendarView.vue` is an internal implementation file.
- Dependencies: npm `@internationalized/date`, `@lucide/vue`, `@vueuse/core`, `reka-ui`, `clsx`, `tailwind-merge`; registry `@shadcn/range-calendar`, `@shadcn/button`, `@shadcn/dialog`, `@shadcn/popover` and hosted `/field`.
- Difference from upstream: adds field validation, explicit confirmation and responsive overlays. Use a meaningful label and translated text props. Required state does not enforce native form submission rules; validate complete ranges on the server. Review calendar localization and focus in the consuming theme.

## Action button block

```vue
<script setup lang="ts">
import { Pencil } from "@lucide/vue";
import { ActionButtonBlock } from "@/components/blocks/action-button-block";
const emit = defineEmits<{ edit: [] }>();
</script>
<template>
  <ActionButtonBlock
    :icon="Pencil"
    label="Edit item"
    data-test="edit-item"
    @click="emit('edit')"
  />
</template>
```

- Required props: `label`, `icon` (a Vue component) and `dataTest`. The label names the button and its tooltip; icons are decorative. Variants: `neutral` (default), `info`, `warning`, `success`, `destructive`.
- `disabled` and `processing` disable native activation; processing displays a spinner. `disabledMessage` explains a disabled action in the tooltip. A disabled/processing wrapper is keyboard-focusable so users can reach its explanation; it does not activate the button. Enter and Space activate an enabled button; Escape dismisses its tooltip. The block provides its own tooltip provider.
- Dependencies: registry `@shadcn/button` and `@shadcn/tooltip`; npm `@lucide/vue` and `class-variance-authority`; Vue is a framework prerequisite. Use any icon component already available in the consuming application.
- Difference from upstream: a compact icon action with semantic colours and accessible disabled explanations, built on the upstream button and tooltip primitives. Supply specific labels; colours and icons supplement the label. Review tooltip behaviour, disabled contrast and dark theme in your application. Emits `click` with the native mouse event.
