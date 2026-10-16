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

test("calendar drafts cancel with Escape, apply, clear and restore focus", async ({
  page,
}) => {
  await page.goto("/");
  const trigger = page.locator('[data-test="demo-calendar"]');
  await trigger.focus();
  await trigger.press("Enter");
  const dialog = page.getByRole("dialog", { name: "Appointment date" });
  await expect(dialog).toBeVisible();
  const start = dialog.locator('[data-value="2026-10-12"]').first();
  await expect(start).toBeFocused();
  await start.press("ArrowRight");
  await page.keyboard.press("Enter");
  await expect(page.getByTestId("calendar-model")).toHaveText("2026-10-12");
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await expect(trigger).toContainText("12-10-2026");
  await trigger.press("Space");
  await expect(start).toBeFocused();
  await start.press("ArrowRight");
  await page.keyboard.press("Space");
  await dialog.getByRole("button", { name: "Apply", exact: true }).focus();
  await page.keyboard.press("Enter");
  await expect(page.getByTestId("calendar-model")).toHaveText("2026-10-13");
  await expect(trigger).toBeFocused();
  await trigger.press("Enter");
  await dialog
    .getByRole("button", { name: "Clear", exact: true })
    .press("Enter");
  await expect(page.getByTestId("calendar-model")).toHaveText("No date");
  await expect(trigger).toBeFocused();
  await expect(
    page.locator('[data-test="demo-calendar-disabled"]'),
  ).toBeDisabled();
});

test("range calendar selects endpoints and traps focus in its mobile dialog", async ({
  page,
}) => {
  await page.goto("/");
  const trigger = page.locator('[data-test="demo-range-calendar"]');
  await trigger.focus();
  await trigger.press("Enter");
  const overlay = page.getByRole("dialog", { name: "Travel dates" });
  await expect(overlay).toBeVisible();
  const start = overlay.locator('[data-value="2026-10-12"]').first();
  await expect(start).toBeFocused();
  await start.press("ArrowRight");
  await page.keyboard.press("Enter");
  await expect(
    overlay.getByRole("button", { name: "Apply", exact: true }),
  ).toBeDisabled();
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("Enter");
  await overlay
    .getByRole("button", { name: "Apply", exact: true })
    .press("Enter");
  await expect(page.getByTestId("range-calendar-model")).toHaveText(
    "2026-10-13 / 2026-10-15",
  );
  await expect(trigger).toBeFocused();
  await page.setViewportSize({ width: 375, height: 800 });
  await trigger.press("Enter");
  await expect(overlay).toBeVisible();
  await overlay.getByRole("button", { name: "Clear", exact: true }).focus();
  for (let index = 0; index < 5; index++) {
    await page.keyboard.press("Tab");
    expect(
      await overlay.evaluate((element) =>
        element.contains(document.activeElement),
      ),
    ).toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await trigger.press("Enter");
  await overlay
    .getByRole("button", { name: "Clear", exact: true })
    .press("Enter");
  await expect(page.getByTestId("range-calendar-model")).toHaveText(
    "No start / No end",
  );
  await expect(
    page.locator('[data-test="demo-range-calendar-disabled"]'),
  ).toBeDisabled();
});

test("processing confirmation disables its action and skips it in the tab order", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByTestId("demo-confirm-processing").check();
  const trigger = page.getByTestId("demo-dialog-trigger");
  await trigger.press("Enter");
  const dialog = page.getByRole("alertdialog");
  const action = dialog.getByRole("button", { name: "Delete", exact: true });
  const cancel = dialog.getByRole("button", { name: "Cancel", exact: true });
  await expect(action).toBeDisabled();
  await expect(cancel).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(cancel).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await page.getByTestId("demo-confirm-processing").uncheck();
  await trigger.press("Enter");
  await expect(action).toBeEnabled();
  await cancel.press("Tab");
  await expect(action).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(dialog).toBeHidden();
});

test("icon actions support keyboard activation, tooltips and disabled explanations", async ({
  page,
}) => {
  await page.goto("/");
  const action = page.locator('[data-test="demo-action-button"]');
  await action.scrollIntoViewIfNeeded();
  await action.focus();
  await page.keyboard.press("Shift+Tab");
  await page.keyboard.press("Tab");
  await expect(action).toBeFocused();
  await expect(page.locator('[data-slot="tooltip-content"]')).toContainText(
    "Edit item",
  );
  await page.keyboard.press("Escape");
  await expect(page.locator('[data-slot="tooltip-content"]')).toBeHidden();
  await page.keyboard.press("Enter");
  await expect(page.getByTestId("action-button-status")).toHaveText(
    "Edit activated",
  );
  await action.press("Space");
  await expect(page.getByTestId("button-block-status")).toHaveText(
    "No action yet",
  );
  const disabled = page.locator('[data-test="demo-action-disabled"]');
  await expect(disabled).toBeDisabled();
  const explanation = disabled.locator('xpath=ancestor::span[@tabindex="0"]');
  await explanation.focus();
  await expect(page.locator('[data-slot="tooltip-content"]')).toContainText(
    "This item is locked",
  );
  await explanation.press("Enter");
  await expect(disabled).toBeDisabled();
  await page.keyboard.press("Escape");
  await expect(page.locator('[data-slot="tooltip-content"]')).toBeHidden();
  await page.getByTestId("demo-action-processing-toggle").check();
  await expect(action).toBeDisabled();
  await page.getByTestId("demo-action-processing-toggle").uncheck();
  await expect(action).toBeEnabled();
});
