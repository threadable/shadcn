# Security policy

The registry installation model copies source code and dependency metadata into a consuming application. A registry item is not a sandbox. Treat every registry URL, including this one, as third-party code.

Before installing an item:

- Review the generated JSON and every copied source file.
- Check npm dependencies and registry dependencies for unexpected packages or application coupling.
- Prefer a reviewed immutable tag for production installation.
- Run installation and builds in a controlled environment; never expose secrets to an unreviewed registry item.
- Do not execute scripts from copied code until they have been inspected.

## Reporting a vulnerability

Do not disclose exploitable details in a public issue. Use GitHub's private security advisory flow for `threadable/shadcn` if it is enabled. If that flow is unavailable, contact the repository maintainers privately through the GitHub organisation and include:

- A short description and affected item or release.
- Reproduction steps or a minimal proof of concept.
- Impact, attack preconditions and whether secrets or consumer data may be exposed.
- A suggested mitigation, if known.

Please allow maintainers reasonable time to investigate and release a fix before public disclosure. Do not include credentials, tokens, customer data or other secrets in a report.

This policy covers the registry source and generated registry metadata. Vulnerabilities in a consumer application's integration, Laravel deployment or third-party dependency should also be reported to the affected project.
