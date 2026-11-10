import { mount } from "@vue/test-utils";
import { defineComponent, h } from "vue";
import type { Component } from "vue";
import { describe, expect, it } from "vitest";
import { InputBlock } from "../../registry/threadable/components/blocks/input-block";
import { SelectBlock } from "../../registry/threadable/components/blocks/select-block";

const blocks: [string, Component][] = [
  ["InputBlock", InputBlock],
  ["SelectBlock", SelectBlock],
];
const ErrorContent = defineComponent({
  setup: () => () =>
    h("a", { href: "mailto:support@example.com" }, "Contact support"),
});

describe.each(blocks)("%s custom error content", (_name, Block) => {
  it.each(["component", "vnode"])(
    "forwards a %s to Field without a slot",
    async (kind) => {
      const wrapper = mount(Block, {
        props: {
          id: "custom-field",
          name: "example",
          label: "Example",
          error: "Contact support",
        },
        attrs: {
          "error-content":
            kind === "component" ? ErrorContent : h(ErrorContent),
        },
      });
      const error = wrapper.get("#custom-field-error");
      expect(error.attributes("role")).toBe("alert");
      expect(error.get("a").attributes("href")).toBe(
        "mailto:support@example.com",
      );
      expect(wrapper.get("#custom-field").attributes("aria-errormessage")).toBe(
        "custom-field-error",
      );
      expect(
        wrapper.get("#custom-field").attributes("aria-describedby"),
      ).toContain("custom-field-error");
      expect(wrapper.find("[error-content]").exists()).toBe(false);
      await wrapper.setProps({ error: undefined });
      expect(wrapper.find("#custom-field-error").exists()).toBe(false);
      expect(wrapper.find("a").exists()).toBe(false);
      wrapper.unmount();
    },
  );

  it("keeps ordinary errors as escaped text", () => {
    const message = "<strong>Invalid value</strong>";
    const wrapper = mount(Block, {
      props: {
        id: "plain-field",
        name: "example",
        label: "Example",
        error: message,
      },
    });
    expect(wrapper.get("#plain-field-error").text()).toBe(message);
    expect(wrapper.find("strong").exists()).toBe(false);
    wrapper.unmount();
  });
});
