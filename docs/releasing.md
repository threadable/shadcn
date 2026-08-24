# Releasing

Registry releases use immutable `vMAJOR.MINOR.PATCH` tags. Generated registry files are built from `registry.json` and `registry/`; never edit them by hand.

## Versioning

- Major: breaking props, events, slots, exports, file paths, registry dependencies or accessibility behaviour that requires consumer migration.
- Minor: new blocks, compatible API additions and backwards-compatible accessibility improvements.
- Patch: fixes, dependency corrections, documentation and non-breaking styling changes.

## Checklist

1. Confirm the change is merged to the default branch and review the public block catalogue.
2. Update [`CHANGELOG.md`](../CHANGELOG.md) with API, dependency, accessibility and migration notes.
3. Update the package version if release metadata changes.
4. Run `pnpm install --frozen-lockfile` and `pnpm check`.
5. Inspect every generated `public/r/*.json` item for missing files, absolute paths, unsafe code and dependency drift.
6. Create an annotated immutable tag such as `v0.2.0` only after CI is green.
7. Verify the tagged GitHub installation and hosted Pages item.

Pull requests validate only; they do not publish or deploy and do not require secrets. The default-branch workflow deploys Pages only after registry validation, unit tests, browser/axe tests, consumer installation and Laravel integration succeed.

## GitHub Pages

A maintainer must enable `Settings` → `Pages` → `GitHub Actions`. The hosted registry is:

```text
https://threadable.github.io/shadcn/r/{name}.json
```

Smoke-test a deployed block with:

```sh
curl --fail https://threadable.github.io/shadcn/r/registry.json
pnpm dlx shadcn-vue@latest add @threadable/button-block
```

Keep a versioned rollback path. Never repoint an existing release tag to different generated source.
