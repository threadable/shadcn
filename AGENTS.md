# Contribution instructions

These rules apply to future contributors and Codex runs.

This repository contains Threadable's shadcn-vue block registry for Laravel applications using Inertia, Vue 3, TypeScript and Tailwind CSS v4. The accessibility target is WCAG 2.2 Level AA as a design and review goal, not an automated certification.

## Source and generated files

- `registry/` is the source of truth.
- `registry.json` must be updated whenever block files or registry dependencies change.
- `public/r/` is generated output. Never edit its JSON files manually; run `pnpm registry:build` instead.
- Public registry items are blocks. Use `registry/threadable/components/blocks/<name>/` for block source; keep internal implementation files inside their owning block.
- Keep Threadable-owned source imports under `@/registry/threadable`. Upstream shadcn-vue primitives are consumer dependencies and may use the consuming project's `@/components/ui/*` aliases.
- Do not add application-specific dependencies to reusable blocks.
- Use pnpm for all project commands and dependency changes.
- Upstream shadcn-vue primitives belong only to the development playground fixture. Update them with the official CLI through `pnpm upstream:sync`; do not copy them into the public registry.

## Accessibility

- Preserve existing accessibility behaviour when modifying a block.
- Interactive blocks must include keyboard and accessibility tests in `tests/accessibility/`.
- Tests are guardrails, not proof of WCAG compliance. Review semantics, focus management, contrast, screen-reader output and real browser behaviour as part of component review.
- Keep the Vite playground representative of every public registry block and its default, disabled, invalid, overlay, theme, long-content and mobile states. Each block demo must own its props and model bindings.

## Validation and changes

- Run `pnpm check` before completing work.
- Run `pnpm playground:build`, `pnpm test:unit`, `pnpm test:browser` and `pnpm test:axe` when changing harnessed blocks or accessibility behaviour.
- Document breaking changes in the relevant change notes or README documentation.
- Keep public registry items intentional and documented. Internal health checks must never be presented as public production blocks.
- Do not create a custom replacement for the upstream shadcn-vue CLI.
- Document breaking changes in the relevant change notes or README before completing the work.
