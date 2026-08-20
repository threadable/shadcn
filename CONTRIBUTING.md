# Contributing

This repository contains Threadable's custom shadcn-vue registry for Laravel applications using Inertia, Vue 3, TypeScript and Tailwind CSS v4. Contributions should improve reusable source without importing application-specific assumptions.

## Before opening a change

1. Read [`AGENTS.md`](./AGENTS.md) and the relevant component documentation.
2. Use pnpm and the supported Node version. Do not edit `public/r` by hand.
3. Keep `registry/` as the source of truth and keep reusable imports under `@/registry/threadable`.
4. Avoid application-specific dependencies, pages, API clients, translations, auth state, secrets and environment configuration.

## Component changes

- Preserve existing props, events, slots, exports, file names and behaviour unless the change is intentionally breaking.
- Update `registry.json` whenever files, npm dependencies or registry dependencies change.
- Use stable kebab-case item names and the supported registry item type.
- Add or update the component entry in [`docs/components.md`](./docs/components.md), including basic usage, accessible text requirements, keyboard behaviour, important props/events, dependencies, differences from upstream shadcn-vue and known accessibility considerations.
- Add keyboard and accessibility tests for interactive changes. Complex overlays and composite widgets need real Playwright keyboard sequences, not only attribute assertions.
- Preserve focus management, label associations, error relationships, reduced-motion behaviour and disabled semantics.
- Document breaking changes in [`CHANGELOG.md`](./CHANGELOG.md) and add migration notes where consumers need to change code.

For the full workflow, see [`docs/adding-a-component.md`](./docs/adding-a-component.md).

## Validation

Run the complete check before completing work:

```sh
pnpm install --frozen-lockfile
pnpm check
```

When changing documentation, also run the configured formatter and the repository's documentation link check if one is present. A generated registry diff is expected after `pnpm registry:build`; inspect it for absolute source paths, application-specific code and missing dependencies.

Do not commit or push from an automated Codex run. Human contributors should use a focused pull request with a clear summary, test evidence, accessibility notes and any remaining questions.

## Pull requests

Describe:

- The public item(s) or documentation affected.
- API, styling, dependency and generated-output changes.
- Keyboard, screen-reader and browser behaviour reviewed.
- Commands run and any environment-dependent checks not run.
- Any breaking change and its migration path.

CI validates the registry, tests, consumer installation and Laravel integration. It does not publish or deploy from pull requests.
