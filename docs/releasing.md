# Releasing

Releases of Threadable's registry are immutable Git tags in `vMAJOR.MINOR.PATCH` form. Consumers can install a generated item from a tag, for example:

```sh
pnpm dlx shadcn-vue@latest add https://raw.githubusercontent.com/threadable/shadcn/v0.1.0/public/r/button.json
```

## Versioning

- Major: breaking props, events, slots, exports, file paths, registry dependency changes that require consumer work, or intentional accessibility-behaviour changes that need migration.
- Minor: new public items, backwards-compatible props/events/slots, new optional variants and compatible accessibility improvements.
- Patch: bug fixes, dependency fixes, documentation and non-breaking styling corrections.

When in doubt, prefer the version that gives consumers a safe migration boundary. A public item is an API even when it is copied into the consumer repository.

## Release checklist

1. Confirm the change is merged to the default branch and the working tree contains no unrelated edits.
2. Update [`CHANGELOG.md`](../CHANGELOG.md) with the item-level API, dependency, accessibility and migration notes.
3. Update `package.json`'s version when the repository release metadata changes.
4. Verify `registry.json`, source files and component documentation agree. Ensure generated output is not manually edited.
5. Run the full check with the supported Node and pnpm versions:

   ```sh
   pnpm install --frozen-lockfile
   pnpm check
   ```

6. Inspect every generated `public/r/*.json` file for missing files, absolute paths, application-specific code, wrong dependencies and unintended API changes.
7. Run a clean public consumer installation and the Laravel integration checks when the release changes source or dependencies.
8. Create the annotated tag, such as `v0.2.0`, only after CI is green.
9. Push the tag through the normal maintainer workflow and verify that the tagged `public/r` files are accessible.

Pull requests must not publish or deploy and must not require repository secrets. A release should be performed by an authorised maintainer from the protected default branch.

## Hosted registry

This repository currently documents the public GitHub installation path. If a hosted `@threadable` endpoint is introduced, publish the generated files from the release tag, verify the namespace mapping and test:

```sh
pnpm dlx shadcn-vue@latest add @threadable/button
```

The hosted endpoint must be versionable or otherwise provide an explicit rollback path. Do not silently repoint an existing tag to different generated source.
