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
    await expect(page.getByRole("alertdialog")).toBeVisible();
    const results = await new AxeBuilder({ page })
      .exclude('span[aria-hidden="true"][tabindex="0"]')
      .analyze();
    expect(results.violations).toEqual([]);
  });
});

for (const example of [
  {
    name: "single calendar",
    trigger: "demo-calendar",
    title: "Appointment date",
    mobile: false,
  },
  {
    name: "range calendar",
    trigger: "demo-range-calendar",
    title: "Travel dates",
    mobile: false,
  },
  {
    name: "mobile range calendar",
    trigger: "demo-range-calendar",
    title: "Travel dates",
    mobile: true,
  },
]) {
  test(`${example.name} overlay has no automated axe violations in dark theme`, async ({
    page,
  }) => {
    if (example.mobile) await page.setViewportSize({ width: 375, height: 800 });
    await page.goto("/");
    await page.getByTestId("theme-toggle").click();
    await page.locator(`[data-test="${example.trigger}"]`).click();
    await expect(
      page.getByRole("dialog", { name: example.title }),
    ).toBeVisible();
    const results = await new AxeBuilder({ page })
      .include('[role="dialog"]')
      .analyze();
    expect(results.violations).toEqual([]);
  });
}
