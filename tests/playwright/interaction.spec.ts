import { expect, test } from "@playwright/test";

test.describe("registry block keyboard harness", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await expect(page.getByTestId("playground")).toBeVisible();
  });

  test("exposes names, labels, error relationships and disabled states", async ({
    page,
  }) => {
    await expect(
      page.getByRole("heading", { name: "Accessible block catalogue" }),
    ).toBeVisible();
    await expect(
      page.getByRole("textbox", { name: /Email address/ }),
    ).toHaveAttribute("id", "demo-email");
    await expect(page.locator('[data-test="demo-input"]')).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    const errorId = await page
      .locator('[data-test="demo-input"]')
      .getAttribute("aria-errormessage");
    expect(errorId).toBe("demo-email-error");
    await expect(page.locator(`#${errorId}`)).toContainText(
      "Email is required",
    );
    await expect(
      page.locator('[data-test="demo-button-disabled"]'),
    ).toBeDisabled();
    await expect(
      page.locator('[data-test="demo-input-disabled"]'),
    ).toBeDisabled();
  });

  test("does not focus a closed combobox filter on initial load", async ({
    page,
  }) => {
    await page.waitForTimeout(25);

    await expect(
      page.locator('[data-testid="registry-block-combobox-group-block"] input'),
    ).not.toBeFocused();
    expect(await page.evaluate(() => window.scrollY)).toBe(0);
  });

  test("activates button blocks with Enter and Space and preserves tab order", async ({
    page,
  }) => {
    const button = page.locator('[data-test="demo-button-block"]');
    await button.focus();
    await page.keyboard.press("Enter");
    await expect(page.getByTestId("button-block-status")).toHaveText(
      "Block activated",
    );

    await button.focus();
    await page.keyboard.press("Space");
    await expect(page.getByTestId("button-block-status")).toHaveText(
      "Block activated",
    );

    await page.locator('[data-test="demo-input"]').focus();
    await page.keyboard.press("Tab");
    await expect(page.locator(":focus")).toHaveAttribute(
      "data-test",
      "demo-textarea",
    );
  });

  test("uses real keyboard sequences for confirmation focus trapping and restoration", async ({
    page,
  }) => {
    const trigger = page.getByTestId("demo-dialog-trigger");
    await trigger.focus();
    await page.keyboard.press("Enter");
    const dialog = page.getByRole("alertdialog");
    await expect(dialog).toBeVisible();
    expect(
      await dialog.evaluate((element) =>
        element.contains(document.activeElement),
      ),
    ).toBe(true);

    for (let index = 0; index < 3; index += 1) {
      await page.keyboard.press("Tab");
      expect(
        await dialog.evaluate((element) =>
          element.contains(document.activeElement),
        ),
      ).toBe(true);
    }

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test("opens and selects dropdowns and comboboxes from the keyboard", async ({
    page,
  }) => {
    const menuTrigger = page.locator('[data-test="demo-dropdown-trigger"]');
    await menuTrigger.focus();
    await page.keyboard.press("Enter");
    await expect(page.getByRole("menu")).toBeVisible();
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");
    await expect(page.getByRole("menu")).toBeHidden();
    await expect(menuTrigger).toHaveAttribute("aria-expanded", "false");

    const select = page.locator('[data-test="demo-select-trigger"]');
    await select.focus();
    await page.keyboard.press("Enter");
    const engineeringOption = page.getByRole("option", {
      name: "Engineering",
    });
    await expect(engineeringOption).toBeVisible();
    await engineeringOption.press("Enter");
    await expect(select).toContainText("Engineering");

    const combobox = page.locator('[data-test="demo-combobox"]');
    await combobox.focus();
    await page.keyboard.press("Enter");
    await expect(combobox).toHaveAttribute("aria-expanded", "true");
    const commandInput = page.locator('[data-slot="command-input"]');
    await expect(commandInput).toBeFocused();
    await commandInput.pressSequentially("Design");
    await expect(commandInput).toHaveValue("Design");
    const designOption = page.locator(
      '[data-slot="command-item"][data-value="design"]',
    );
    await expect(designOption).toBeVisible();
    await commandInput.press("ArrowDown");
    await commandInput.press("Enter");
    await expect(combobox).toContainText("Design");
  });

  test("supports reduced motion, theme changes and a mobile-width layout", async ({
    page,
  }) => {
    await page.getByTestId("theme-toggle").click();
    await expect(page.locator("html")).toHaveClass(/dark/);
    await page.getByTestId("motion-toggle").click();
    await expect(page.locator("html")).toHaveClass(/reduced-motion/);
    const transitionDuration = await page
      .locator('[data-test="demo-button-block"]')
      .evaluate((element) => getComputedStyle(element).transitionDuration);
    expect(Number.parseFloat(transitionDuration)).toBeLessThan(0.001);

    await page.setViewportSize({ width: 375, height: 800 });
    await expect(page.getByTestId("category-form-blocks")).toBeVisible();
    await expect(
      page.getByRole("combobox", { name: "Search teams" }),
    ).toBeVisible();
    await expect(
      page.getByTestId("registry-block-skeleton-block"),
    ).toBeVisible();
  });
});
