import { existsSync, readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

import registry from "../../registry.json";

type RegistryItem = { name: string };

const root = resolve(import.meta.dirname, "../..");
const output = resolve(root, "public/r");
const sourceItems = registry.items as RegistryItem[];

describe("generated registry output", () => {
  it("exists and contains one generated item for each public source item", () => {
    expect(existsSync(output)).toBe(true);

    const generatedItems = readdirSync(output)
      .filter((file) => file.endsWith(".json") && file !== "registry.json")
      .map((file) => JSON.parse(readFileSync(resolve(output, file), "utf8")));

    expect(generatedItems).toHaveLength(sourceItems.length);
    expect(generatedItems.map((item) => item.name).sort()).toEqual(
      sourceItems.map((item) => item.name).sort(),
    );
  });

  it("does not expose implementation-only primitive items", () => {
    const generatedIndex = JSON.parse(
      readFileSync(resolve(output, "registry.json"), "utf8"),
    );
    const generatedNames = generatedIndex.items.map(
      (item: RegistryItem) => item.name,
    );

    expect(generatedNames).not.toContain("base-field");
    expect(generatedNames).not.toContain("base-label");
    expect(generatedNames).not.toContain("base-pagination");
    expect(generatedNames).not.toContain("base-select");
  });

  it("does not publish source-project paths or unrelated attribution text", () => {
    const generatedJson = readdirSync(output)
      .filter((file) => file.endsWith(".json"))
      .map((file) => readFileSync(resolve(output, file), "utf8"))
      .join("\n");

    expect(generatedJson).not.toMatch(/\/Users\/[A-Za-z0-9._-]+\/Projects\//);
    expect(generatedJson).not.toMatch(/@\/components\//);
  });
});
