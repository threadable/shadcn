# Changelog

Changes to the public registry are recorded here. Registry tags use `vMAJOR.MINOR.PATCH`; see [`docs/releasing.md`](./docs/releasing.md).

## [Unreleased]

### Documentation

- Continue documenting public component APIs, accessibility expectations and release procedures.

## [0.1.0] - 2026-08-20

### Added

- Initial Threadable shadcn-vue registry for Laravel, Inertia, Vue 3, TypeScript and Tailwind CSS v4.
- Threadable theme, shared utility and typeahead keyboard items.
- Threadable primitives, form wrappers, navigation components, overlays, data-table blocks and typography blocks.
- Vite playground with isolated representative states for public items.
- Vitest, Playwright and `@axe-core/playwright` accessibility regression coverage.
- Consumer installation and clean Laravel integration validation in CI.

### Notes

- The public GitHub installation path is documented. A hosted `@threadable` endpoint is not configured yet.
- Automated tests are regression safeguards and do not establish WCAG conformance.
