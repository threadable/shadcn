# Adding a component

This repository distributes source files through the official shadcn-vue registry format. `registry/` is authoritative; `public/r/` is generated. Do not create a replacement CLI and do not edit generated JSON by hand.

## 1. Define the public boundary

Decide whether the addition is:

- `registry:ui` for a primitive or reusable UI wrapper.
- `registry:lib` for shared, component-used utilities.
- `registry:hook` for a shared composable.
- `registry:block` for a genuinely multi-component feature.
- `registry:style` for reusable CSS variables and rules.

Keep application pages, business logic, API clients, auth/preferences state, secrets, environment files and application data out of the registry. Inertia dependencies are acceptable only for components whose public API genuinely requires Inertia, and must be called out in the component documentation.

## 2. Add source files

Create the stable kebab-case item directory under the appropriate `registry/threadable` path. Preserve the source component's folder and file names unless the registry format requires a collision-safe rename. If a rename is required, record the old and new paths in the relevant change notes.

Use these import rules:

```ts
import { Button } from "@/registry/threadable/ui/button";
import { cn } from "@/registry/threadable/lib/utils";
import { useTypeaheadKeyboard } from "@/registry/threadable/composables/useTypeaheadKeyboard";
```

Never leave consumer-only component aliases, application absolute paths or relative imports that escape the owning registry item unexpectedly.

Low-level implementation files that are not intended for direct installation must be bundled into the public item that owns their API. Do not add a separate registry item for them. This is how the public `field`, `label`, `pagination` and `select` items provide their internal primitive files without exposing separate installation targets.

Preserve props, events, slots, exports, focus behaviour, labels, descriptions, error associations, disabled states and reduced-motion behaviour. A customised source component must not be silently replaced with a newly generated upstream shadcn-vue file.

## 3. Register the item

Add every owned file to `registry.json` and infer dependencies from actual runtime imports. List public registry dependencies with the syntax supported by the installed shadcn-vue CLI, for example:

```json
{
  "name": "example-control",
  "type": "registry:ui",
  "files": [
    {
      "path": "registry/threadable/ui/example-control/ExampleControl.vue",
      "type": "registry:ui"
    },
    {
      "path": "registry/threadable/ui/example-control/index.ts",
      "type": "registry:ui"
    }
  ],
  "dependencies": ["reka-ui"],
  "registryDependencies": ["@threadable/utils"]
}
```

Use stable kebab-case names. Do not add an item merely to make an application-specific import pass. If a builder health check is needed, keep it internal and out of the documented public catalogue.

## 4. Document the component

Add a section to [`docs/components.md`](./components.md) covering:

- Import path and a minimal usage example.
- Required visible labels, descriptions, error text or other accessible names.
- Keyboard behaviour and focus movement.
- Important props, v-model bindings, events and slots.
- npm and registry dependencies.
- Differences from upstream shadcn-vue or an explicit statement that the item is Threadable-only.
- Known accessibility considerations and consumer responsibilities.

Keep [`docs/components.md`](./components.md) and the registry metadata aligned when files, exports, imports or dependencies change.

## 5. Add tests and playground coverage

Add an isolated playground card with its own props and model bindings. Include representative default, disabled, focused, invalid, long-content, light/dark and mobile states where applicable.

For interactive components, add unit/accessibility coverage and real browser coverage. Test names, label associations, ARIA state changes, keyboard activation, tab order, focus movement, focus trapping/restoration, Escape dismissal, disabled behaviour, error associations and reduced motion as relevant. Use the actual component interaction rather than only checking a static attribute.

## 6. Build and validate

Run:

```sh
pnpm registry:build
pnpm typecheck
pnpm lint
pnpm test
pnpm test:a11y
pnpm test:integration
pnpm playground:build
pnpm test:browser
pnpm test:axe
pnpm check
```

Inspect every changed `public/r/*.json` file. Confirm that all source files and dependencies are represented, no absolute source paths or application-specific code were generated, and the item installs in the consumer fixture. Do not claim WCAG conformance from passing automated tests.

## 7. Review and release notes

Document breaking changes in [`CHANGELOG.md`](../CHANGELOG.md). A prop, event, slot, export, file-path, dependency or accessibility-behaviour change can require a major release. Explain migrations before asking for review.
