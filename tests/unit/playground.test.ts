import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import App from "../../playground/src/App.vue";

describe("registry playground", () => {
  it("renders the public component coverage index", () => {
    const wrapper = mount(App, { attachTo: document.body });

    expect(wrapper.find('[data-testid="playground"]').exists()).toBe(true);
    expect(wrapper.get("h1").text()).toContain("Threadable registry");
    expect(wrapper.get('[data-test="demo-input"]').attributes("id")).toBe(
      "demo-email",
    );
    expect(
      wrapper
        .get('[data-testid="demo-button-disabled"]')
        .attributes("disabled"),
    ).toBeDefined();
    expect(wrapper.findAll('[data-testid^="registry-component-"]').length).toBe(
      95,
    );
  });

  it("preserves labelled invalid form relationships", () => {
    const wrapper = mount(App);
    const input = wrapper.get('[data-test="demo-input"]');
    const label = wrapper.get('label[for="demo-email"]');

    expect(label.text()).toContain("Email address");
    expect(input.attributes("aria-invalid")).toBe("true");
    expect(input.attributes("aria-describedby")).toContain("demo-email-error");
    expect(wrapper.get("#demo-email-error").text()).toContain(
      "Email is required",
    );
  });

  it("labels every tile and keeps button demos state-isolated", async () => {
    const wrapper = mount(App);
    const tiles = wrapper.findAll('[data-testid^="registry-component-"]');

    expect(tiles).toHaveLength(95);
    for (const tile of tiles) {
      expect(tile.attributes("data-component")).toBe(
        tile.attributes("data-testid")?.replace("registry-component-", ""),
      );
    }

    await wrapper.get('[data-testid="demo-button"]').trigger("click");
    expect(wrapper.get('[data-testid="button-status"]').text()).toContain(
      "Button activated",
    );
    expect(wrapper.get('[data-testid="button-block-status"]').text()).toContain(
      "No action yet",
    );

    await wrapper
      .get('[data-testid="registry-component-button-block"] button')
      .trigger("click");
    expect(wrapper.get('[data-testid="button-block-status"]').text()).toContain(
      "Block activated",
    );
    expect(wrapper.get('[data-testid="button-status"]').text()).toContain(
      "Button activated",
    );
  });
});
