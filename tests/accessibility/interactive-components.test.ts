import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import { useTypeaheadKeyboard } from "../../registry/threadable/composables/useTypeaheadKeyboard";
import App from "../../playground/src/App.vue";

const root = resolve(import.meta.dirname, "../..");

describe("Threadable keyboard behaviour", () => {
  it("wraps typeahead selection in both directions and resets it", () => {
    const keyboard = useTypeaheadKeyboard();

    expect(keyboard.currentIndex("products")).toBe(-1);
    keyboard.setForLength("products", 3);
    expect(keyboard.currentIndex("products")).toBe(0);
    expect(keyboard.move("products", "prev", 3)).toBe(2);
    expect(keyboard.move("products", "next", 3)).toBe(0);
    expect(keyboard.selectedOrFirst("products", ["one", "two", "three"])).toBe(
      "one",
    );
    keyboard.reset("products");
    expect(keyboard.currentIndex("products")).toBe(-1);
  });

  it("keeps an empty typeahead collection inactive", () => {
    const keyboard = useTypeaheadKeyboard();

    keyboard.setForLength("empty", 0);
    expect(keyboard.currentIndex("empty")).toBe(-1);
    expect(keyboard.move("empty", "next", 0)).toBe(-1);
    expect(keyboard.selectedOrFirst("empty", [])).toBeUndefined();
  });
});

describe("interactive accessibility contracts", () => {
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
    [
      "typeahead-input/TypeaheadInput.vue",
      ["@keydown.enter", "@keydown.down", "@keydown.up"],
    ],
  ] as const;

  for (const [relativePath, markers] of contracts) {
    it(`${relativePath} retains its accessibility markers`, () => {
      const source = readFileSync(
        resolve(root, "registry/threadable/ui", relativePath),
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
      wrapper
        .get('[data-testid="demo-button-disabled"]')
        .attributes("disabled"),
    ).toBeDefined();
  });
});
