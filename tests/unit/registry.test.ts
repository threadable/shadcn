import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

import registry from "../../registry.json";

type RegistryItem = {
  name: string;
  type: string;
  description: string;
  files?: Array<{ path: string; type: string }>;
};

const root = resolve(import.meta.dirname, "../..");
const items = registry.items as RegistryItem[];

describe("registry metadata", () => {
  it("contains the Threadable registry identity", () => {
    expect(registry.$schema).toBe(
      "https://shadcn-vue.com/schema/registry.json",
    );
    expect(registry.name).toBe("threadable");
    expect(registry.homepage).toBe("https://github.com/threadable/shadcn");
    expect(Array.isArray(registry.items)).toBe(true);
  });

  it("uses unique names and points every file at an existing source path", () => {
    const names = items.map((item) => item.name);

    expect(new Set(names).size).toBe(names.length);

    for (const item of items) {
      expect(item.name).not.toMatch(/^\//);
      expect(item.description).toBeTruthy();

      if (item.type === "registry:style") {
        expect(item.files ?? []).toHaveLength(0);
        continue;
      }

      expect(item.files?.length).toBeGreaterThan(0);

      for (const file of item.files ?? []) {
        expect(file.path.startsWith("registry/")).toBe(true);
        expect(existsSync(resolve(root, file.path))).toBe(true);
        expect(readFileSync(resolve(root, file.path), "utf8")).toBeDefined();
      }
    }
  });
});
