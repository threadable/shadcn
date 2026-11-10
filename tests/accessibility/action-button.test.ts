import { mount } from "@vue/test-utils";
import { Pencil } from "@lucide/vue";
import { describe, expect, it } from "vitest";
import ActionButtonBlock from "../../registry/threadable/components/blocks/action-button-block/ActionButtonBlock.vue";

describe("icon action button accessibility", () => {
  it("names its native button and prevents disabled or processing activation", async () => {
    const wrapper = mount(ActionButtonBlock, {
      props: { icon: Pencil, label: "Edit item", dataTest: "edit" },
    });
    try {
      const button = () => wrapper.get<HTMLButtonElement>("button");
      expect(button().attributes("aria-label")).toBe("Edit item");
      expect(button().attributes("type")).toBe("button");
      button().element.click();
      expect(wrapper.emitted("click")).toHaveLength(1);
      await wrapper.setProps({ disabled: true });
      expect(button().element.disabled).toBe(true);
      button().element.click();
      expect(wrapper.emitted("click")).toHaveLength(1);
      await wrapper.setProps({ disabled: false, processing: true });
      button().element.click();
      expect(button().element.disabled).toBe(true);
      expect(wrapper.emitted("click")).toHaveLength(1);
    } finally {
      wrapper.unmount();
    }
  });
  it("makes the disabled explanation focusable without enabling the action", async () => {
    const wrapper = mount(ActionButtonBlock, {
      props: {
        icon: Pencil,
        label: "Edit item",
        dataTest: "edit",
        disabled: true,
        disabledMessage: "Locked by another editor",
      },
      attachTo: document.body,
    });
    try {
      const target = wrapper.get('span[tabindex="0"]');
      expect(target.attributes("role")).toBe("group");
      expect(target.attributes("aria-label")).toContain(
        "Locked by another editor",
      );
      expect(wrapper.get<HTMLButtonElement>("button").element.disabled).toBe(
        true,
      );
    } finally {
      wrapper.unmount();
    }
  });
});
