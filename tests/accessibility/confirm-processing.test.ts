import { mount, flushPromises } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import ConfirmDialogBlock from "../../registry/threadable/components/blocks/confirm-dialog-block/ConfirmDialogBlock.vue";

describe("confirmation processing state", () => {
  it("blocks confirmation while processing and allows it when processing finishes", async () => {
    const wrapper = mount(ConfirmDialogBlock, {
      props: {
        open: true,
        description: "Confirm this action",
        processing: true,
        dataTest: "confirm",
      },
      attachTo: document.body,
    });
    try {
      await flushPromises();
      const action = document.querySelector<HTMLButtonElement>(
        '[data-test="confirm-confirm"]',
      )!;
      const cancel = document.querySelector<HTMLButtonElement>(
        '[data-test="confirm-cancel"]',
      )!;
      expect(action.disabled).toBe(true);
      expect(cancel.disabled).toBe(false);
      action.click();
      expect(wrapper.emitted("confirm")).toBeUndefined();
      await wrapper.setProps({ processing: false });
      expect(action.disabled).toBe(false);
      action.click();
      expect(wrapper.emitted("confirm")).toHaveLength(1);
    } finally {
      wrapper.unmount();
    }
  });
});
