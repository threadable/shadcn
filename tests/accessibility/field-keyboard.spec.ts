import { expect, test } from "@playwright/test";

test("new fields support password keyboard toggling, country selection, and postcode validation", async ({
  page,
}) => {
  await page.goto("/");
  const password = page.locator('[data-test="demo-password"]');
  const toggle = page.locator('[data-test="demo-password-toggle"]');
  await password.focus();
  await page.keyboard.press("Tab");
  await expect(toggle).toBeFocused();
  await page.keyboard.press("Space");
  await expect(password).toHaveAttribute("type", "text");
  await expect(toggle).toHaveAttribute("aria-label", "Hide password");
  await page.keyboard.press("Enter");
  await expect(password).toHaveAttribute("type", "password");
  await expect(
    page.locator('[data-test="demo-password-disabled-toggle"]'),
  ).toBeDisabled();

  const tile = page.getByTestId("registry-block-phone-input-block");
  const country = tile.getByRole("button", { name: /Select country/ }).first();
  await country.focus();
  await page.keyboard.press("Enter");
  const search = page.getByRole("textbox", { name: "Search country" });
  await expect(search).toBeFocused();
  await search.fill("France");
  await search.press("ArrowDown");
  await search.press("Enter");
  await expect(page.locator('[data-test="demo-phone"]')).toBeFocused();
  await expect(country).toHaveAttribute("aria-label", /France/);
  await country.focus();
  await country.press("Enter");
  await search.press("Escape");
  await expect(country).toBeFocused();

  const postcode = page.locator('[data-test="demo-postcode"]');
  await page.locator("#demo-postcode-country").selectOption("US");
  await postcode.fill("123");
  await postcode.press("Tab");
  await expect(postcode).toHaveAttribute("aria-invalid", "true");
  await expect(page.locator("#demo-postcode-error")).toHaveText(
    "Enter a valid postcode for the selected country",
  );
  await postcode.fill("12345");
  await postcode.press("Tab");
  await expect(postcode).toHaveAttribute("aria-invalid", "false");
  await page.locator("#demo-postcode-country").selectOption("");
  await expect(postcode).toBeDisabled();
});
