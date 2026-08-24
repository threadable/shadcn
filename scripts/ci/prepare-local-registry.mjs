import {
  cpSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { resolve } from "node:path";
import process from "node:process";
import { fileURLToPath, URL } from "node:url";

// Make a temporary local mirror for consumer tests. Published metadata keeps
// the real Pages URL; only this disposable copy rewrites hosted dependencies.
const [destination] = process.argv.slice(2);
const repositoryRoot = resolve(
  fileURLToPath(new URL("../..", import.meta.url)),
);

if (!destination) {
  process.stderr.write(
    "Usage: node scripts/ci/prepare-local-registry.mjs <destination>\n",
  );
  process.exit(64);
}

const siteDirectory = resolve(destination);
const registryDirectory = resolve(siteDirectory, "r");
mkdirSync(siteDirectory, { recursive: true });
cpSync(resolve(repositoryRoot, "public"), siteDirectory, { recursive: true });

for (const file of readdirSync(registryDirectory)) {
  if (!file.endsWith(".json")) {
    continue;
  }

  const path = resolve(registryDirectory, file);
  const contents = readFileSync(path, "utf8").replaceAll(
    "https://threadable.github.io/shadcn/r/",
    "http://127.0.0.1:4174/r/",
  );
  writeFileSync(path, contents);
}
