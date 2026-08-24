import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import App from "../../playground/src/App.vue";

const root = resolve(import.meta.dirname, "../..");

describe("interactive block accessibility contracts", () => {
  const contracts = [
    [
      "checkbox-block/CheckboxBlock.vue",
      ['role="checkbox"', "aria-required", "aria-errormessage"],
    ],
    [
      "select-block/SelectBlock.vue",
      ['tabindex="0"', "aria-invalid", "aria-describedby"],
    ],
    [
      "combobox-group-block/ComboboxGroupBlock.vue",
      ['role="combobox"', "aria-expanded", "aria-controls"],
    ],
    ["field/Field.vue", ["FieldLabel", "FieldDescription", "FieldError"]],
  ] as const;

  for (const [relativePath, markers] of contracts) {
    it(`${relativePath} retains its accessibility markers`, () => {
      const source = readFileSync(
        resolve(root, "registry/threadable/components/blocks", relativePath),
        "utf8",
      );

      for (const marker of markers) {
        expect(source).toContain(marker);
      }
    });
  }

  it("keeps playground form labels, errors and disabled states connected", () => {
    const wrapper = mount(App);
    const input = wrapper.get('[data-test="demo-input"]');

    expect(wrapper.get('label[for="demo-email"]').text()).toContain(
      "Email address",
    );
    expect(input.attributes("aria-invalid")).toBe("true");
    expect(input.attributes("aria-describedby")).toContain("demo-email-error");
    expect(
      wrapper.get('[data-test="demo-button-disabled"]').attributes("disabled"),
    ).toBeDefined();
  });
});
