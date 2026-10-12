# Threadable shadcn-vue blocks

Threadable is a registry of reusable shadcn-vue blocks for Laravel applications using Inertia, Vue 3, TypeScript and Tailwind CSS v4. The blocks are source-owned and copied into the consuming application by the official shadcn-vue CLI. Threadable does not fork or replace that CLI.

The registry is based on [shadcn-vue](https://www.shadcn-vue.com/). Official shadcn-vue primitives remain consumer dependencies, so applications can update those primitives independently. Threadable-owned accessibility behaviour lives in the blocks.

## Supported setup

- Laravel with Inertia and Vue 3.
- TypeScript.
- Tailwind CSS v4.
- Node 24.15+ and pnpm 9.6+ for registry development.

`button-link-block`, `sheet-block` and `text-link-block` require the Inertia Vue adapter. The other blocks do not require Inertia unless their containing application adds it.

## Installation

Install a block directly from GitHub with the official CLI:

```sh
pnpm dlx shadcn-vue@latest add threadable/shadcn/button-block
```

Install from the hosted namespace by adding this to the consuming project's `components.json`:

```json
{
  "registries": {
    "@threadable": "https://threadable.github.io/shadcn/r/{name}.json"
  }
}
```

Then run:

```sh
pnpm dlx shadcn-vue@latest add @threadable/button-block
```

## Available blocks

The generated index is [`public/r/registry.json`](./public/r/registry.json), and the human-readable catalogue is [`docs/components.md`](./docs/components.md).

Public blocks:

`button-block` · `button-link-block` · `card-block` · `checkbox-block` · `combobox-group-block` · `confirm-dialog-block` · `dropdown-menu-block` · `field` · `input-block` · `radio-block` · `select-block` · `select-group-block` · `sheet-block` · `sheet-content-block` · `skeleton-block` · `stepper-block` · `text-link-block` · `textarea-block` · `password-block` · `phone-input-block` · `postcode-block` · `calendar-block` · `range-calendar-block`

To inspect the available names with standard tools:

```sh
node --input-type=module -e 'import registry from "./registry.json" with { type: "json" }; console.log(registry.items.map((item) => item.name).join("\\n"))'
```

To pin a GitHub installation, use an immutable tag:

```sh
pnpm dlx shadcn-vue@latest add https://raw.githubusercontent.com/threadable/shadcn/v0.1.0/public/r/button-block.json
```

## Local development

```sh
pnpm install --frozen-lockfile
pnpm playground:dev
```

The Vite playground groups every public block by type and gives each tile independent props and model bindings. It includes representative default, disabled, invalid, overlay, theme, long-content and mobile-width states.

Upstream primitives are installed into the development-only playground fixture with the official CLI. Refresh them with:

```sh
pnpm upstream:sync
```

This command only updates `playground/src/components/ui`; it is not a replacement CLI and those primitive files are not published as Threadable registry items.

## Build and test

```sh
pnpm registry:clean
pnpm registry:build
pnpm typecheck
pnpm lint
pnpm test:unit
pnpm test:a11y
pnpm test:integration
pnpm playground:build
pnpm test:browser
pnpm test:axe
pnpm check
```

`registry/` and `registry.json` are the source of truth. `public/r/` is generated output and must not be edited manually. `pnpm registry:build` cleans and regenerates it with the supported `shadcn-vue build` command.

## Contribution process

Read [`AGENTS.md`](./AGENTS.md), [`CONTRIBUTING.md`](./CONTRIBUTING.md) and [`docs/adding-a-component.md`](./docs/adding-a-component.md). New public items should be genuinely reusable blocks, keep application-specific coupling out, preserve APIs and accessibility behaviour, update `registry.json`, add isolated playground coverage and add keyboard/accessibility tests. Run `pnpm check` before completing a change. Breaking changes need a migration note in [`CHANGELOG.md`](./CHANGELOG.md).

## Accessibility

Threadable treats accessibility as part of the block API: names, labels, descriptions, validation relationships, keyboard interaction, focus management, disabled behaviour and reduced motion are reviewed together with styling. The project uses WCAG 2.2 Level AA as a target and review goal. Consumers remain responsible for meaningful content, colour contrast, correct composition, browser support and manual assistive-technology review.

Automated tests and axe results are regression safeguards; they do not by themselves establish WCAG 2.2 Level AA compliance. See [`docs/accessibility.md`](./docs/accessibility.md).

## Releases and licensing

Releases use immutable `vMAJOR.MINOR.PATCH` tags. New blocks are minor releases, fixes are patch releases, and API, file-path, dependency or accessibility-behaviour breaks require a major release. See [`docs/releasing.md`](./docs/releasing.md) and [`CHANGELOG.md`](./CHANGELOG.md).

Threadable-authored code is MIT licensed. The upstream shadcn-vue MIT notice is preserved in [`NOTICE.md`](./NOTICE.md). Registry installation copies source code and dependency changes into your application; inspect and pin third-party registry code before using it in production. See [`SECURITY.md`](./SECURITY.md).
