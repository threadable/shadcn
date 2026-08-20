import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = resolve(import.meta.dirname, "../..");

describe("accessibility policy", () => {
  it("keeps the WCAG target and manual-review boundary documented", () => {
    const guidance = readFileSync(resolve(root, "AGENTS.md"), "utf8");
    const readme = readFileSync(resolve(root, "README.md"), "utf8");

    expect(guidance).toContain("WCAG 2.2 Level AA");
    expect(guidance).toContain("keyboard and accessibility tests");
    expect(readme).toContain(
      "do not by themselves establish WCAG 2.2 Level AA compliance",
    );
  });
});
