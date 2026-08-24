# Adding a block

This registry publishes reusable `registry:block` items through the official shadcn-vue format. `registry/` and `registry.json` are authoritative; `public/r/` is generated. Do not edit generated JSON or create a replacement CLI.

## Define the boundary

Add a block only when it is a reusable, genuinely multi-component feature or a reusable field/action/layout pattern. Keep pages, business logic, API clients, authentication state, translations, secrets, environment files and application data out of the registry. Inertia dependencies are acceptable only when the block's public API genuinely requires Inertia, and the catalogue must call that out.

Upstream shadcn-vue primitives are external registry dependencies. They belong in the development-only playground fixture, not in `registry/threadable/components/blocks` or the public catalogue.

## Add source files

Create the stable kebab-case directory under `registry/threadable/components/blocks/<name>/`. Preserve the source file names, props, events, slots and exports. Keep implementation-only files inside the owning block and list them in that block's registry item; they are not separate public installation targets.

Threadable-owned imports use the block namespace:

```ts
import { Field } from "@/registry/threadable/components/blocks/field";
import { cn } from "@/registry/threadable/lib/utils";
```

Imports for external shadcn-vue primitives use the consumer's normal aliases, for example `@/components/ui/button`. Do not import from a removed source-project path or create a relative import that escapes the owning block unexpectedly.

## Register the block

Add every owned source file to `registry.json` with `type: "registry:block"`. Use `registry:component` for Vue and TypeScript files and `registry:lib` for shared utilities included in the item. Omit targets for component and library files so the official CLI resolves them through the consumer's configured `components` and `lib` aliases. Use explicit targets only for file types that require them, such as pages or standalone files.

List npm packages from actual imports. List upstream primitives as bare registry dependencies and Threadable blocks as hosted URLs when a public dependency is needed:

```json
{
  "$schema": "https://shadcn-vue.com/schema/registry-item.json",
  "name": "example-block",
  "type": "registry:block",
  "registryDependencies": [
    "@shadcn/button",
    "https://threadable.github.io/shadcn/r/field.json"
  ],
  "files": [
    {
      "path": "registry/threadable/components/blocks/example-block/ExampleBlock.vue",
      "type": "registry:component"
    }
  ]
}
```

The current public endpoint must be available before a hosted block dependency is released. For local consumer checks, use the repository's local-registry mirror setup in CI rather than changing production metadata to a local URL.

## Document and test

Add a section to [`docs/components.md`](./components.md) covering import and basic usage, required labels or accessible text, keyboard behaviour, important props/events, npm and registry dependencies, differences from upstream and known accessibility considerations.

Add one isolated playground tile in the appropriate type file. It must own its props and model bindings. Add unit/accessibility coverage and real browser sequences for interactive behaviour: names, label associations, ARIA changes, keyboard activation, tab order, focus movement, trapping/restoration, Escape dismissal, disabled behaviour, error relationships and reduced motion as applicable.

## Validate

```sh
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

Inspect every generated item. Confirm every declared file exists, dependencies are complete and minimal, imports are safe for consumers, and no absolute local paths or application-specific code are present. Passing axe or automated tests alone does not establish WCAG conformance.

## Breaking changes

Record prop, event, slot, export, file-path, dependency and accessibility-behaviour breaks in [`CHANGELOG.md`](../CHANGELOG.md), with a migration path. Use the release guidance in [`docs/releasing.md`](./releasing.md).
