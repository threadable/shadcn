import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

import registry from "../../registry.json";

type RegistryFile = {
  path: string;
  type: string;
  target?: string;
};

type RegistryItem = {
  name: string;
  type: string;
  description: string;
  registryDependencies?: string[];
  files?: RegistryFile[];
};

const root = resolve(import.meta.dirname, "../..");
const items = registry.items as RegistryItem[];
const itemNames = new Set(items.map((item) => item.name));

describe("registry metadata", () => {
  it("contains the Threadable block registry identity", () => {
    expect(registry.$schema).toBe(
      "https://shadcn-vue.com/schema/registry.json",
    );
    expect(registry.name).toBe("threadable");
    expect(registry.homepage).toBe("https://github.com/threadable/shadcn");
    expect(Array.isArray(registry.items)).toBe(true);
  });

  it("declares only public block items with existing source files", () => {
    const names = items.map((item) => item.name);

    expect(new Set(names).size).toBe(names.length);

    for (const item of items) {
      expect(item.name).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
      expect(item.type).toBe("registry:block");
      expect(item.description).toBeTruthy();
      expect(item.files?.length).toBeGreaterThan(0);

      for (const file of item.files ?? []) {
        expect(file.path.startsWith("registry/threadable/")).toBe(true);
        expect(file.type).toMatch(/^registry:(component|lib)$/);
        expect(file.target).toBeUndefined();
        expect(existsSync(resolve(root, file.path))).toBe(true);
        expect(readFileSync(resolve(root, file.path), "utf8")).toBeDefined();
      }
    }
  });

  it("resolves every Threadable registry dependency to a public block", () => {
    for (const item of items) {
      for (const dependency of item.registryDependencies ?? []) {
        if (dependency.startsWith("https://threadable.github.io/shadcn/r/")) {
          const name = dependency
            .split("/")
            .pop()
            ?.replace(/\.json$/, "");
          expect(name).toBeTruthy();
          expect(itemNames.has(name as string)).toBe(true);
          continue;
        }

        expect(dependency).toMatch(
          /^(?:[a-z0-9]+(?:-[a-z0-9]+)*|@[a-z0-9-]+\/[a-z0-9]+(?:-[a-z0-9]+)*)$/,
        );
      }
    }
  });
});
