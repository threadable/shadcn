import { readFileSync } from "node:fs";
import { fileURLToPath, URL } from "node:url";
import process from "node:process";
import { spawnSync } from "node:child_process";
import { resolve } from "node:path";

// This intentionally orchestrates the official shadcn-vue CLI; it is not a replacement CLI.
const [consumerDirectory, ...requestedItems] = process.argv.slice(2);
const repositoryRoot = resolve(
  fileURLToPath(new URL("../..", import.meta.url)),
);

if (!consumerDirectory) {
  process.stderr.write(
    "Usage: node scripts/ci/install-registry-items.mjs <consumer-directory> [item ...]\n",
  );
  process.exit(64);
}

const registry = JSON.parse(
  readFileSync(resolve(repositoryRoot, "registry.json"), "utf8"),
);
const publicNames = new Set(
  registry.items
    .filter((item) => item.type !== "registry:internal")
    .map((item) => item.name),
);
const names = requestedItems.length
  ? requestedItems.map((item) => item.replace(/^@threadable\//, ""))
  : [...publicNames];
const executable = process.platform === "win32" ? "pnpm.cmd" : "pnpm";

for (const name of names) {
  if (!publicNames.has(name)) {
    process.stderr.write(`Unknown public registry item: ${name}\n`);
    process.exit(64);
  }

  process.stdout.write(`Installing @threadable/${name}\n`);
  const result = spawnSync(
    executable,
    [
      "exec",
      "shadcn-vue",
      "add",
      "--cwd",
      consumerDirectory,
      "--yes",
      "--overwrite",
      `@threadable/${name}`,
    ],
    {
      cwd: repositoryRoot,
      env: { ...process.env, CI: process.env.CI ?? "true" },
      stdio: "inherit",
    },
  );

  if (result.error) {
    throw result.error;
  }
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}
