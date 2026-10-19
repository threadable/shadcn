# Changelog

Changes to the public registry are recorded here. Registry tags use `vMAJOR.MINOR.PATCH`; see [`docs/releasing.md`](./docs/releasing.md).

## [Unreleased]

### Added

- Public `action-button-block` item with semantic icon variants, tooltips, processing/disabled states and keyboard-accessible disabled reasons.

- `ConfirmDialogBlock` supports a `processing` boolean prop that disables its action button.

- Public `calendar-block` and `range-calendar-block` items with explicit Apply/Clear actions, date bounds, text props, mobile range dialog, and keyboard/accessibility coverage.

- Public `password-block`, `phone-input-block` and `postcode-block` items, with playground demos and keyboard/accessibility coverage.

### Changed

- Calendar text now uses `placeholder`, `clearLabel` and `applyLabel` props instead of `$t` translation keys. Range calendar rendering uses the upstream shadcn-vue primitive. Draft selections remain private until Apply; Clear removes even an initial default value.

### Documentation

- Continue documenting public block APIs, accessibility expectations and release procedures.

## [0.1.0] - 2026-08-20

### Added

- Initial Threadable shadcn-vue block registry for Laravel, Inertia, Vue 3, TypeScript and Tailwind CSS v4.
- Reusable action, form, navigation, overlay, layout and feedback blocks.
- Vite playground with isolated representative states for public items.
- Vitest, Playwright and `@axe-core/playwright` accessibility regression coverage.
- Consumer installation and clean Laravel integration validation in CI.

### Notes

- Official shadcn-vue primitives remain external dependencies so consumers can update them independently.
- Automated tests are regression safeguards and do not establish WCAG conformance.
