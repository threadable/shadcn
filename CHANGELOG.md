# Changelog

Changes to the public registry are recorded here. Registry tags use `vMAJOR.MINOR.PATCH`; see [`docs/releasing.md`](./docs/releasing.md).

## [Unreleased]

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
