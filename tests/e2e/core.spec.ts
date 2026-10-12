import { expect, test } from "@playwright/test";

test("search discovers a component and opens its API page", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await page.getByRole("button", { name: "Search MotionLab" }).click();
  await page.getByPlaceholder("Search components and docs…").fill("MagneticButton");
  await page
    .locator(".command-results")
    .getByRole("link", { name: /MagneticButton/ })
    .click();

  await expect(page).toHaveURL(/\/components\/magnetic-button$/);
  await expect(page.getByRole("heading", { name: /MAGNETIC BUTTON/ })).toBeVisible();
  await expect(page.getByText("THE CONTRACT.")).toBeVisible();
});

test("playground changes a real prop and updates its generated source", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/playground?component=pressable-button");
  await page.waitForLoadState("networkidle");
  const copy = page.getByLabel("DEMO COPY");
  await expect(copy).toHaveValue("MAKE IT MOVE");
  await copy.fill("SHIP IT");
  await expect(page.locator(".generated-code code")).toContainText('"SHIP IT"');
  await page.reload();
  await page.waitForLoadState("networkidle");
  await expect(page.getByLabel("DEMO COPY")).toHaveValue("SHIP IT");

  await page.getByRole("button", { name: /PAUSE/ }).click();
  await expect(page.getByText("PREVIEW PAUSED / RESUME TO CONTINUE")).toBeVisible();
});

test("mobile navigation opens, routes, and closes", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await page.getByRole("button", { name: "Open navigation menu" }).click();
  const dialog = page.getByRole("dialog", { name: "Site navigation" });
  await expect(dialog).toBeVisible();
  await dialog.getByRole("link", { name: /Components/ }).click();

  await expect(page).toHaveURL(/\/components$/);
  await expect(page.getByRole("heading", { name: /FIND YOUR NEW MOVE/ })).toBeVisible();
  await expect(dialog).toBeHidden();
});

test("theme choice toggles and persists after reload", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  const theme = page.getByRole("button", { name: /Change theme/ });
  await theme.click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await theme.click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});

test("mobile menu closes on Escape and restores focus", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  const trigger = page.getByRole("button", { name: "Open navigation menu" });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Site navigation" });
  await expect(dialog).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("primary pages fit common mobile and desktop widths", async ({ page }) => {
  for (const path of [
    "/",
    "/components",
    "/components/magnetic-button",
    "/playground",
    "/docs/accessibility",
    "/showcase",
  ]) {
    await page.goto(path);
    await page.waitForLoadState("networkidle");
    for (const width of [320, 375, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await expect
        .poll(
          () => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
          { message: `${path} overflows at ${width}px` },
        )
        .toBe(true);
    }
  }
});

test("reduced-motion preference keeps server and client markup consistent", async ({ page }) => {
  const hydrationErrors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error" && /hydration|didn't match/i.test(message.text())) {
      hydrationErrors.push(message.text());
    }
  });
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const path of ["/", "/components", "/playground", "/showcase"]) {
    await page.goto(path);
    await page.waitForLoadState("networkidle");
  }
  expect(hydrationErrors).toEqual([]);
});
