import { expect, test } from "@playwright/test";

test.describe("registry playground keyboard harness", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await expect(page.getByTestId("playground")).toBeVisible();
  });

  test("exposes names, labels, error relationships and disabled states", async ({
    page,
  }) => {
    await expect(
      page.getByRole("heading", { name: "Threadable registry" }),
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
    await expect(page.getByTestId("demo-button-disabled")).toBeDisabled();
    await expect(
      page.locator('[data-test="demo-select-disabled"]'),
    ).toBeDisabled();
  });

  test("does not focus the embedded command filter on initial load", async ({
    page,
  }) => {
    await page.waitForTimeout(25);

    await expect(
      page.locator('[data-testid="registry-component-command"] input'),
    ).not.toBeFocused();
    expect(await page.evaluate(() => window.scrollY)).toBe(0);
  });

  test("activates buttons with Enter and Space and preserves tab order", async ({
    page,
  }) => {
    const button = page.getByTestId("demo-button");
    await button.focus();
    await page.keyboard.press("Enter");
    await expect(page.getByTestId("button-status")).toHaveText(
      "Button activated",
    );

    await button.focus();
    await page.keyboard.press("Space");
    await expect(page.getByTestId("button-status")).toHaveText(
      "Button activated",
    );

    await page.locator('[data-test="demo-input"]').focus();
    await page.keyboard.press("Tab");
    await expect(page.locator(":focus")).toHaveAttribute(
      "data-test",
      "demo-textarea",
    );
  });

  test("uses real keyboard sequences for dialog focus trapping and restoration", async ({
    page,
  }) => {
    const trigger = page.getByTestId("demo-dialog-trigger");
    await trigger.focus();
    await page.keyboard.press("Enter");
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    const initialFocusIsTrapped = await dialog.evaluate((element) =>
      element.contains(document.activeElement),
    );
    expect(initialFocusIsTrapped).toBe(true);
    const initialFocusedTag = await page
      .locator(":focus")
      .evaluate((element) => element.tagName);
    await page.keyboard.press("Tab");
    const nextFocusedTag = await page
      .locator(":focus")
      .evaluate((element) => element.tagName);
    expect(nextFocusedTag).not.toBe(initialFocusedTag);
    for (let index = 0; index < 4; index += 1) {
      expect(
        await dialog.evaluate((element) =>
          element.contains(document.activeElement),
        ),
      ).toBe(true);
      await page.keyboard.press("Tab");
    }

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test("opens and dismisses dropdowns, popovers and tooltips from the keyboard", async ({
    page,
  }) => {
    const menuTrigger = page.getByTestId("demo-dropdown-trigger");
    await menuTrigger.focus();
    await page.keyboard.press("Enter");
    await expect(page.getByRole("menu")).toBeVisible();
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");
    await expect(page.getByRole("menu")).toBeHidden();
    await expect(menuTrigger).toHaveAttribute("aria-expanded", "false");

    const popoverTrigger = page.getByTestId("demo-popover-trigger");
    await popoverTrigger.focus();
    await page.keyboard.press("Enter");
    await expect(
      page.getByText(/Popover content with a deliberately long sentence/),
    ).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(
      page.getByText(/Popover content with a deliberately long sentence/),
    ).toBeHidden();

    const tooltipTrigger = page.getByTestId("demo-tooltip-trigger");
    await tooltipTrigger.hover();
    await tooltipTrigger.focus();
    const tooltip = page.locator('[data-slot="tooltip-content"]');
    await expect(tooltip).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(tooltip).toBeHidden();
  });

  test("uses keyboard selection for select, combobox and tabs", async ({
    page,
  }) => {
    const select = page.locator('[data-test="demo-select-trigger"]');
    await select.focus();
    await expect(select).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(
      page.getByRole("option").filter({ hasText: "Engineering" }),
    ).toBeVisible();
    const engineeringOption = page
      .getByRole("listbox")
      .getByRole("option", { name: "Engineering" });
    await engineeringOption.focus();
    await expect(engineeringOption).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(select).toContainText("Engineering");
    await expect(page.locator('[data-slot="select-content"]')).toBeHidden();

    const combobox = page.locator('[data-test="demo-combobox"]');
    await combobox.focus();
    await expect(combobox).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(combobox).toHaveAttribute("aria-expanded", "true");
    await expect(
      page.getByRole("dialog").getByRole("option", { name: "Engineering" }),
    ).toBeVisible();
    const designOption = page
      .getByRole("dialog")
      .getByRole("option", { name: "Design" });
    await designOption.focus();
    await expect(designOption).toBeFocused();
    await designOption.press("Enter");
    await expect(combobox).toContainText(/Design|Engineering/);
    await expect(page.getByRole("dialog")).toBeHidden();

    const activityTab = page.getByTestId("demo-tab-activity");
    const overviewTab = page.getByTestId("demo-tab-overview");
    await overviewTab.focus();
    await expect(overviewTab).toBeFocused();
    await page.keyboard.press("ArrowRight");
    await expect(activityTab).toBeFocused();
    await expect(activityTab).toHaveAttribute("aria-selected", "true");
    await expect(
      page.getByText("Activity content", { exact: true }),
    ).toBeVisible();
  });

  test("supports reduced motion, theme changes and a mobile-width layout", async ({
    page,
  }) => {
    await page.getByTestId("theme-toggle").click();
    await expect(page.locator("html")).toHaveClass(/dark/);
    await page.getByTestId("motion-toggle").click();
    await expect(page.locator("html")).toHaveClass(/reduced-motion/);
    const animationDuration = await page
      .getByTestId("registry-component-loading-spinner")
      .locator("svg")
      .evaluate((element) => getComputedStyle(element).animationDuration);
    expect(Number.parseFloat(animationDuration)).toBeLessThan(0.001);

    await page.setViewportSize({ width: 375, height: 800 });
    await expect(
      page.getByTestId("registry-component-tabs-select"),
    ).toBeVisible();
    await expect(
      page.getByRole("combobox", { name: "Select section" }),
    ).toBeVisible();
    await expect(
      page.getByTestId("registry-component-datatable"),
    ).toBeVisible();
  });
});
