import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { PasswordBlock } from "../../registry/threadable/components/blocks/password-block";
import { AppPhoneInput } from "../../registry/threadable/components/blocks/phone-input-block";
import { PostcodeBlock } from "../../registry/threadable/components/blocks/postcode-block";

describe("new field block accessibility", () => {
  it("keeps the password toggle named, pressed, and disabled with its field", async () => {
    const wrapper = mount(PasswordBlock, {
      props: {
        id: "password",
        name: "password",
        label: "Password",
        modelValue: "secret",
        error: "Invalid",
        showPasswordLabel: "Reveal",
        hidePasswordLabel: "Conceal",
      },
    });
    const toggle = wrapper.get("button");
    expect(toggle.attributes("aria-label")).toBe("Reveal");
    expect(wrapper.get("input").attributes("aria-errormessage")).toBe(
      "password-error",
    );
    await toggle.trigger("click");
    expect(toggle.attributes("aria-label")).toBe("Conceal");
    expect(toggle.attributes("aria-pressed")).toBe("true");
    expect(wrapper.get("input").attributes("type")).toBe("text");
    await wrapper.setProps({ disabled: true });
    expect(toggle.attributes("disabled")).toBeDefined();
    wrapper.unmount();
  });
  it("names the phone country selector and associates validation text", () => {
    const wrapper = mount(AppPhoneInput, {
      props: {
        id: "phone",
        name: "phone",
        label: "Phone",
        countryCode: "GB",
        selectCountryLabel: "Choose country",
        error: "Invalid",
        disabled: true,
      },
    });
    expect(wrapper.get("button").attributes("aria-label")).toContain(
      "Choose country",
    );
    expect(wrapper.get("button").attributes("disabled")).toBeDefined();
    expect(wrapper.get("input").attributes("aria-labelledby")).toBe(
      "phone-label",
    );
    expect(wrapper.get("input").attributes("aria-errormessage")).toBe(
      "phone-error",
    );
    expect(wrapper.get("img").attributes("alt")).toBe("");
    wrapper.unmount();
  });
  it("validates postcodes on blur with custom text and gives server errors priority", async () => {
    const wrapper = mount(PostcodeBlock, {
      props: {
        id: "postcode",
        name: "postcode",
        label: "Postcode",
        countryCode: "US",
        modelValue: "ABC",
        invalidFormatMessage: "Invalid postal code",
      },
    });
    expect(wrapper.get("input").attributes("aria-invalid")).toBe("false");
    await wrapper.get("input").trigger("focusout");
    expect(wrapper.get("input").attributes("aria-invalid")).toBe("true");
    expect(wrapper.get("#postcode-error").text()).toBe("Invalid postal code");
    await wrapper.setProps({ error: "Server error" });
    expect(wrapper.get("#postcode-error").text()).toBe("Server error");
    await wrapper.setProps({ countryCode: "" });
    expect(wrapper.get("input").attributes("disabled")).toBeDefined();
    wrapper.unmount();
  });
});
