# Component catalogue

This catalogue describes the public items in `registry.json`. Install an item with the official CLI, for example:

```sh
pnpm dlx shadcn-vue@latest add threadable/shadcn/button
```

The import examples below assume the consuming application's usual `@/components/ui` alias. Internal registry source imports use `@/registry/threadable`; see [`docs/adding-a-component.md`](./adding-a-component.md). The registry source files and `registry.json` are authoritative for owned files and exports.

## Theme, library and composable

### `threadable-theme`

- Import and usage: install with `pnpm dlx shadcn-vue@latest add threadable/shadcn/threadable-theme`; it contributes Tailwind CSS v4 variables and global CSS rather than a Vue component.
- Accessible text: no text API. Consumers must still check contrast, focus visibility and state differentiation after applying their own theme.
- Keyboard: not applicable; the CSS must not hide focus indicators or disable interaction.
- Props/events: no Vue props or events. The supported registry fields are `cssVars` and `css`.
- Dependencies: npm `tw-animate-css`; no registry dependency.
- Threadable difference: this is a Threadable style item with Threadable tokens and global rules; it is not an upstream shadcn-vue component.
- Accessibility consideration: the tokens are not a contrast or WCAG guarantee. Verify the complete consumer theme, forced-colour mode and focus styles.

### `utils`

- Import and usage: `import { cn, guidGenerator, useIsMobile } from "@/components/lib/utils"`; use `cn("base", condition && "extra")`, `guidGenerator()` for generated IDs and `useIsMobile()` for responsive behaviour.
- Accessible text: no text API. Generated IDs must remain attached to the intended labels and controls.
- Keyboard: not applicable directly; callers must preserve keyboard behaviour when using responsive branches.
- Props/events: exports `cn`, `guidGenerator`, `defaultPageSize`, `defaultPageSizes`, `MOBILE_BREAKPOINT` and `useIsMobile`.
- Dependencies: npm `@vueuse/core`, `clsx`, `tailwind-merge`; no registry dependency.
- Threadable difference: shared source-project helpers are intentionally limited to functions used by reusable registry items.
- Accessibility consideration: do not use `useIsMobile` to remove essential controls without providing an accessible alternative.

### `use-typeahead-keyboard`

- Import and usage: `import { useTypeaheadKeyboard } from "@/components/composables/useTypeaheadKeyboard"`; use it to track active suggestions in a typeahead.
- Accessible text: the consuming input and suggestion list need an accessible name, active-option representation and loading/empty text.
- Keyboard: supports next/previous movement and selecting the current or first item; map the composable to the component's Arrow and Enter handlers.
- Props/events: the composable exposes the keyboard state methods used by `TypeaheadInput`; it has no Vue props or emitted events.
- Dependencies: no npm or registry dependency.
- Threadable difference: Threadable-only support for the imported typeahead API; it is not an upstream shadcn-vue item.
- Accessibility consideration: the helper does not create ARIA markup or focus management. The host component must expose active state and preserve focus.

## Components

### `alert-dialog`

- Import and usage: `import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"` and compose a title, description, cancel and action.
- Accessible text: every alert dialog needs a concise `AlertDialogTitle`, a useful `AlertDialogDescription` and action text that explains the result. Do not use an icon as the only name.
- Keyboard: Trigger opens with Enter/Space; focus moves into the modal, Tab is contained, Escape/cancel closes where allowed, and focus returns to the trigger.
- Props/events: root `open`, `defaultOpen`, `modal` and `update:open`; content forwards Reka UI content props/events; action/cancel/trigger forward their Reka UI props.
- Dependencies: npm `@vueuse/core`, `reka-ui`; registry `@threadable/button`, `@threadable/utils`.
- Threadable difference: retains the imported Reka UI composition and Threadable button styling/forwarding rather than regenerating an upstream implementation.
- Accessibility consideration: destructive actions need explicit, meaningful labels; a dialog without a title or with ambiguous action text is not complete.

### `button`

- Import and usage: `import { Button } from "@/components/ui/button"`; use `<Button type="button">Save</Button>`.
- Accessible text: visible text or an explicit `aria-label` is required. Icon-only buttons must be labelled and decorative icons hidden.
- Keyboard: native button Enter/Space activation is preserved; `disabled` removes activation and tab focus.
- Props/events: `variant` (`default`, `destructive`, `outline`, `secondary`, `ghost`, `link`), `size`, Reka `as`/`asChild` and native button attributes; native events fall through.
- Dependencies: npm `class-variance-authority`, `reka-ui`; registry `@threadable/utils`.
- Threadable difference: retains Threadable variant classes, invalid-state styling and Reka primitive support.
- Accessibility consideration: use `asChild` only when the child has correct interactive semantics; do not turn a non-interactive element into a button by styling it.

### `checkbox`

- Import and usage: `import { Checkbox } from "@/components/ui/checkbox"`; pair it with `Label` or an `aria-label`.
- Accessible text: every checkbox needs a visible associated label or an explicit accessible name. Use `aria-invalid` and an error association for invalid values.
- Keyboard: Space toggles; Tab enters/leaves the control; disabled checkboxes do not toggle.
- Props/events: Reka `CheckboxRootProps`, `modelValue`, `value`, `disabled`, `required`, `name`, `checked`, `indeterminate` and `update:modelValue`.
- Dependencies: npm `@lucide/vue`, `reka-ui`; registry `@threadable/utils`.
- Threadable difference: includes the Threadable check indicator and invalid/focus styling while forwarding Reka state and events.
- Accessibility consideration: do not rely on the check colour alone; preserve the native checkbox role and an intelligible mixed state.

### `command`

- Import and usage: `import { Command, CommandInput, CommandList, CommandItem } from "@/components/ui/command"`; add an accessible input, list, items and empty state.
- Accessible text: `CommandInput` needs a useful placeholder or label; items need meaningful text; `CommandEmpty` should explain that no result is available.
- Keyboard: the input receives focus, Arrow keys move through items, Enter activates the current item, and Escape closes `CommandDialog`.
- Props/events: root forwards listbox props such as `modelValue`, `multiple`, `disabled` and filter configuration; input accepts filter/value props including `autoFocus` (enabled by default), which can be set to `false` for embedded commands; item accepts `value`, `textValue`, `disabled` and listbox events.
- Dependencies: npm `@lucide/vue`, `@vueuse/core`, `reka-ui`; registry `@threadable/dialog`, `@threadable/utils`.
- Threadable difference: retains the source custom filtering/context implementation and dialog integration instead of using a generated upstream file set.
- Accessibility consideration: keep item values/search text stable and ensure the active option is exposed while filtering; test long results and the empty state.

### `dialog`

- Import and usage: `import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog"`; every content panel needs a title and, where useful, description.
- Accessible text: `DialogTitle` is required for the accessible name; use `DialogDescription` for purpose/instructions and label icon-only close buttons.
- Keyboard: Enter/Space opens from the trigger, focus enters and is trapped, Tab cycles within, Escape closes, and focus returns to the trigger unless intentionally changed.
- Props/events: root `open`, `defaultOpen`, `modal`, `update:open`; content supports `forceMount`, custom classes and content events; `DialogScrollContent` supplies the scrollable variant.
- Dependencies: npm `@lucide/vue`, `@vueuse/core`, `reka-ui`; registry `@threadable/utils`.
- Threadable difference: preserves Threadable overlay/content classes, scroll-content variant and Reka focus handling.
- Accessibility consideration: never omit the title to make a design visually cleaner; visually hide it if needed and verify focus restoration.

### `dropdown-menu`

- Import and usage: `import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"`; give the trigger an accessible name and items action-oriented text.
- Accessible text: label the trigger, menu groups and submenu triggers; include visible text for menu items and use `DropdownMenuShortcut` only as supplemental information.
- Keyboard: Enter/Space opens, Arrow keys move, Enter/Space activates, ArrowRight/Left navigate submenus, Escape closes and focus returns to the trigger.
- Props/events: root `open`, `defaultOpen`, `modal`, `update:open`; item `disabled`, `variant`, `inset`, `textValue`; checkbox/radio items expose checked/value events; content forwards positioning props.
- Dependencies: npm `@lucide/vue`, `@vueuse/core`, `reka-ui`; registry `@threadable/utils`.
- Threadable difference: keeps the source menu classes, item variants and explicit Reka portal re-export.
- Accessibility consideration: do not place arbitrary form controls in a menu without validating the resulting interaction pattern; disabled items must not activate.

### `input`

- Import and usage: `import { Input } from "@/components/ui/input"`; pair with a label and use `v-model` for controlled values.
- Accessible text: provide an associated visible label or `aria-label`; descriptions and errors should be referenced with `aria-describedby`/`aria-errormessage` as appropriate.
- Keyboard: native text-input typing, editing, Tab navigation and browser validation are preserved.
- Props/events: `modelValue`, `defaultValue`, native input attributes and `update:modelValue`; class is merged with Threadable styles.
- Dependencies: npm `@vueuse/core`; registry `@threadable/utils`.
- Threadable difference: uses VueUse passive model forwarding and adds user-invalid/ARIA-invalid styling to the source input primitive.
- Accessibility consideration: use a correct `type`, `autocomplete`, `inputmode` and `maxlength`; do not use placeholder text as a label.

### `input-group`

- Import and usage: `import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText, InputGroupTextarea } from "@/components/ui/input-group"`; compose a control with an addon that is decorative or explicitly labelled.
- Accessible text: the actual input still needs a label; mark decorative icons `aria-hidden` and ensure addon text is not announced twice.
- Keyboard: child inputs and buttons retain normal Tab order; do not make a non-action addon focusable.
- Props/events: group `class`; addon `align`; button `variant`/`size` plus button attributes; input/textarea wrappers forward native props and model events.
- Dependencies: npm `class-variance-authority`; registry `@threadable/button`, `@threadable/input`, `@threadable/textarea`, `@threadable/utils`.
- Threadable difference: preserves Threadable data-slot structure, button variant integration and compound-control classes.
- Accessibility consideration: test the accessible name of the input with addons on both sides and ensure the group does not create unexpected tab stops.

### `popover`

- Import and usage: `import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"`; give the trigger a name and use the content for related, dismissible information or controls.
- Accessible text: trigger and any form controls inside content need names; use an explicit heading/description when the content is a meaningful region.
- Keyboard: Enter/Space opens, Tab can move through content, Escape closes and focus returns to the trigger; verify outside-click behaviour for the chosen content.
- Props/events: root `open`, `defaultOpen`, `modal`, `update:open`; content supports side, align, collision and force-mount/portal props.
- Dependencies: npm `@vueuse/core`, `reka-ui`; registry `@threadable/utils`.
- Threadable difference: retains source portal and class composition with Reka positioning rather than a regenerated implementation.
- Accessibility consideration: use a dialog or menu pattern when the content needs modal or command-menu semantics; a popover is not a universal overlay role.

### `radio-group`

- Import and usage: `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"`; provide a group label and one item label per value.
- Accessible text: the group needs a name/label and each radio needs visible text or an explicit accessible name.
- Keyboard: Tab enters the group, Arrow keys move and select radios, Space selects the focused radio; disabled items are skipped or unavailable.
- Props/events: root `modelValue`, `defaultValue`, `orientation`, `required`, `disabled`, `name`, `update:modelValue`; item `value`, `disabled` and Reka item props.
- Dependencies: npm `@lucide/vue`, `@vueuse/core`, `reka-ui`; registry `@threadable/utils`.
- Threadable difference: preserves the Threadable indicator, classes and forwarding around Reka radio primitives.
- Accessibility consideration: keep values unique, provide a group name and expose validation errors without making the group impossible to navigate.

### `separator`

- Import and usage: `import { Separator } from "@/components/ui/separator"`; use `<Separator orientation="horizontal" />` between related regions.
- Accessible text: decorative separators should remain decorative; semantic separators need an appropriate surrounding structure and should not be used as headings.
- Keyboard: not focusable or interactive.
- Props/events: Reka separator props such as `orientation`, `decorative` and `class`.
- Dependencies: npm `@vueuse/core`, `reka-ui`; registry `@threadable/utils`.
- Threadable difference: Threadable class and forwarding wrapper around Reka's separator.
- Accessibility consideration: avoid adding a separator where a native heading/list/table structure would communicate the relationship better.

### `sheet`

- Import and usage: `import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet"`; provide title, description where needed and a labelled close path.
- Accessible text: the sheet title is its accessible name; close controls and any form fields inside need names and error associations.
- Keyboard: trigger opens, focus enters and is trapped, Tab cycles, Escape closes and focus returns to the trigger; side changes do not change the required semantics.
- Props/events: root dialog `open`, `defaultOpen`, `modal`, `update:open`; `SheetContent` adds `side` (`top`, `right`, `bottom`, `left`) and forwards content events.
- Dependencies: npm `@lucide/vue`, `@vueuse/core`, `reka-ui`; registry `@threadable/utils`.
- Threadable difference: keeps the source sheet animation classes, side variants and dialog-based focus handling.
- Accessibility consideration: ensure the initial focus is useful and that the close control remains reachable at narrow widths and with zoom.

### `skeleton`

- Import and usage: `import { Skeleton } from "@/components/ui/skeleton"`; use it only as a placeholder for content that is loading.
- Accessible text: do not expose decorative skeleton shapes as meaningful content; pair loading state with an appropriate status or preserve the existing accessible name.
- Keyboard: not interactive.
- Props/events: `class` and normal element attributes.
- Dependencies: no npm dependency; registry `@threadable/utils`.
- Threadable difference: Threadable pulse class and data-slot are retained.
- Accessibility consideration: respect reduced motion and ensure users are informed when content becomes available; a skeleton is not a replacement for a status message.

### `stepper`

- Import and usage: `import { Stepper, StepperItem, StepperIndicator, StepperTitle, StepperTrigger } from "@/components/ui/stepper"`; label each step and expose the current step.
- Accessible text: each trigger/title needs meaningful step text; completed/current status must not be communicated only by colour or an icon.
- Keyboard: triggers follow the Reka stepper interaction, with Tab and activation preserving focus; verify Arrow-key behaviour when using a non-linear stepper.
- Props/events: root `modelValue`, `defaultValue`, `orientation`, `linear`, `update:modelValue`; item `step`; trigger and indicator forward Reka props.
- Dependencies: npm `reka-ui`; registry `@threadable/utils`.
- Threadable difference: source-specific indicator, separator and typography classes are kept around Reka's stepper primitives.
- Accessibility consideration: expose which step is current and whether completed steps are actionable; do not rely on a checkmark alone.

### `table`

- Import and usage: `import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableEmpty } from "@/components/ui/table"`; use native table structure and a caption when helpful.
- Accessible text: provide column headers, a caption or equivalent name, and meaningful empty-state text. Keep header/cell relationships valid.
- Keyboard: native table content is not generally focusable; interactive controls inside cells retain their own tab order.
- Props/events: wrappers forward class and element attributes; `TableEmpty` accepts `colspan` and slot content.
- Dependencies: npm `@vueuse/core`; registry `@threadable/utils`.
- Threadable difference: adds the `TableEmpty` composition and Threadable responsive/data-slot classes while preserving native table elements.
- Accessibility consideration: test responsive layouts to ensure the table remains understandable and that horizontal scrolling is available without trapping focus.

### `tabs`

- Import and usage: `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"`; give each trigger a unique value and matching content.
- Accessible text: tab labels must identify the panel; panels need meaningful content and should not be empty when selected.
- Keyboard: Tab enters the active tab, Arrow keys move tabs, Home/End jump, Enter/Space activates in manual mode, and selection updates the associated panel.
- Props/events: root `modelValue`, `defaultValue`, `orientation`, `activationMode`, `update:modelValue`; trigger `value`, `disabled`; content `value`, `forceMount`.
- Dependencies: npm `@vueuse/core`, `reka-ui`; registry `@threadable/utils`.
- Threadable difference: retains Threadable tab list/trigger classes and Reka roving-focus behaviour.
- Accessibility consideration: test automatic and manual activation with a screen reader and ensure hidden panels are not accidentally exposed.

### `textarea`

- Import and usage: `import { Textarea } from "@/components/ui/textarea"`; pair with an associated label and use `v-model` when controlled.
- Accessible text: provide a visible label or explicit accessible name, plus descriptions and error associations where relevant.
- Keyboard: native multiline editing and Tab navigation are preserved; do not intercept Enter unless the consuming form intentionally does so.
- Props/events: `modelValue`, `defaultValue`, native textarea attributes and `update:modelValue`; class is merged with Threadable styles.
- Dependencies: npm `@vueuse/core`; registry `@threadable/utils`.
- Threadable difference: uses passive VueUse model forwarding and Threadable invalid-state classes.
- Accessibility consideration: preserve resize/scroll access, use a suitable `rows` value and do not encode required instructions only in placeholder text.

### `tooltip`

- Import and usage: `import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"`; wrap a named trigger and provide concise supplemental text.
- Accessible text: the trigger must already have an accessible name; tooltip text is supplemental and must not be the only label for a control.
- Keyboard: focus and hover open the tooltip according to provider settings; Escape dismisses where supported; the trigger remains keyboard reachable.
- Props/events: root `open`, `defaultOpen`, `delayDuration`, `disableClosingTrigger`, `update:open`; provider `delayDuration`/skip-delay settings; content side/align/positioning props.
- Dependencies: npm `@vueuse/core`, `reka-ui`; registry `@threadable/utils`.
- Threadable difference: retains the source provider defaults and portal/content classes around Reka tooltip primitives.
- Accessibility consideration: keep essential instructions visible or otherwise available; test touch and keyboard because hover-only content is not sufficient.

### `badge`

- Import and usage: `import { Badge } from "@/components/ui/badge"`; use `<Badge>New</Badge>` for a short status or category.
- Accessible text: status text must be meaningful; decorative badges should not be the only indication of state.
- Keyboard: not interactive by default. If rendered as another element, preserve that element's semantics.
- Props/events: `variant` (`default`, `secondary`, `destructive`, `outline`, `ghost`, `link`) and Reka primitive/`as` props.
- Dependencies: npm `@vueuse/core`, `class-variance-authority`, `reka-ui`; registry `@threadable/utils`.
- Threadable difference: Threadable variants and data-slot styling are retained; it is not a drop-in guarantee for the current upstream badge API.
- Accessibility consideration: use text or an accessible status, not colour alone, to communicate meaning.

### `button-block`

- Import and usage: `import { ButtonBlock } from "@/components/ui/button-block"`; use `<ButtonBlock label="Save changes" @click="save" />`.
- Accessible text: use `label`, slot content or `ariaLabel`; provide `description` when instructions are needed. Processing must have a meaningful surrounding status if it changes the task duration.
- Keyboard: native button Enter/Space activation; disabled and `processing` states cannot activate; focus remains on the button.
- Props/events: `label`, `description`, `type`, `id`, `processing`, `disabled`, `variant`, `size`, `showError`, `showGap`, `buttonClass`, `ariaLabel`, `ariaDescribedBy`, `dataTest`; emits `click`; `icon` and default/description slots.
- Dependencies: npm `@lucide/vue`, `reka-ui`; registry `@threadable/button`, `@threadable/field`, `@threadable/utils`.
- Threadable difference: Threadable form-aware wrapper with generated IDs, loading indicator, Field composition and explicit `aria-disabled`; no upstream equivalent.
- Accessibility consideration: provide an accessible name even when the visible content is icon-only and do not use `processing` as the only progress communication.

### `button-link-block`

- Import and usage: `import { ButtonLinkBlock } from "@/components/ui/button-link-block"`; use `<ButtonLinkBlock href="/orders" label="View orders" />`.
- Accessible text: `label` is required and may be overridden by `ariaLabel`; descriptions should be provided through `description` or the slot.
- Keyboard: the Inertia link remains keyboard reachable and activates with Enter; `disabled`/`processing` prevent pointer activation and expose `aria-disabled`, but consumers should not treat a disabled link as a native disabled button.
- Props/events: `href`, `label`, `description`, `id`, `processing`, `disabled`, `variant`, `size`, `ariaLabel`, `buttonClass`, `dataTest`; icon/default/description slots. Link navigation events come from Inertia.
- Dependencies: npm `@inertiajs/vue3`, `@lucide/vue`, `reka-ui`; registry `@threadable/button`, `@threadable/field`, `@threadable/utils`.
- Threadable difference: Inertia link wrapped in Threadable button/field styling; no upstream shadcn-vue equivalent.
- Accessibility consideration: use a real button for an in-page action and a link for navigation; verify disabled-link focus and announcement in the target screen reader.

### `card-block`

- Import and usage: `import { CardBlock, CardBlockFooter } from "@/components/ui/card-block"`; place a heading, content and optional footer in the card slots.
- Accessible text: cards should have a heading or other clear context when they form a meaningful region; do not make an entire card clickable without a named interactive element.
- Keyboard: not interactive by itself; controls in the card keep normal tab order.
- Props/events: `variant` (`default`, `datatable-mobile`, `bordered-orange`, `checkout`, `summary`, `destructive`) and class/element attributes; slots for content/footer.
- Dependencies: npm `@vueuse/core`, `class-variance-authority`, `reka-ui`; registry `@threadable/utils`.
- Threadable difference: application-informed but reusable layout variants; no direct upstream block equivalent.
- Accessibility consideration: check reading order and contrast for each variant, especially `summary` and `destructive` backgrounds.

### `checkbox-block`

- Import and usage: `import { CheckboxBlock } from "@/components/ui/checkbox-block"`; use `<CheckboxBlock item-label="Email updates" item-value="email" v-model="selected" />`.
- Accessible text: `itemLabel` is the visible label; provide `label`, `description`, `error` and `required` where applicable. `CheckboxGroupBlock` accepts `items` and maps `itemKey`, `itemLabel`, `itemValue`.
- Keyboard: Space toggles each checkbox; labels activate their associated controls; disabled/processing items do not toggle.
- Props/events: `itemLabel`, `itemValue`, `modelValue`, `error`, `description`, `id`, `disabled`, `required`, `showError`, `checkboxPosition`; group props include `items`, `itemKey`, `itemLabel`, `itemValue`, `processing`, `itemDataTestPrefix`; emits `update:modelValue`.
- Dependencies: npm `reka-ui`; registry `@threadable/checkbox`, `@threadable/field`, `@threadable/label`, `@threadable/utils`. The field primitive files are included transitively by `field`.
- Threadable difference: field-aware checkbox and group wrappers with generated IDs, required text and error rendering; `CheckboxGroupBlock.vue` is an owned support file even though the source index does not export it.
- Accessibility consideration: keep item labels unique and meaningful; validate group-level error association and do not rely on position or checkbox colour alone.

### `combobox-group-block`

- Import and usage: `import { ComboboxGroupBlock } from "@/components/ui/combobox-group-block"`; pass grouped `{ group, items: [{ value, name }] }` data and bind `v-model`.
- Accessible text: provide `label` or `ariaLabel`, a meaningful `placeholder`, group names and error/description text; the selected value is included in the trigger name.
- Keyboard: button opens with Enter/Space, the command input receives focus, Arrow keys move results, Enter selects, Escape closes and focus returns to the trigger.
- Props/events: `groups`, required `name`, `modelValue`, `defaultValue`, `label`, `ariaLabel`, `placeholder`, `description`, `error`, `disabled`, `processing`, `required`, `showError`, `id`, `dataTest`; emits `update:modelValue` and open state via internal popover.
- Dependencies: npm `@lucide/vue`, `@vueuse/core`, `reka-ui`; registry `@threadable/button`, `@threadable/command`, `@threadable/field`, `@threadable/popover`, `@threadable/utils`.
- Threadable difference: Threadable field/command/popover composition with width matching and explicit accessible trigger naming; no direct upstream block equivalent.
- Accessibility consideration: keep group and item names stable while filtering and test the portal list with a screen reader at narrow widths.

### `confirm-dialog-block`

- Import and usage: `import { ConfirmDialogBlock } from "@/components/ui/confirm-dialog-block"`; use `<ConfirmDialogBlock :open="open" description="Delete this record?" @confirm="remove" @cancel="open = false" />`.
- Accessible text: supply a specific `description`; customise `title`, `cancelLabel` and `actionLabel` when defaults are not appropriate.
- Keyboard: alert-dialog focus trapping, Escape/cancel dismissal and restoration are inherited; Enter/Space activates the focused action.
- Props/events: `open`, `title`, required `description`, `descriptionClass`, `cancelLabel`, `actionLabel`, `actionVariant`, `dataTest`; emits `confirm` and `cancel`.
- Dependencies: no direct npm dependency; registry `@threadable/alert-dialog`.
- Threadable difference: Threadable opinionated wrapper with default labels and a confirm/cancel API; no upstream block equivalent.
- Accessibility consideration: make the destructive consequence explicit in the title/description and keep action labels specific rather than generic where risk is high.

### `datatable-search`

- Import and usage: `import { DataTableSearch } from "@/components/ui/datatable-search"`; use `<DataTableSearch v-model="query" description="Filter results" />`.
- Accessible text: the consuming layout should provide a visible label or a surrounding accessible name; `placeholder` defaults to `Search` and is not a replacement for a label.
- Keyboard: native input editing and Tab navigation; filtering timing is controlled by the parent.
- Props/events: `modelValue`, `placeholder`, `id`, `description`, `class`; emits `update:modelValue` through `defineModel`.
- Dependencies: npm `@lucide/vue`; registry `@threadable/field`, `@threadable/input`, `@threadable/input-group`, `@threadable/utils`.
- Threadable difference: Threadable data-table companion with generated ID, field description and fixed test hook; no upstream block equivalent.
- Accessibility consideration: announce result-count changes in the parent and preserve the field/error relationship if search validation exists.

### `datatable`

- Import and usage: `import { DataTable } from "@/components/ui/datatable"`; provide typed TanStack `columns`, data and the documented pagination/filter inputs.
- Accessible text: supply meaningful column headers, empty/loading text and labels for search, pagination and page-size controls. Ensure row actions have names.
- Keyboard: native table controls, select, pagination and buttons retain their keyboard behaviour; tab order must follow the visual/data order.
- Props/events: generic `TData, TValue`; important inputs include `columns`, `data`, `filter`, `processing`, `pagination`, page sizes and table state; emits update events defined by the source table API. See the source file for the complete generic interface.
- Dependencies: npm `@tanstack/vue-table@^8.21.3`, `@vueuse/core`; registry `@threadable/card-block`, `@threadable/loading-spinner`, `@threadable/no-result-icon`, `@threadable/pagination`, `@threadable/select`, `@threadable/table`, `@threadable/typography`, `@threadable/utils`. Pagination and select implementation files are included by the public wrapper items.
- Threadable difference: Threadable data-table block with mobile card treatment, source page-size defaults, loading and empty states; no direct upstream shadcn-vue equivalent.
- Accessibility consideration: test both table and mobile presentations, preserve header context, announce filtering/pagination changes and avoid using row colour alone for state.

### `dropdown-menu-block`

- Import and usage: `import { DropdownMenuBlock, DropdownMenuItemBlock } from "@/components/ui/dropdown-menu-block"`; use the block as a small action menu with explicit item labels.
- Accessible text: provide a named trigger and action-oriented labels. Icons must be decorative unless they convey additional text.
- Keyboard: follows dropdown menu Enter/Space, Arrow-key, submenu and Escape behaviour; disabled items do not activate.
- Props/events: `DropdownMenuBlock` accepts `items`, `label`, `ariaLabel`, `disabled`, `variant` and trigger attributes from its source interface; `DropdownMenuItemBlock` accepts item/label/action props and click behaviour. Check the exact source interface when using advanced slots.
- Dependencies: npm `@lucide/vue`; registry `@threadable/button`, `@threadable/dropdown-menu`, `@threadable/utils`.
- Threadable difference: small Threadable action-menu wrapper; no upstream block equivalent.
- Accessibility consideration: ensure the menu remains operable when actions are disabled or unavailable and that labels describe outcomes.

### `field`

- Import and usage: `import { Field } from "@/components/ui/field"`; use `<Field id="email" label="Email" description="Work address" error="Required"><Input id="email" /></Field>`.
- Accessible text: `label`, `description` and `error` are optional by API but should be supplied when the control needs them; child IDs must match generated/explicit field IDs.
- Keyboard: the wrapper adds no interaction; child control behaviour is preserved.
- Props/events: `id`, `label`, `labelId`, `description`, `descriptionId`, `error`, `errorId`, `showError`, `showGap`, `required`, `class`; named `description` slot.
- Dependencies: npm `@vueuse/core`, `class-variance-authority`, `reka-ui`; registry `@threadable/separator`, `@threadable/utils`. The low-level field and label files are bundled with this item.
- Threadable difference: Threadable field wrapper generates IDs and renders error content with `role="alert"`; its low-level implementation files are bundled so consumers install `field`, not a separate primitive item.
- Accessibility consideration: do not pass an error string as an ID; use `errorId` for the element ID and keep error content separate from the message value.

### `help`

- Import and usage: `import { Help } from "@/components/ui/help"`; wrap a named control or short label and provide `tooltip` text.
- Accessible text: the wrapped content must already have a name; `tooltip` is supplemental and should be concise.
- Keyboard: the tooltip trigger is focusable according to its child; focus/hover opens and Escape/dismissal follows the tooltip primitive.
- Props/events: required `side` and `tooltip`, optional `class`, default slot.
- Dependencies: npm `@lucide/vue`; registry `@threadable/tooltip`, `@threadable/utils`.
- Threadable difference: Threadable Info-icon tooltip wrapper with a fixed content width; no upstream block equivalent.
- Accessibility consideration: do not put essential instructions only in the tooltip and test the wrapper when the slotted child is a button, link or input.

### `info`

- Import and usage: `import { Info } from "@/components/ui/info"`; use `<Info message="Saved" />` or the destructive variant for an important message.
- Accessible text: `message` is the visible content; pass a complete message rather than relying on the icon. If used as a status/alert, choose the surrounding live-region semantics deliberately.
- Keyboard: not interactive by default.
- Props/events: required `message` (null hides it), `variant` (`default`/`destructive`), `size` and primitive/class attributes.
- Dependencies: npm `@lucide/vue`, `class-variance-authority`, `reka-ui`; registry `@threadable/utils`.
- Threadable difference: Threadable icon/message variants and source import repair are retained; it is not an upstream shadcn-vue item.
- Accessibility consideration: choose `role="status"` or `role="alert"` in the consuming context only when the message timing warrants it; the component itself does not promise live announcements.

### `input-block`

- Import and usage: `import { InputBlock } from "@/components/ui/input-block"`; use `<InputBlock name="email" label="Email" v-model="email" />`.
- Accessible text: provide `name` and preferably `label`; add `description`, `error`, `required`, `autocomplete` and a useful `type` as appropriate.
- Keyboard: native input typing and Tab; disabled/processing controls cannot be edited.
- Props/events: `name`, `modelValue`, `label`, `description`, `error`, `type`, `inputmode`, `id`, `placeholder`, `processing`, `disabled`, `showError`, `showGap`, `maxlength`, `autocomplete`, `required`, `dataTest`; emits `update:modelValue`; description slot.
- Dependencies: npm `reka-ui`; registry `@threadable/field`, `@threadable/input`, `@threadable/utils`.
- Threadable difference: form-aware wrapper with generated label/description/error IDs, `aria-*` wiring and processing state; no upstream block equivalent.
- Accessibility consideration: inspect the resulting accessible name and description, especially when `label` is omitted, and ensure errors explain recovery.

### `label`

- Import and usage: `import { Label } from "@/components/ui/label"`; use `<Label for="name">Name</Label>`.
- Accessible text: slot content is the label; `for` or `id` must identify the intended control.
- Keyboard: native label activation is preserved and the label is not a separate tab stop.
- Props/events: `for`, `id`, `label` and inherited attributes; the `label` prop is retained for API compatibility while slot content is rendered.
- Dependencies: npm `@vueuse/core`, `reka-ui`; registry `@threadable/utils`. The low-level label files are bundled with this item.
- Threadable difference: thin customized wrapper around the bundled label primitive with the source `for`/`id` behaviour.
- Accessibility consideration: avoid duplicate labels and confirm the generated/explicit ID remains unique when repeated in a list.

### `loading-spinner`

- Import and usage: import the direct component from `@/components/ui/loading-spinner/LoadingSpinner.vue` or use the item where the consuming CLI preserves the source file path.
- Accessible text: pair with visible or visually hidden loading text/status; the spinner alone is decorative.
- Keyboard: not interactive.
- Props/events: source component has no documented custom props/events; normal attributes may be forwarded only as supported by the file.
- Dependencies: no npm or registry dependency.
- Threadable difference: direct source component moved into a stable registry item directory; the component file API is unchanged.
- Accessibility consideration: provide a status update for asynchronous work and respect the consuming application's reduced-motion CSS.

### `no-result-icon`

- Import and usage: use the direct file import preserved by the data table item or `@/components/ui/no-result-icon/NoResultIcon.vue`.
- Accessible text: decorative icon should be `aria-hidden`; the surrounding empty state must contain meaningful text.
- Keyboard: not interactive.
- Props/events: no custom API is documented.
- Dependencies: no npm or registry dependency.
- Threadable difference: shared support icon extracted as its own stable item because the data table source imported it outside the customized component directory.
- Accessibility consideration: never use the icon as the only empty-state explanation.

### `pagination`

- Import and usage: `import { PaginationNext, PaginationPrevious } from "@/components/ui/pagination"`; use them with the bundled pagination primitives and clear labels.
- Accessible text: the rendered previous/next controls need meaningful accessible names and a named surrounding navigation.
- Keyboard: native button/link activation and pagination focus behaviour are inherited from the bundled pagination primitives.
- Props/events: Reka `PaginationNextProps`/`PaginationPrevProps`, `size`, class and disabled/aria attributes.
- Dependencies: npm `@lucide/vue`, `@vueuse/core`, `reka-ui`; registry `@threadable/button`, `@threadable/utils`. The low-level pagination files are bundled with this item.
- Threadable difference: customized icon buttons with Threadable button variants; no direct upstream block equivalent.
- Accessibility consideration: consider announcing page changes and do not disable the only way to reach more content without an alternative.

### `radio-block`

- Import and usage: `import { RadioGroupBlock, RadioGroupBlockItem } from "@/components/ui/radio-block"`; pass `items` and bind `v-model`.
- Accessible text: `label`, `description`, `itemLabel` and optional `itemAriaLabel` supply the group/item names; `error` and `required` describe validation.
- Keyboard: group Arrow-key navigation and selection come from the radio primitive; labels activate items; disabled/processing items do not select.
- Props/events: group `items`, `modelValue`, `itemKey`, `itemLabel`, `itemValue`, `itemAriaLabel`, `label`, `description`, `error`, `disabled`, `processing`, `required`, `showError`; item adds `verticalAlign`, `itemValue`, `itemLabel`; item emits `select`.
- Dependencies: npm `reka-ui`; registry `@threadable/field`, `@threadable/label`, `@threadable/radio-group`, `@threadable/utils`.
- Threadable difference: field-aware data-driven radio wrappers with custom visible/assistive label handling; no upstream block equivalent.
- Accessibility consideration: keep the accessible label and visible label consistent unless the difference is intentional and tested with a screen reader.

### `search`

- Import and usage: `import { Search } from "@/components/ui/search"`; use `<Search placeholder="Search orders" v-model="query" />`.
- Accessible text: provide a meaningful placeholder plus a visible label or surrounding accessible name; the search icon is decorative.
- Keyboard: native input editing and Tab navigation.
- Props/events: required `placeholder`, `modelValue`; emits `update:modelValue`.
- Dependencies: npm `@lucide/vue`; registry `@threadable/input-group`.
- Threadable difference: compact Threadable search composition with a fixed icon addon; no upstream block equivalent.
- Accessibility consideration: add a search landmark/label at the page level when multiple search fields exist.

### `select`

- Import and usage: `import { Select } from "@/components/ui/select"`; use the `items` slot to provide `SelectItem` children from the bundled select primitives.
- Accessible text: pass a meaningful `placeholder` and `ariaLabel` or provide an external label linked to `id`; item text must be understandable.
- Keyboard: inherits select open, Arrow-key, Enter, Escape and focus-restoration behaviour.
- Props/events: required `placeholder`, `modelValue`, `id`, `ariaLabel`, `triggerClass`, `class`; `icon` and `items` slots; emits `update:modelValue`.
- Dependencies: npm `@lucide/vue`, `@vueuse/core`, `reka-ui`; registry `@threadable/utils`. The low-level select files are bundled with this item.
- Threadable difference: thin Threadable wrapper that owns the trigger layout and item slot while retaining the base primitive API.
- Accessibility consideration: test the trigger name both before and after selection and do not omit a label when the placeholder disappears.

### `select-block`

- Import and usage: `import { SelectBlock } from "@/components/ui/select-block"`; provide `name`, `items` and bind `v-model`.
- Accessible text: provide `label` or `ariaLabel`, meaningful `placeholder`, item `name`, optional assistive labels/languages, description and error text.
- Keyboard: trigger opens with Enter/Space/Arrow keys; Arrow keys navigate, Enter selects, Escape closes and focus returns to the trigger.
- Props/events: `name`, `modelValue`, `items`, `defaultValue`, `label`, `ariaLabel`, `placeholder`, `multiple`, `allOptionShow`, `allOptionValue`, `allOptionLabel`, `processing`, `disabled`, `showError`, `fitContentToTrigger`, `contentClass`, `required`, `error`, `description`, `id`; icon slot and `update:modelValue`.
- Dependencies: npm `reka-ui`; registry `@threadable/select`, `@threadable/field`, `@threadable/utils`.
- Threadable difference: form-aware data-driven select with all-option, language and assistive-label support; no upstream block equivalent.
- Accessibility consideration: ensure generated error/description IDs are referenced by the trigger and test single/multiple selections with a screen reader.

### `select-group-block`

- Import and usage: `import { SelectGroupBlock } from "@/components/ui/select-group-block"`; pass grouped `{ group, items }` data and a required `name`.
- Accessible text: supply `label`, `description`, `placeholder`, group names and item names; use `required`/`error` when validation applies.
- Keyboard: same select interaction, with group labels announced as non-selectable context.
- Props/events: `items`, `name`, `modelValue`, `defaultValue`, `label`, `description`, `placeholder`, `multiple`, `id`, `processing`, `disabled`, `showError`, `required`, `error`, `dataTest`; icon slot and `update:modelValue`.
- Dependencies: npm `reka-ui`; registry `@threadable/select`, `@threadable/field`, `@threadable/utils`.
- Threadable difference: grouped, field-aware Threadable select wrapper around the renamed base primitive.
- Accessibility consideration: group labels must not be the only indication of the selected item; test the portal and error relationship.

### `sheet-block`

- Import and usage: `import { SheetBlock } from "@/components/ui/sheet-block"`; pass `open`, `title`/`description` and `content`/`footer` slots.
- Accessible text: `title` names the sheet; `titleAriaLabel`/`descriptionAriaLabel` provide explicit alternatives; the close button has a built-in accessible name.
- Keyboard: modal sheet focus trapping, Escape dismissal and restoration are inherited; the block focuses its header when opening when a header is present.
- Props/events: `open`, `side`, `customClass`, `title`, `titleAriaLabel`, `description`, `descriptionAriaLabel`, `icon`, `isForm`, `formBind`, `dataTest`; emits `update:open` and `formSuccess`; `content`/`footer` scoped slots receive processing/errors/isDirty.
- Dependencies: npm `@inertiajs/vue3`, `reka-ui`; registry `@threadable/sheet`.
- Threadable difference: Inertia-aware form/non-form sheet with scoped slots and explicit header focus; no upstream block equivalent.
- Accessibility consideration: provide a title even when visual design hides it, keep the close control reachable and review the focus choice for content-heavy sheets.

### `sheet-content-block`

- Import and usage: `import { SheetContentBlock } from "@/components/ui/sheet-content-block"`; use inside a `Sheet` when a lower-level content panel with a custom overlay is needed.
- Accessible text: parent sheet content still needs a title/description and a labelled close control.
- Keyboard: inherits dialog focus trapping, Escape dismissal and focus restoration from Reka `DialogContent`.
- Props/events: Reka `DialogContentProps`/events plus `side`, `class`, `overlayClass`; `side` defaults to `right`.
- Dependencies: npm `@vueuse/core`, `reka-ui`; registry `@threadable/sheet`, `@threadable/utils`.
- Threadable difference: lower-level Threadable overlay/content block for custom sheet composition; no upstream block equivalent.
- Accessibility consideration: verify that custom overlays do not obscure focus or reduce contrast and that the parent supplies the required dialog name.

### `skeleton-block`

- Import and usage: `import { SkeletonBlock } from "@/components/ui/skeleton-block"`; use `<SkeletonBlock :rows="3" :lines="['w-full', 'w-2/3']" />` while content loads.
- Accessible text: pair with a loading status; skeleton shapes are decorative.
- Keyboard: not interactive.
- Props/events: `rows` (default `3`), `lines` (default width classes), `showSeparator` (default `true`).
- Dependencies: no npm dependency; registry `@threadable/separator`, `@threadable/skeleton`.
- Threadable difference: reusable multi-row placeholder with source spacing/separator behaviour; no upstream block equivalent.
- Accessibility consideration: do not leave a skeleton indefinitely without status or error feedback and respect reduced motion.

### `stepper-block`

- Import and usage: `import { StepperBlock } from "@/components/ui/stepper-block"`; pass `steps: [{ value: 1, title: "Details" }]` and `currentStep`.
- Accessible text: each step needs a meaningful `title`; current/completed state needs text or semantics beyond colour/check icon.
- Keyboard: step triggers preserve the base stepper's focus and activation behaviour; verify whether prior steps are intended to be selectable.
- Props/events: required `steps` (`value`, `title`) and `currentStep`; no custom emitted events.
- Dependencies: npm `@lucide/vue`; registry `@threadable/stepper`.
- Threadable difference: opinionated responsive step indicator with hidden mobile titles and Threadable current/completed classes; no upstream block equivalent.
- Accessibility consideration: ensure the current step is announced and that hiding titles on mobile does not remove the accessible step names.

### `tabs-select`

- Import and usage: direct import `import TabsSelect from "@/components/ui/tabs-select/TabsSelect.vue"`; pass `tabs` and bind `v-model`.
- Accessible text: pass `tabs` with meaningful `label`s and `selectAriaLabel` when the mobile select needs a custom name.
- Keyboard: desktop uses tabs with Arrow/Home/End behaviour; mobile uses select keyboard behaviour. `activationMode` controls automatic/manual desktop activation.
- Props/events: required `tabs: { value, label }[]`; `defaultValue`, `modelValue`, `activationMode`, `selectAriaLabel` and class overrides; emits `update:modelValue`.
- Dependencies: no direct npm dependency; registry `@threadable/select`, `@threadable/tabs`, `@threadable/utils`.
- Threadable difference: responsive select-on-mobile/tabs-on-desktop composition with source-specific classes; no upstream block equivalent.
- Accessibility consideration: verify the two presentations expose one coherent selected value and do not duplicate controls in the accessibility tree at a breakpoint.

### `text-link-block`

- Import and usage: `import { TextLinkBlock } from "@/components/ui/text-link-block"`; use `<TextLinkBlock href="/account">Account settings</TextLinkBlock>`.
- Accessible text: link text must describe destination; `ariaLabel` should clarify only when visible text is insufficient.
- Keyboard: Inertia link activates with Enter and remains in logical tab order; `tabindex` can be overridden deliberately.
- Props/events: required `href`; `tabindex`, `method`, `as`, `id`, `variant` (`default`, `card-footer`), `ariaLabel`; Inertia link events/props are forwarded.
- Dependencies: npm `@inertiajs/core`, `@inertiajs/vue3`, `class-variance-authority`, `reka-ui`; registry `@threadable/utils`.
- Threadable difference: Inertia-aware styled link with Threadable variants; no upstream block equivalent.
- Accessibility consideration: use links for navigation, preserve visible focus and avoid an aria-label that hides more descriptive visible text.

### `textarea-block`

- Import and usage: `import { TextareaBlock } from "@/components/ui/textarea-block"`; use `<TextareaBlock name="notes" label="Notes" v-model="notes" />`.
- Accessible text: provide `name`, `label` or another name, `description`, `error`, `required`, `rows` and a useful `placeholder` only as supplemental guidance.
- Keyboard: native multiline editing; disabled/processing prevents editing and Tab leaves the field normally.
- Props/events: `name`, `modelValue`, `label`, `description`, `error`, `placeholder`, `id`, `processing`, `disabled`, `showError`, `maxLength`, `rows`, `required`, `dataTest`; emits `update:modelValue`; description slot.
- Dependencies: npm `reka-ui`; registry `@threadable/field`, `@threadable/textarea`, `@threadable/utils`.
- Threadable difference: field-aware wrapper with generated IDs and explicit label/description/error ARIA wiring; no upstream block equivalent.
- Accessibility consideration: verify `aria-describedby` when both description and error exist and ensure error text is recoverable, not merely announced.

### `typeahead-input`

- Import and usage: `import { TypeaheadInput } from "@/components/ui/typeahead-input"`; pass `suggestions`, bind `modelValue` and implement `select`/`enter`.
- Accessible text: provide `placeholder` plus an external label or `aria-label`, loading text, no-results text and meaningful suggestion values.
- Keyboard: focus opens after the configured character threshold, ArrowDown/ArrowUp move, Enter selects the active/first result, Escape closes, and blur closes after the source delay.
- Props/events: required `modelValue` and `suggestions`; `loading`, `disabled`, `error`, `id`, `name`, `placeholder`, `autocomplete`, `minCharsToShowOnFocus`, `loadingText`, `noResultsText`, `open`, `itemKey`, `maxlength`, `getSuggestionValue`, `required`; emits `update:modelValue`, `input`, `enter`, `select`, `focus`, `blur`, `update:open`.
- Dependencies: no npm dependency; registry `@threadable/input`, `@threadable/use-typeahead-keyboard`, `@threadable/utils`.
- Threadable difference: Threadable-only typeahead implementation with explicit event payloads, configurable item keys and source keyboard helper.
- Accessibility consideration: expose the active suggestion and loading/empty state, keep input focus while navigating and test rapid async updates without losing the user's typed value.

### `typography`

- Import and usage: `import { H1Block, H2Block, H3Block, H4Block, H5Block, H6Block, OrderedListBlock, PBlock } from "@/components/ui/typography"`; use the heading level that matches document structure.
- Accessible text: heading text must be meaningful and levels should not be chosen only for visual size. Ordered lists need list item content.
- Keyboard: not interactive unless a consumer composes an interactive child.
- Props/events: heading and paragraph blocks support `variant` (`default`, `ghost`, `link`), primitive/class attributes and slots; `OrderedListBlock` accepts list attributes and slot content. Variant helpers `h1Variants` through `h6Variants` and `pVariants` are exported.
- Dependencies: npm `class-variance-authority`, `reka-ui`; registry `@threadable/utils`.
- Threadable difference: Threadable typography components and variant helpers, including fixed semantic heading levels; no direct upstream block equivalent.
- Accessibility consideration: preserve heading hierarchy, avoid link-like styling without link semantics and check text contrast in every variant.

### `accordion`

- Import and usage: `import { Accordion } from "@/components/ui/accordion"`; use `<Accordion>Content</Accordion>`.
- Required accessible text: Give interactive parts a meaningful accessible name; placeholder text is supplemental, not a label.
- Keyboard behaviour: Enter/Space toggles a trigger; Arrow keys move between triggers where supported.
- Important props and events: Use the exported props, slots and documented model/value update or action events; preserve each component's native attributes.
- Dependencies: npm @lucide/vue, @vueuse/core, reka-ui; registry none.
- Differences from upstream shadcn-vue: The implementation follows the current upstream component source; only registry-local import paths and consumer alias rewrites differ.
- Known accessibility considerations: Verify names, focus visibility, state announcements, contrast and content-specific semantics in the consuming application; automated tests are regression safeguards, not conformance evidence.

### `card`

- Import and usage: `import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"`; use a heading and structured content inside `<Card>`.
- Required accessible text: Give each card a meaningful heading when it represents a distinct region; use real buttons or links for actions.
- Keyboard behaviour: Not interactive by itself; composed controls retain their native keyboard behaviour.
- Important props and events: Structural components accept `class`, attributes and slots; actions belong in the header/footer slots.
- Dependencies: npm none; registry `utils`.
- Differences from upstream shadcn-vue: Current upstream card source with registry-local utility imports.
- Known accessibility considerations: Preserve heading hierarchy and ensure card actions are discoverable independently of colour or position.

### `spinner`

- Import and usage: `import { Spinner } from "@/components/ui/spinner"`; use `<Spinner aria-label="Loading results" />` beside a loading message when appropriate.
- Required accessible text: Keep the loading status name meaningful; provide visible status text when loading is important.
- Keyboard behaviour: Not interactive.
- Important props and events: Accepts native SVG attributes and `class`; it has no value or action events.
- Dependencies: npm `@lucide/vue`; registry `utils`.
- Differences from upstream shadcn-vue: Current upstream spinner source with registry-local utility imports.
- Known accessibility considerations: Do not use animation as the only status cue; respect reduced-motion preferences in the consuming application.

### `alert`

- Import and usage: `import { Alert } from "@/components/ui/alert"`; use `<Alert>Content</Alert>`.
- Required accessible text: Give interactive parts a meaningful accessible name; placeholder text is supplemental, not a label.
- Keyboard behaviour: Not interactive; the rendered alert role and message importance determine announcement behaviour.
- Important props and events: Use the exported props, slots and documented model/value update or action events; preserve each component's native attributes.
- Dependencies: npm class-variance-authority; registry none.
- Differences from upstream shadcn-vue: The implementation follows the current upstream component source; only registry-local import paths and consumer alias rewrites differ.
- Known accessibility considerations: Verify names, focus visibility, state announcements, contrast and content-specific semantics in the consuming application; automated tests are regression safeguards, not conformance evidence.

### `aspect-ratio`

- Import and usage: `import { AspectRatio } from "@/components/ui/aspect-ratio"`; use `<AspectRatio>Content</AspectRatio>`.
- Required accessible text: Give interactive parts a meaningful accessible name; placeholder text is supplemental, not a label.
- Keyboard behaviour: Not interactive; it constrains layout dimensions.
- Important props and events: Use the exported props, slots and documented model/value update or action events; preserve each component's native attributes.
- Dependencies: npm reka-ui; registry none.
- Differences from upstream shadcn-vue: The implementation follows the current upstream component source; only registry-local import paths and consumer alias rewrites differ.
- Known accessibility considerations: Verify names, focus visibility, state announcements, contrast and content-specific semantics in the consuming application; automated tests are regression safeguards, not conformance evidence.

### `attachment`

- Import and usage: `import { Attachment } from "@/components/ui/attachment"`; use `<Attachment>Content</Attachment>`.
- Required accessible text: Give interactive parts a meaningful accessible name; placeholder text is supplemental, not a label.
- Keyboard behaviour: Keep file actions as real buttons and give the attachment and each action meaningful names.
- Important props and events: Use the exported props, slots and documented model/value update or action events; preserve each component's native attributes.
- Dependencies: npm class-variance-authority, reka-ui; registry none.
- Differences from upstream shadcn-vue: The implementation follows the current upstream component source; only registry-local import paths and consumer alias rewrites differ.
- Known accessibility considerations: Verify names, focus visibility, state announcements, contrast and content-specific semantics in the consuming application; automated tests are regression safeguards, not conformance evidence.

### `avatar`

- Import and usage: `import { Avatar } from "@/components/ui/avatar"`; use `<Avatar>Content</Avatar>`.
- Required accessible text: Give interactive parts a meaningful accessible name; placeholder text is supplemental, not a label.
- Keyboard behaviour: Not interactive; image alt text identifies the subject and fallback text remains meaningful.
- Important props and events: Use the exported props, slots and documented model/value update or action events; preserve each component's native attributes.
- Dependencies: npm @vueuse/core, reka-ui; registry none.
- Differences from upstream shadcn-vue: The implementation follows the current upstream component source; only registry-local import paths and consumer alias rewrites differ.
- Known accessibility considerations: Verify names, focus visibility, state announcements, contrast and content-specific semantics in the consuming application; automated tests are regression safeguards, not conformance evidence.

### `breadcrumb`

- Import and usage: `import { Breadcrumb } from "@/components/ui/breadcrumb"`; use `<Breadcrumb>Content</Breadcrumb>`.
- Required accessible text: Give interactive parts a meaningful accessible name; placeholder text is supplemental, not a label.
- Keyboard behaviour: Links activate with Enter and the current page is exposed as current.
- Important props and events: Use the exported props, slots and documented model/value update or action events; preserve each component's native attributes.
- Dependencies: npm @lucide/vue, reka-ui; registry none.
- Differences from upstream shadcn-vue: The implementation follows the current upstream component source; only registry-local import paths and consumer alias rewrites differ.
- Known accessibility considerations: Verify names, focus visibility, state announcements, contrast and content-specific semantics in the consuming application; automated tests are regression safeguards, not conformance evidence.

### `bubble`

- Import and usage: `import { Bubble } from "@/components/ui/bubble"`; use `<Bubble>Content</Bubble>`.
- Required accessible text: Give interactive parts a meaningful accessible name; placeholder text is supplemental, not a label.
- Keyboard behaviour: Not interactive by default; keep author, message and reactions understandable without colour alone.
- Important props and events: Use the exported props, slots and documented model/value update or action events; preserve each component's native attributes.
- Dependencies: npm class-variance-authority, reka-ui; registry none.
- Differences from upstream shadcn-vue: The implementation follows the current upstream component source; only registry-local import paths and consumer alias rewrites differ.
- Known accessibility considerations: Verify names, focus visibility, state announcements, contrast and content-specific semantics in the consuming application; automated tests are regression safeguards, not conformance evidence.

### `button-group`

- Import and usage: `import { ButtonGroup } from "@/components/ui/button-group"`; use `<ButtonGroup>Content</ButtonGroup>`.
- Required accessible text: Give interactive parts a meaningful accessible name; placeholder text is supplemental, not a label.
- Keyboard behaviour: Buttons activate with Enter/Space and retain a predictable tab order; label the group when needed.
- Important props and events: Use the exported props, slots and documented model/value update or action events; preserve each component's native attributes.
- Dependencies: npm @vueuse/core, class-variance-authority, reka-ui; registry separator.
- Differences from upstream shadcn-vue: The implementation follows the current upstream component source; only registry-local import paths and consumer alias rewrites differ.
- Known accessibility considerations: Verify names, focus visibility, state announcements, contrast and content-specific semantics in the consuming application; automated tests are regression safeguards, not conformance evidence.

### `calendar`

- Import and usage: `import { Calendar } from "@/components/ui/calendar"`; use `<Calendar>Content</Calendar>`.
- Required accessible text: Provide a date-grid label and meaningful month/year context.
- Keyboard behaviour: Arrow keys move dates, Home/End move within a week, PageUp/PageDown change months, and Enter/Space selects.
- Important props and events: Use the exported props, slots and documented model/value update or action events; preserve each component's native attributes.
- Dependencies: npm @internationalized/date, @lucide/vue, @vueuse/core, reka-ui; registry native-select, button.
- Differences from upstream shadcn-vue: The implementation follows the current upstream component source; only registry-local import paths and consumer alias rewrites differ.
- Known accessibility considerations: Verify names, focus visibility, state announcements, contrast and content-specific semantics in the consuming application; automated tests are regression safeguards, not conformance evidence.

### `carousel`

- Import and usage: `import { Carousel } from "@/components/ui/carousel"`; use `<Carousel>Content</Carousel>`.
- Required accessible text: Give interactive parts a meaningful accessible name; placeholder text is supplemental, not a label.
- Keyboard behaviour: Previous/next controls activate with Enter/Space; provide a carousel label and do not rely on auto-rotation.
- Important props and events: Use the exported props, slots and documented model/value update or action events; preserve each component's native attributes.
- Dependencies: npm @lucide/vue, @vueuse/core, embla-carousel-vue; registry button.
- Differences from upstream shadcn-vue: The implementation follows the current upstream component source; only registry-local import paths and consumer alias rewrites differ.
- Known accessibility considerations: Verify names, focus visibility, state announcements, contrast and content-specific semantics in the consuming application; automated tests are regression safeguards, not conformance evidence.

### `chart`

- Import and usage: `import { Chart } from "@/components/ui/chart"`; use `<Chart>Content</Chart>`.
- Required accessible text: Give interactive parts a meaningful accessible name; placeholder text is supplemental, not a label.
- Keyboard behaviour: Not inherently interactive; provide a title, summary and data alternative for important information.
- Important props and events: Use the exported props, slots and documented model/value update or action events; preserve each component's native attributes.
- Dependencies: npm @unovis/vue, @vueuse/core, reka-ui; registry none.
- Differences from upstream shadcn-vue: The implementation follows the current upstream component source; only registry-local import paths and consumer alias rewrites differ.
- Known accessibility considerations: Verify names, focus visibility, state announcements, contrast and content-specific semantics in the consuming application; automated tests are regression safeguards, not conformance evidence.

### `collapsible`

- Import and usage: `import { Collapsible } from "@/components/ui/collapsible"`; use `<Collapsible>Content</Collapsible>`.
- Required accessible text: Give interactive parts a meaningful accessible name; placeholder text is supplemental, not a label.
- Keyboard behaviour: Enter/Space on the trigger toggles the region; the trigger needs a clear name.
- Important props and events: Use the exported props, slots and documented model/value update or action events; preserve each component's native attributes.
- Dependencies: npm reka-ui; registry none.
- Differences from upstream shadcn-vue: The implementation follows the current upstream component source; only registry-local import paths and consumer alias rewrites differ.
- Known accessibility considerations: Verify names, focus visibility, state announcements, contrast and content-specific semantics in the consuming application; automated tests are regression safeguards, not conformance evidence.

### `combobox`

- Import and usage: `import { Combobox } from "@/components/ui/combobox"`; use `<Combobox>Content</Combobox>`.
- Required accessible text: Give interactive parts a meaningful accessible name; placeholder text is supplemental, not a label.
- Keyboard behaviour: Type to filter, Arrow keys move options, Enter selects, and Escape closes the list.
- Important props and events: Use the exported props, slots and documented model/value update or action events; preserve each component's native attributes.
- Dependencies: npm @lucide/vue, @vueuse/core, reka-ui; registry none.
- Differences from upstream shadcn-vue: The implementation follows the current upstream component source; only registry-local import paths and consumer alias rewrites differ.
- Known accessibility considerations: Verify names, focus visibility, state announcements, contrast and content-specific semantics in the consuming application; automated tests are regression safeguards, not conformance evidence.

### `context-menu`

- Import and usage: `import { ContextMenu } from "@/components/ui/context-menu"`; use `<ContextMenu>Content</ContextMenu>`.
- Required accessible text: Give interactive parts a meaningful accessible name; placeholder text is supplemental, not a label.
- Keyboard behaviour: Open with the context-menu key or Shift+F10; Arrow keys move, Enter activates, and Escape closes.
- Important props and events: Use the exported props, slots and documented model/value update or action events; preserve each component's native attributes.
- Dependencies: npm @lucide/vue, @vueuse/core, reka-ui; registry none.
- Differences from upstream shadcn-vue: The implementation follows the current upstream component source; only registry-local import paths and consumer alias rewrites differ.
- Known accessibility considerations: Verify names, focus visibility, state announcements, contrast and content-specific semantics in the consuming application; automated tests are regression safeguards, not conformance evidence.

### `date-picker`

- Import and usage: `import { DatePicker } from "@/components/ui/date-picker"`; use `<DatePicker v-model="date" label="Event date" />`.
- Required accessible text: Give interactive parts a meaningful accessible name; placeholder text is supplemental, not a label.
- Keyboard behaviour: The trigger opens the popover; date navigation follows the calendar model, Escape closes and focus returns.
- Important props and events: Use the exported props, slots and documented model/value update or action events; preserve each component's native attributes.
- Dependencies: npm @internationalized/date, @lucide/vue; registry button, calendar, popover, utils.
- Differences from upstream shadcn-vue: A reusable Calendar + Popover composition; upstream documents Date Picker as a composition rather than a standalone registry item.
- Known accessibility considerations: Verify names, focus visibility, state announcements, contrast and content-specific semantics in the consuming application; automated tests are regression safeguards, not conformance evidence.

### `drawer`

- Import and usage: `import { Drawer } from "@/components/ui/drawer"`; use `<Drawer>Content</Drawer>`.
- Required accessible text: Give interactive parts a meaningful accessible name; placeholder text is supplemental, not a label.
- Keyboard behaviour: Focus enters the drawer, Tab is contained while open, Escape closes it, and focus returns to the trigger.
- Important props and events: Use the exported props, slots and documented model/value update or action events; preserve each component's native attributes.
- Dependencies: npm @vueuse/core, reka-ui; registry none.
- Differences from upstream shadcn-vue: The implementation follows the current upstream component source; only registry-local import paths and consumer alias rewrites differ.
- Known accessibility considerations: Verify names, focus visibility, state announcements, contrast and content-specific semantics in the consuming application; automated tests are regression safeguards, not conformance evidence.

### `empty`

- Import and usage: `import { Empty } from "@/components/ui/empty"`; use `<Empty>Content</Empty>`.
- Required accessible text: Give interactive parts a meaningful accessible name; placeholder text is supplemental, not a label.
- Keyboard behaviour: Not interactive by default; provide a useful title, explanation and named actions.
- Important props and events: Use the exported props, slots and documented model/value update or action events; preserve each component's native attributes.
- Dependencies: npm class-variance-authority; registry none.
- Differences from upstream shadcn-vue: The implementation follows the current upstream component source; only registry-local import paths and consumer alias rewrites differ.
- Known accessibility considerations: Verify names, focus visibility, state announcements, contrast and content-specific semantics in the consuming application; automated tests are regression safeguards, not conformance evidence.

### `form`

- Import and usage: `import { Form } from "@/components/ui/form"`; use `<Form>Content</Form>`.
- Required accessible text: Give every control a visible label or explicit accessible name, and provide useful validation text.
- Keyboard behaviour: Labels associate controls; invalid fields expose their error text through described-by relationships.
- Important props and events: Use the exported props, slots and documented model/value update or action events; preserve each component's native attributes.
- Dependencies: npm `reka-ui`, `vee-validate`; registry `@threadable/label`.
- Differences from upstream shadcn-vue: The implementation follows the current upstream component source; only registry-local import paths and consumer alias rewrites differ.
- Known accessibility considerations: Verify names, focus visibility, state announcements, contrast and content-specific semantics in the consuming application; automated tests are regression safeguards, not conformance evidence.

### `hover-card`

- Import and usage: `import { HoverCard } from "@/components/ui/hover-card"`; use `<HoverCard>Content</HoverCard>`.
- Required accessible text: Give interactive parts a meaningful accessible name; placeholder text is supplemental, not a label.
- Keyboard behaviour: Hover is not the only way to discover essential information; keyboard focus exposes the same non-essential content.
- Important props and events: Use the exported props, slots and documented model/value update or action events; preserve each component's native attributes.
- Dependencies: npm @vueuse/core, reka-ui; registry none.
- Differences from upstream shadcn-vue: The implementation follows the current upstream component source; only registry-local import paths and consumer alias rewrites differ.
- Known accessibility considerations: Verify names, focus visibility, state announcements, contrast and content-specific semantics in the consuming application; automated tests are regression safeguards, not conformance evidence.

### `input-otp`

- Import and usage: `import { InputOTP } from "@/components/ui/input-otp"`; use `<InputOTP aria-label="One-time password">Content</InputOTP>`.
- Required accessible text: Give interactive parts a meaningful accessible name; placeholder text is supplemental, not a label.
- Keyboard behaviour: Provide a label and instructions; digit navigation, editing and pasting must work by keyboard.
- Important props and events: Use the exported props, slots and documented model/value update or action events; preserve each component's native attributes.
- Dependencies: npm @lucide/vue, @vueuse/core, reka-ui, vue-input-otp; registry none.
- Differences from upstream shadcn-vue: The implementation follows the current upstream component source; only registry-local import paths and consumer alias rewrites differ.
- Known accessibility considerations: Verify names, focus visibility, state announcements, contrast and content-specific semantics in the consuming application; automated tests are regression safeguards, not conformance evidence.

### `item`

- Import and usage: `import { Item } from "@/components/ui/item"`; use `<Item>Content</Item>`.
- Required accessible text: Give interactive parts a meaningful accessible name; placeholder text is supplemental, not a label.
- Keyboard behaviour: Not interactive by default; if made interactive, use a native control or preserve its complete keyboard semantics.
- Important props and events: Use the exported props, slots and documented model/value update or action events; preserve each component's native attributes.
- Dependencies: npm class-variance-authority, reka-ui; registry separator.
- Differences from upstream shadcn-vue: The implementation follows the current upstream component source; only registry-local import paths and consumer alias rewrites differ.
- Known accessibility considerations: Verify names, focus visibility, state announcements, contrast and content-specific semantics in the consuming application; automated tests are regression safeguards, not conformance evidence.

### `kbd`

- Import and usage: `import { Kbd } from "@/components/ui/kbd"`; use `<Kbd>Content</Kbd>`.
- Required accessible text: Give interactive parts a meaningful accessible name; placeholder text is supplemental, not a label.
- Keyboard behaviour: Not interactive; shortcut text must be understandable in context.
- Important props and events: Use the exported props, slots and documented model/value update or action events; preserve each component's native attributes.
- Dependencies: npm none; registry none.
- Differences from upstream shadcn-vue: The implementation follows the current upstream component source; only registry-local import paths and consumer alias rewrites differ.
- Known accessibility considerations: Verify names, focus visibility, state announcements, contrast and content-specific semantics in the consuming application; automated tests are regression safeguards, not conformance evidence.

### `marker`

- Import and usage: `import { Marker } from "@/components/ui/marker"`; use `<Marker>Content</Marker>`.
- Required accessible text: Give interactive parts a meaningful accessible name; placeholder text is supplemental, not a label.
- Keyboard behaviour: Not interactive by default; pair status colour with text or another non-colour cue.
- Important props and events: Use the exported props, slots and documented model/value update or action events; preserve each component's native attributes.
- Dependencies: npm class-variance-authority, reka-ui; registry none.
- Differences from upstream shadcn-vue: The implementation follows the current upstream component source; only registry-local import paths and consumer alias rewrites differ.
- Known accessibility considerations: Verify names, focus visibility, state announcements, contrast and content-specific semantics in the consuming application; automated tests are regression safeguards, not conformance evidence.

### `menubar`

- Import and usage: `import { Menubar } from "@/components/ui/menubar"`; use `<Menubar>Content</Menubar>`.
- Required accessible text: Give interactive parts a meaningful accessible name; placeholder text is supplemental, not a label.
- Keyboard behaviour: Arrow keys move through menus/items; Enter/Space opens or activates and Escape closes submenus.
- Important props and events: Use the exported props, slots and documented model/value update or action events; preserve each component's native attributes.
- Dependencies: npm @lucide/vue, @vueuse/core, reka-ui; registry none.
- Differences from upstream shadcn-vue: The implementation follows the current upstream component source; only registry-local import paths and consumer alias rewrites differ.
- Known accessibility considerations: Verify names, focus visibility, state announcements, contrast and content-specific semantics in the consuming application; automated tests are regression safeguards, not conformance evidence.

### `message-scroller`

- Import and usage: `import { MessageScroller } from "@/components/ui/message-scroller"`; use `<MessageScroller>Content</MessageScroller>`.
- Required accessible text: Give interactive parts a meaningful accessible name; placeholder text is supplemental, not a label.
- Keyboard behaviour: Label scroller controls, preserve reading order and do not force focus when content arrives.
- Important props and events: Use the exported props, slots and documented model/value update or action events; preserve each component's native attributes.
- Dependencies: npm @lucide/vue; registry button.
- Differences from upstream shadcn-vue: The implementation follows the current upstream component source; only registry-local import paths and consumer alias rewrites differ.
- Known accessibility considerations: Verify names, focus visibility, state announcements, contrast and content-specific semantics in the consuming application; automated tests are regression safeguards, not conformance evidence.

### `message`

- Import and usage: `import { Message } from "@/components/ui/message"`; use `<Message>Content</Message>`.
- Required accessible text: Give interactive parts a meaningful accessible name; placeholder text is supplemental, not a label.
- Keyboard behaviour: Not interactive by default; keep author, content and actions in a logical reading order.
- Important props and events: Use the exported props, slots and documented model/value update or action events; preserve each component's native attributes.
- Dependencies: npm reka-ui; registry none.
- Differences from upstream shadcn-vue: The implementation follows the current upstream component source; only registry-local import paths and consumer alias rewrites differ.
- Known accessibility considerations: Verify names, focus visibility, state announcements, contrast and content-specific semantics in the consuming application; automated tests are regression safeguards, not conformance evidence.

### `native-select`

- Import and usage: `import { NativeSelect } from "@/components/ui/native-select"`; use `<NativeSelect>Content</NativeSelect>`.
- Required accessible text: Give interactive parts a meaningful accessible name; placeholder text is supplemental, not a label.
- Keyboard behaviour: Use native select keyboard behaviour and associate it with a visible label or explicit name.
- Important props and events: Use the exported props, slots and documented model/value update or action events; preserve each component's native attributes.
- Dependencies: npm @lucide/vue, @vueuse/core, reka-ui; registry none.
- Differences from upstream shadcn-vue: The implementation follows the current upstream component source; only registry-local import paths and consumer alias rewrites differ.
- Known accessibility considerations: Verify names, focus visibility, state announcements, contrast and content-specific semantics in the consuming application; automated tests are regression safeguards, not conformance evidence.

### `navigation-menu`

- Import and usage: `import { NavigationMenu } from "@/components/ui/navigation-menu"`; use `<NavigationMenu>Content</NavigationMenu>`.
- Required accessible text: Give interactive parts a meaningful accessible name; placeholder text is supplemental, not a label.
- Keyboard behaviour: Arrow keys move between triggers/links; Enter/Space opens submenus and Escape closes them.
- Important props and events: Use the exported props, slots and documented model/value update or action events; preserve each component's native attributes.
- Dependencies: npm @lucide/vue, @vueuse/core, class-variance-authority, reka-ui; registry none.
- Differences from upstream shadcn-vue: The implementation follows the current upstream component source; only registry-local import paths and consumer alias rewrites differ.
- Known accessibility considerations: Verify names, focus visibility, state announcements, contrast and content-specific semantics in the consuming application; automated tests are regression safeguards, not conformance evidence.

### `number-field`

- Import and usage: `import { NumberField } from "@/components/ui/number-field"`; use `<NumberField>Content</NumberField>`.
- Required accessible text: Give interactive parts a meaningful accessible name; placeholder text is supplemental, not a label.
- Keyboard behaviour: Arrow keys step values where supported; increment/decrement controls need labels and text editing must work.
- Important props and events: Use the exported props, slots and documented model/value update or action events; preserve each component's native attributes.
- Dependencies: npm @lucide/vue, @vueuse/core, reka-ui; registry none.
- Differences from upstream shadcn-vue: The implementation follows the current upstream component source; only registry-local import paths and consumer alias rewrites differ.
- Known accessibility considerations: Verify names, focus visibility, state announcements, contrast and content-specific semantics in the consuming application; automated tests are regression safeguards, not conformance evidence.

### `pin-input`

- Import and usage: `import { PinInput } from "@/components/ui/pin-input"`; use `<PinInput>Content</PinInput>`.
- Required accessible text: Give interactive parts a meaningful accessible name; placeholder text is supplemental, not a label.
- Keyboard behaviour: Provide a label and instructions; typing, deletion, pasting and Arrow-key movement remain available.
- Important props and events: Use the exported props, slots and documented model/value update or action events; preserve each component's native attributes.
- Dependencies: npm @lucide/vue, @vueuse/core, reka-ui; registry none.
- Differences from upstream shadcn-vue: The implementation follows the current upstream component source; only registry-local import paths and consumer alias rewrites differ.
- Known accessibility considerations: Verify names, focus visibility, state announcements, contrast and content-specific semantics in the consuming application; automated tests are regression safeguards, not conformance evidence.

### `progress`

- Import and usage: `import { Progress } from "@/components/ui/progress"`; use `<Progress>Content</Progress>`.
- Required accessible text: Give interactive parts a meaningful accessible name; placeholder text is supplemental, not a label.
- Keyboard behaviour: Provide an accessible name and determinate value when known; do not use colour alone.
- Important props and events: Use the exported props, slots and documented model/value update or action events; preserve each component's native attributes.
- Dependencies: npm @vueuse/core, reka-ui; registry none.
- Differences from upstream shadcn-vue: The implementation follows the current upstream component source; only registry-local import paths and consumer alias rewrites differ.
- Known accessibility considerations: Verify names, focus visibility, state announcements, contrast and content-specific semantics in the consuming application; automated tests are regression safeguards, not conformance evidence.

### `questionnaire`

- Import and usage: `import { Questionnaire } from "@/components/ui/questionnaire"`; use `<Questionnaire>Content</Questionnaire>`.
- Required accessible text: Give interactive parts a meaningful accessible name; placeholder text is supplemental, not a label.
- Keyboard behaviour: Use a labelled group/legend per question, expose validation text and keep navigation controls keyboard accessible.
- Important props and events: Use the exported props, slots and documented model/value update or action events; preserve each component's native attributes.
- Dependencies: npm @lucide/vue, reka-ui; registry button.
- Differences from upstream shadcn-vue: The implementation follows the current upstream component source; only registry-local import paths and consumer alias rewrites differ.
- Known accessibility considerations: Verify names, focus visibility, state announcements, contrast and content-specific semantics in the consuming application; automated tests are regression safeguards, not conformance evidence.

### `range-calendar`

- Import and usage: `import { RangeCalendar } from "@/components/ui/range-calendar"`; use `<RangeCalendar>Content</RangeCalendar>`.
- Required accessible text: Provide a date-grid label and meaningful month/year context.
- Keyboard behaviour: Use the date-grid keyboard model and announce the start/end range without relying on colour.
- Important props and events: Use the exported props, slots and documented model/value update or action events; preserve each component's native attributes.
- Dependencies: npm @lucide/vue, @vueuse/core, reka-ui; registry button.
- Differences from upstream shadcn-vue: The implementation follows the current upstream component source; only registry-local import paths and consumer alias rewrites differ.
- Known accessibility considerations: Verify names, focus visibility, state announcements, contrast and content-specific semantics in the consuming application; automated tests are regression safeguards, not conformance evidence.

### `resizable`

- Import and usage: `import { Resizable } from "@/components/ui/resizable"`; use `<Resizable>Content</Resizable>`.
- Required accessible text: Give interactive parts a meaningful accessible name; placeholder text is supplemental, not a label.
- Keyboard behaviour: Give resize handles labels and usable keyboard adjustments; content remains reachable after resizing.
- Important props and events: Use the exported props, slots and documented model/value update or action events; preserve each component's native attributes.
- Dependencies: npm @lucide/vue, @vueuse/core, reka-ui; registry none.
- Differences from upstream shadcn-vue: The implementation follows the current upstream component source; only registry-local import paths and consumer alias rewrites differ.
- Known accessibility considerations: Verify names, focus visibility, state announcements, contrast and content-specific semantics in the consuming application; automated tests are regression safeguards, not conformance evidence.

### `scroll-area`

- Import and usage: `import { ScrollArea } from "@/components/ui/scroll-area"`; use `<ScrollArea>Content</ScrollArea>`.
- Required accessible text: Give interactive parts a meaningful accessible name; placeholder text is supplemental, not a label.
- Keyboard behaviour: Label the scrollable region when needed and keep all content reachable without pointer-only scrolling.
- Important props and events: Use the exported props, slots and documented model/value update or action events; preserve each component's native attributes.
- Dependencies: npm @vueuse/core, reka-ui; registry none.
- Differences from upstream shadcn-vue: The implementation follows the current upstream component source; only registry-local import paths and consumer alias rewrites differ.
- Known accessibility considerations: Verify names, focus visibility, state announcements, contrast and content-specific semantics in the consuming application; automated tests are regression safeguards, not conformance evidence.

### `sidebar`

- Import and usage: `import { Sidebar } from "@/components/ui/sidebar"`; use `<Sidebar>Content</Sidebar>`.
- Required accessible text: Give interactive parts a meaningful accessible name; placeholder text is supplemental, not a label.
- Keyboard behaviour: Label navigation, name its toggle and preserve focus when collapsing or becoming a drawer.
- Important props and events: Use the exported props, slots and documented model/value update or action events; preserve each component's native attributes.
- Dependencies: npm @lucide/vue, @vueuse/core, class-variance-authority, reka-ui; registry sheet, input, tooltip, skeleton, separator, button.
- Differences from upstream shadcn-vue: The implementation follows the current upstream component source; only registry-local import paths and consumer alias rewrites differ.
- Known accessibility considerations: Verify names, focus visibility, state announcements, contrast and content-specific semantics in the consuming application; automated tests are regression safeguards, not conformance evidence.

### `slider`

- Import and usage: `import { Slider } from "@/components/ui/slider"`; use `<Slider>Content</Slider>`.
- Required accessible text: Give interactive parts a meaningful accessible name; placeholder text is supplemental, not a label.
- Keyboard behaviour: Associate each slider with a label; Arrow keys adjust and Home/End reach bounds where supported.
- Important props and events: Use the exported props, slots and documented model/value update or action events; preserve each component's native attributes.
- Dependencies: npm @vueuse/core, reka-ui; registry none.
- Differences from upstream shadcn-vue: The implementation follows the current upstream component source; only registry-local import paths and consumer alias rewrites differ.
- Known accessibility considerations: Verify names, focus visibility, state announcements, contrast and content-specific semantics in the consuming application; automated tests are regression safeguards, not conformance evidence.

### `sonner`

- Import and usage: `import { Sonner } from "@/components/ui/sonner"`; use `<Sonner>Content</Sonner>`.
- Required accessible text: Give interactive parts a meaningful accessible name; placeholder text is supplemental, not a label.
- Keyboard behaviour: Notifications use live-region behaviour; essential information must not be transient only.
- Important props and events: Use the exported props, slots and documented model/value update or action events; preserve each component's native attributes.
- Dependencies: npm @lucide/vue, vue-sonner; registry none.
- Differences from upstream shadcn-vue: The implementation follows the current upstream component source; only registry-local import paths and consumer alias rewrites differ.
- Known accessibility considerations: Verify names, focus visibility, state announcements, contrast and content-specific semantics in the consuming application; automated tests are regression safeguards, not conformance evidence.

### `switch`

- Import and usage: `import { Switch } from "@/components/ui/switch"`; use `<Switch>Content</Switch>`.
- Required accessible text: Give interactive parts a meaningful accessible name; placeholder text is supplemental, not a label.
- Keyboard behaviour: Space toggles the switch and exposes checked state; pair it with a clear label.
- Important props and events: Use the exported props, slots and documented model/value update or action events; preserve each component's native attributes.
- Dependencies: npm @vueuse/core, reka-ui; registry none.
- Differences from upstream shadcn-vue: The implementation follows the current upstream component source; only registry-local import paths and consumer alias rewrites differ.
- Known accessibility considerations: Verify names, focus visibility, state announcements, contrast and content-specific semantics in the consuming application; automated tests are regression safeguards, not conformance evidence.

### `tags-input`

- Import and usage: `import { TagsInput } from "@/components/ui/tags-input"`; use `<TagsInput>Content</TagsInput>`.
- Required accessible text: Give interactive parts a meaningful accessible name; placeholder text is supplemental, not a label.
- Keyboard behaviour: Provide a label/instructions; typing, deletion, Arrow-key movement and removal are keyboard usable.
- Important props and events: Use the exported props, slots and documented model/value update or action events; preserve each component's native attributes.
- Dependencies: npm @lucide/vue, @vueuse/core, reka-ui; registry none.
- Differences from upstream shadcn-vue: The implementation follows the current upstream component source; only registry-local import paths and consumer alias rewrites differ.
- Known accessibility considerations: Verify names, focus visibility, state announcements, contrast and content-specific semantics in the consuming application; automated tests are regression safeguards, not conformance evidence.

### `toast`

- Import and usage: `import { Toast } from "@/components/ui/toast"`; use `<Toast>Content</Toast>`.
- Required accessible text: Give interactive parts a meaningful accessible name; placeholder text is supplemental, not a label.
- Keyboard behaviour: Provide concise title/description and labelled action/close controls; essential information must not be toast-only.
- Important props and events: Use the exported props, slots and documented model/value update or action events; preserve each component's native attributes.
- Dependencies: npm @lucide/vue, @vueuse/core, class-variance-authority, reka-ui; registry none.
- Differences from upstream shadcn-vue: The upstream legacy Toast implementation is retained for compatibility; upstream recommends Sonner for new work.
- Known accessibility considerations: Verify names, focus visibility, state announcements, contrast and content-specific semantics in the consuming application; automated tests are regression safeguards, not conformance evidence.

### `toggle-group`

- Import and usage: `import { ToggleGroup } from "@/components/ui/toggle-group"`; use `<ToggleGroup>Content</ToggleGroup>`.
- Required accessible text: Give interactive parts a meaningful accessible name; placeholder text is supplemental, not a label.
- Keyboard behaviour: Label the group; each toggle exposes pressed state and follows its selection model.
- Important props and events: Use the exported props, slots and documented model/value update or action events; preserve each component's native attributes.
- Dependencies: npm @vueuse/core, class-variance-authority, reka-ui; registry toggle.
- Differences from upstream shadcn-vue: The implementation follows the current upstream component source; only registry-local import paths and consumer alias rewrites differ.
- Known accessibility considerations: Verify names, focus visibility, state announcements, contrast and content-specific semantics in the consuming application; automated tests are regression safeguards, not conformance evidence.

### `toggle`

- Import and usage: `import { Toggle } from "@/components/ui/toggle"`; use `<Toggle>Content</Toggle>`.
- Required accessible text: Give interactive parts a meaningful accessible name; placeholder text is supplemental, not a label.
- Keyboard behaviour: Enter/Space activates and exposes pressed state; provide a clear accessible name.
- Important props and events: Use the exported props, slots and documented model/value update or action events; preserve each component's native attributes.
- Dependencies: npm @vueuse/core, class-variance-authority, reka-ui; registry none.
- Differences from upstream shadcn-vue: The implementation follows the current upstream component source; only registry-local import paths and consumer alias rewrites differ.
- Known accessibility considerations: Verify names, focus visibility, state announcements, contrast and content-specific semantics in the consuming application; automated tests are regression safeguards, not conformance evidence.
