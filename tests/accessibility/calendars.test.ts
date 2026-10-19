import { mount } from "@vue/test-utils";
import { CalendarDate } from "@internationalized/date";
import { describe, expect, it } from "vitest";
import CalendarBlock from "../../registry/threadable/components/blocks/calendar-block/CalendarBlock.vue";
import RangeCalendarBlock from "../../registry/threadable/components/blocks/range-calendar-block/RangeCalendarBlock.vue";

const content = { template: "<div><slot /></div>" };
const calendar = {
  name: "Calendar",
  template: "<div />",
  emits: ["update:modelValue"],
};
const rangeCalendar = {
  name: "RangeCalendarView",
  template: "<div />",
  emits: ["update:modelValue"],
};

describe("calendar field accessibility and confirmation", () => {
  it("commits a date only on Apply and clears an initial default", async () => {
    const wrapper = mount(CalendarBlock, {
      props: {
        id: "date",
        name: "date",
        label: "Date",
        defaultValue: new CalendarDate(2026, 10, 12),
        error: "Confirm date",
        clearLabel: "Reset",
        applyLabel: "Save",
      },
      global: { stubs: { DialogContent: content, Calendar: calendar } },
    });
    const trigger = wrapper.get("#date");
    expect(trigger.attributes("type")).toBe("button");
    expect(trigger.attributes("aria-labelledby")).toBe("date-label date-value");
    expect(trigger.attributes("aria-errormessage")).toBe("date-error");
    wrapper
      .findComponent({ name: "Calendar" })
      .vm.$emit("update:modelValue", new CalendarDate(2026, 10, 13));
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("update:modelValue")).toBeUndefined();
    expect(trigger.text()).toContain("12-10-2026");
    await wrapper
      .findAll("button")
      .find((button) => button.text() === "Save")!
      .trigger("click");
    expect(wrapper.emitted("apply")?.[0]?.[0]?.toString()).toBe("2026-10-13");
    await wrapper
      .findAll("button")
      .find((button) => button.text() === "Reset")!
      .trigger("click");
    expect(wrapper.emitted("clear")).toHaveLength(1);
    expect(trigger.text()).toContain("Pick a date");
    wrapper.unmount();
  });
  it("requires a complete range to Apply and disables processing fields", async () => {
    const wrapper = mount(RangeCalendarBlock, {
      props: {
        id: "range",
        name: "range",
        label: "Travel",
        defaultValue: {
          start: new CalendarDate(2026, 10, 12),
          end: new CalendarDate(2026, 10, 15),
        },
      },
      global: {
        stubs: { PopoverContent: content, RangeCalendarView: rangeCalendar },
      },
    });
    wrapper
      .findComponent({ name: "RangeCalendarView" })
      .vm.$emit("update:modelValue", {
        start: new CalendarDate(2026, 10, 13),
        end: undefined,
      });
    await wrapper.vm.$nextTick();
    expect(
      wrapper
        .get('[data-test="range-calendar-block-apply-button"]')
        .attributes("disabled"),
    ).toBeDefined();
    expect(wrapper.emitted("update:modelValue")).toBeUndefined();
    await wrapper
      .get('[data-test="range-calendar-block-clear-button"]')
      .trigger("click");
    expect(wrapper.get("#range").text()).toContain("Pick a date range");
    await wrapper.setProps({ processing: true });
    expect(wrapper.get("#range").attributes("disabled")).toBeDefined();
    wrapper.unmount();
  });
});
