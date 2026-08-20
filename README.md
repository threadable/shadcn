# Threadable shadcn-vue registry

This repository contains Threadable's custom component registry for the [shadcn-vue](https://www.shadcn-vue.com/) ecosystem. The registry packages Threadable's reusable Vue components, primitives, composables, styling tokens and larger UI blocks for Laravel applications built with Inertia, Vue 3, TypeScript and Tailwind CSS v4.

The source is based on shadcn-vue conventions, but this repository is not a fork of the shadcn-vue CLI and does not replace it. The registry owns the source files it distributes; consumers copy those files into their applications and can then adapt them locally.

## CI status

[![CI](https://github.com/threadable/shadcn/actions/workflows/ci.yml/badge.svg)](https://github.com/threadable/shadcn/actions/workflows/ci.yml)

Pull requests and pushes to `main` run registry validation, Vitest, Playwright and axe checks, a complete consumer installation, and a clean Laravel Vue integration build. Pull-request runs validate only and upload test reports when appropriate; successful pushes to `main` additionally deploy the generated registry to GitHub Pages and smoke-test the hosted output.

## Supported setup

The supported consumer baseline is:

- Laravel with Inertia and the Vue adapter.
- Vue 3 and TypeScript.
- Tailwind CSS v4 with the Threadable theme item or equivalent tokens.
- Node 24.15 or newer and pnpm 9.6 or newer for this repository's development workflow.

Some items are framework-neutral Vue primitives. Items with `button-link-block`, `sheet-block` or `text-link-block` in their name use Inertia and require `@inertiajs/vue3` (and, for link types, `@inertiajs/core`).

## Installation

### Public GitHub registry

Install an item from the public GitHub registry with the official shadcn-vue CLI:

```sh
pnpm dlx shadcn-vue@latest add threadable/shadcn/button
```

Replace `button` with an item from the [component catalogue](./docs/components.md). Install `threadable-theme` once when the application needs Threadable's Tailwind CSS v4 variables and global rules:

```sh
pnpm dlx shadcn-vue@latest add threadable/shadcn/threadable-theme
```

The consuming project's `components.json` must have an alias configuration compatible with its source layout. The installed files are application-owned after installation. Review them before use, provide meaningful labels, descriptions, errors and other accessible text, and keep dependencies in the consuming project up to date.

### Hosted `@threadable` registry

The generated registry is deployed to GitHub Pages from successful pushes to the default branch:
`https://threadable.github.io/shadcn/r/{name}.json`.

Add this registry namespace to the consuming application's `components.json`:

```json
{
  "registries": {
    "@threadable": "https://threadable.github.io/shadcn/r/{name}.json"
  }
}
```

Then install an item with the official shadcn-vue CLI:

```sh
pnpm dlx shadcn-vue@latest add @threadable/button
```

The deployment requires repository Pages settings to be enabled: open `Settings` → `Pages`, select `GitHub Actions` as the build and deployment source, and allow Actions to run for the repository. The workflow performs the first deployment only after every validation job succeeds on `main`; it also smoke-tests the deployed `button` item as JSON. No repository settings are changed by this project workflow.

### List items and pin a tag

The authoritative public list is the non-internal entries in [`registry.json`](./registry.json), and the generated public index is [`public/r/registry.json`](./public/r/registry.json). The human-readable catalogue is [`docs/components.md`](./docs/components.md). There is intentionally no custom listing CLI.

To install an immutable tagged item, address the generated JSON file at the tag rather than the moving default branch:

```sh
pnpm dlx shadcn-vue@latest add https://raw.githubusercontent.com/threadable/shadcn/v0.1.0/public/r/button.json
```

Use a published tag that exists in this repository. A hosted installation can offer the same guarantee only when its hosting layout exposes versioned files.

## Component catalogue

The catalogue contains the following public registry items. Each link documents imports, basic usage, required accessible text, keyboard behaviour, important props and events, dependencies, Threadable differences, and known accessibility considerations.

### Theme, library and composable

[`threadable-theme`](./docs/components.md#threadable-theme) · [`utils`](./docs/components.md#utils) · [`use-typeahead-keyboard`](./docs/components.md#use-typeahead-keyboard)

### Components

[`alert-dialog`](./docs/components.md#alert-dialog) · [`button`](./docs/components.md#button) · [`checkbox`](./docs/components.md#checkbox) · [`command`](./docs/components.md#command) · [`dialog`](./docs/components.md#dialog) · [`dropdown-menu`](./docs/components.md#dropdown-menu) · [`input`](./docs/components.md#input) · [`input-group`](./docs/components.md#input-group) · [`popover`](./docs/components.md#popover) · [`radio-group`](./docs/components.md#radio-group) · [`separator`](./docs/components.md#separator) · [`sheet`](./docs/components.md#sheet) · [`skeleton`](./docs/components.md#skeleton) · [`stepper`](./docs/components.md#stepper) · [`table`](./docs/components.md#table) · [`tabs`](./docs/components.md#tabs) · [`textarea`](./docs/components.md#textarea) · [`tooltip`](./docs/components.md#tooltip)

[`badge`](./docs/components.md#badge) · [`button-block`](./docs/components.md#button-block) · [`button-link-block`](./docs/components.md#button-link-block) · [`card-block`](./docs/components.md#card-block) · [`checkbox-block`](./docs/components.md#checkbox-block) · [`combobox-group-block`](./docs/components.md#combobox-group-block) · [`confirm-dialog-block`](./docs/components.md#confirm-dialog-block) · [`datatable`](./docs/components.md#datatable) · [`datatable-search`](./docs/components.md#datatable-search) · [`dropdown-menu-block`](./docs/components.md#dropdown-menu-block) · [`field`](./docs/components.md#field) · [`help`](./docs/components.md#help) · [`info`](./docs/components.md#info) · [`input-block`](./docs/components.md#input-block) · [`label`](./docs/components.md#label) · [`loading-spinner`](./docs/components.md#loading-spinner) · [`no-result-icon`](./docs/components.md#no-result-icon) · [`pagination`](./docs/components.md#pagination) · [`radio-block`](./docs/components.md#radio-block) · [`search`](./docs/components.md#search) · [`select`](./docs/components.md#select) · [`select-block`](./docs/components.md#select-block) · [`select-group-block`](./docs/components.md#select-group-block) · [`sheet-block`](./docs/components.md#sheet-block) · [`sheet-content-block`](./docs/components.md#sheet-content-block) · [`skeleton-block`](./docs/components.md#skeleton-block) · [`stepper-block`](./docs/components.md#stepper-block) · [`tabs-select`](./docs/components.md#tabs-select) · [`text-link-block`](./docs/components.md#text-link-block) · [`textarea-block`](./docs/components.md#textarea-block) · [`typeahead-input`](./docs/components.md#typeahead-input) · [`typography`](./docs/components.md#typography)

[`accordion`](./docs/components.md#accordion) · [`alert`](./docs/components.md#alert) · [`aspect-ratio`](./docs/components.md#aspect-ratio) · [`attachment`](./docs/components.md#attachment) · [`avatar`](./docs/components.md#avatar) · [`breadcrumb`](./docs/components.md#breadcrumb) · [`bubble`](./docs/components.md#bubble) · [`button-group`](./docs/components.md#button-group) · [`calendar`](./docs/components.md#calendar) · [`card`](./docs/components.md#card) · [`carousel`](./docs/components.md#carousel) · [`chart`](./docs/components.md#chart) · [`collapsible`](./docs/components.md#collapsible) · [`combobox`](./docs/components.md#combobox) · [`context-menu`](./docs/components.md#context-menu) · [`date-picker`](./docs/components.md#date-picker) · [`drawer`](./docs/components.md#drawer) · [`empty`](./docs/components.md#empty) · [`form`](./docs/components.md#form) · [`hover-card`](./docs/components.md#hover-card) · [`input-otp`](./docs/components.md#input-otp) · [`item`](./docs/components.md#item) · [`kbd`](./docs/components.md#kbd) · [`marker`](./docs/components.md#marker) · [`menubar`](./docs/components.md#menubar) · [`message`](./docs/components.md#message) · [`message-scroller`](./docs/components.md#message-scroller) · [`native-select`](./docs/components.md#native-select) · [`navigation-menu`](./docs/components.md#navigation-menu) · [`number-field`](./docs/components.md#number-field) · [`pin-input`](./docs/components.md#pin-input) · [`progress`](./docs/components.md#progress) · [`questionnaire`](./docs/components.md#questionnaire) · [`range-calendar`](./docs/components.md#range-calendar) · [`resizable`](./docs/components.md#resizable) · [`scroll-area`](./docs/components.md#scroll-area) · [`sidebar`](./docs/components.md#sidebar) · [`slider`](./docs/components.md#slider) · [`sonner`](./docs/components.md#sonner) · [`spinner`](./docs/components.md#spinner) · [`switch`](./docs/components.md#switch) · [`tags-input`](./docs/components.md#tags-input) · [`toast`](./docs/components.md#toast) · [`toggle`](./docs/components.md#toggle) · [`toggle-group`](./docs/components.md#toggle-group)

## Local development

```sh
pnpm install --frozen-lockfile
pnpm check
```

Useful focused commands:

```sh
pnpm registry:build      # Generate public/r/*.json from registry.json and registry/
pnpm registry:clean      # Remove generated registry output
pnpm typecheck
pnpm lint
pnpm test                # Vitest unit suite
pnpm test:a11y           # Vue accessibility regression tests
pnpm test:integration
pnpm playground:dev      # Start the Vite playground at http://127.0.0.1:4173
pnpm playground:build
pnpm test:browser        # Real Chromium keyboard and responsive interaction tests
pnpm test:axe            # @axe-core/playwright scans
pnpm test:harness        # Unit, browser and axe harness tests
```

The playground renders every public item in labelled, separated cards and representative default, disabled, invalid, overlay, theme, long-content and mobile-width states. Each card owns its own props and model bindings. See [`docs/accessibility.md`](./docs/accessibility.md) for the test scope and manual release checklist.

`registry/` is the source of truth. `public/r/` is generated output and must not be edited manually. The build uses the stable `shadcn-vue@2.8.2` CLI and its documented `shadcn-vue build` command; this project has no custom replacement CLI.

## Contribution process

Read [`CONTRIBUTING.md`](./CONTRIBUTING.md), [`AGENTS.md`](./AGENTS.md) and [`docs/adding-a-component.md`](./docs/adding-a-component.md) before changing a registry item. In every source change:

- Preserve the existing component API and accessibility behaviour.
- Update `registry.json` when files or dependencies change.
- Add keyboard and accessibility tests for interactive changes.
- Avoid application-specific dependencies and keep source imports under `@/registry/threadable`.
- Document breaking changes and run `pnpm check`.

## Accessibility philosophy and limitations

The project targets WCAG 2.2 Level AA as a design and review goal. It preserves semantic HTML, accessible names, label associations, validation relationships, keyboard interaction, visible focus, focus management and reduced-motion expectations from the imported components. Consumers remain responsible for meaningful content, colour choices in their application, correct composition, screen-reader review and product-level workflows.

Automated unit, browser and axe tests are regression safeguards; they do not by themselves establish WCAG 2.2 Level AA compliance. Read [`docs/accessibility.md`](./docs/accessibility.md) for the manual checklist, supported test matrix and known limitations.

## Releases and versioning

Registry releases are tagged as `vMAJOR.MINOR.PATCH`; see [`docs/releasing.md`](./docs/releasing.md). Breaking prop, event, slot, export, file-path or accessibility-behaviour changes require a major version unless a documented migration preserves compatibility. New items and backwards-compatible changes are minor releases; fixes and documentation-only changes are patch releases. Tags are immutable installation targets and generated `public/r` output is rebuilt for every release.

## Licence and upstream attribution

Threadable-authored code is MIT licensed; see [`LICENSE`](./LICENSE). This repository preserves the upstream shadcn-vue MIT notice in [`NOTICE.md`](./NOTICE.md), and Threadable modifications are attributed there. Individual registry items may also carry their dependency licences after installation.

## Security warning

The shadcn-vue registry model installs source code into your application. Treat any registry URL—including this one—as third-party code: inspect the generated files, dependency changes and scripts before running or committing them, pin a reviewed tag for production work, and never install untrusted registry items into an environment containing secrets. See [`SECURITY.md`](./SECURITY.md) for reporting guidance.
