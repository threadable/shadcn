import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("registry playground axe checks", () => {
  test("has no automated axe violations in its default state", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page.getByTestId("playground")).toBeVisible();
    const results = await new AxeBuilder({ page })
      .exclude('span[aria-hidden="true"][tabindex="0"]')
      .analyze();
    expect(results.violations).toEqual([]);
  });

  test("has no automated axe violations when a dialog is open", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByTestId("demo-dialog-trigger").click();
    await expect(page.getByRole("dialog")).toBeVisible();
    const results = await new AxeBuilder({ page })
      .exclude('span[aria-hidden="true"][tabindex="0"]')
      .analyze();
    expect(results.violations).toEqual([]);
  });
});
