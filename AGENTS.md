# Contribution instructions

These rules apply to future contributors and Codex runs.

This repository contains Threadable's custom shadcn-vue registry for Laravel applications using Inertia, Vue 3, TypeScript and Tailwind CSS v4. The registry's accessibility target is WCAG 2.2 Level AA.

## Source and generated files

- `registry/` is the source of truth.
- `registry.json` must be updated whenever component files or registry dependencies change.
- `public/r/` is generated output. Never edit its JSON files manually; run `pnpm registry:build` instead.
- Keep reusable registry source imports under `@/registry/threadable`.
- Do not add application-specific dependencies to reusable components.
- Use pnpm for all project commands and dependency changes.

## Accessibility

- Preserve existing accessibility behaviour when modifying a component.
- Interactive components must include keyboard and accessibility tests in `tests/accessibility/`.
- Tests are guardrails, not proof of WCAG compliance. Review semantics, focus management, contrast, screen-reader output and real browser behaviour as part of component review.
- Keep the Vite playground representative of every public registry component and its default, disabled, invalid, overlay, theme, long-content and mobile states.

## Validation and changes

- Run `pnpm check` before completing work.
- Run `pnpm playground:build`, `pnpm test:unit`, `pnpm test:browser` and `pnpm test:axe` when changing harnessed components or accessibility behaviour.
- Document breaking changes in the relevant change notes or README documentation.
- Keep public registry items intentional and documented. Internal health checks must never be presented as public production components.
- Do not create a custom replacement for the upstream shadcn-vue CLI.
- Document breaking changes in the relevant change notes or README before completing the work.
