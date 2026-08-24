import { existsSync, readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

import registry from "../../registry.json";

type RegistryItem = {
  name: string;
  type: string;
  files?: Array<{ path: string; type: string; target?: string }>;
};

const root = resolve(import.meta.dirname, "../..");
const output = resolve(root, "public/r");
const sourceItems = registry.items as RegistryItem[];

describe("generated registry output", () => {
  it("contains one generated block item for each source item", () => {
    expect(existsSync(output)).toBe(true);

    const generatedItems = readdirSync(output)
      .filter((file) => file.endsWith(".json") && file !== "registry.json")
      .map((file) => JSON.parse(readFileSync(resolve(output, file), "utf8")));

    expect(generatedItems).toHaveLength(sourceItems.length);
    expect(generatedItems.map((item) => item.name).sort()).toEqual(
      sourceItems.map((item) => item.name).sort(),
    );

    for (const item of generatedItems) {
      expect(item.type).toBe("registry:block");
      expect(item.files.length).toBeGreaterThan(0);
    }
  });

  it("keeps every declared source file represented in generated output", () => {
    for (const sourceItem of sourceItems) {
      const generated = JSON.parse(
        readFileSync(resolve(output, `${sourceItem.name}.json`), "utf8"),
      ) as RegistryItem;
      expect(generated.files?.map((file) => file.path).sort()).toEqual(
        sourceItem.files?.map((file) => file.path).sort(),
      );
    }
  });

  it("does not expose implementation-only items or local source paths", () => {
    const generatedIndex = JSON.parse(
      readFileSync(resolve(output, "registry.json"), "utf8"),
    );
    expect(
      generatedIndex.items.every(
        (item: RegistryItem) => item.type === "registry:block",
      ),
    ).toBe(true);

    const generatedJson = readdirSync(output)
      .filter((file) => file.endsWith(".json"))
      .map((file) => readFileSync(resolve(output, file), "utf8"))
      .join("\n");

    expect(generatedJson).not.toMatch(/\/Users\/[A-Za-z0-9._-]+\/Projects\//);
    expect(generatedJson).not.toMatch(/\/home\/runner\/work\//);
    expect(generatedJson).not.toMatch(/registry\/threadable\/ui/);
    expect(generatedJson).not.toMatch(/registry:(ui|hook|style)/);
  });
});
