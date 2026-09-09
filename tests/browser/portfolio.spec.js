import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('portfolio filters, original comparison and keyboard dismissal work', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.work-card')).toHaveCount(6);
  await page.getByRole('button', { name: 'Packaging1' }).click();
  await expect(page.locator('.work-card')).toHaveCount(1);
  const trigger = page.locator('.work-card .artwork-frame');
  await trigger.click();
  const viewer = page.getByRole('dialog');
  await expect(viewer).toBeVisible();
  await page.getByRole('button', { name: 'Original', exact: true }).click();
  await expect(viewer.locator('.artwork-view img')).toHaveAttribute('src', /-original-/);
  await page.getByRole('button', { name: 'Refined', exact: true }).click();
  await expect(viewer.locator('.artwork-view img')).not.toHaveAttribute('src', /-original-/);
  expect((await new AxeBuilder({ page }).include('.artwork-dialog').analyze()).violations).toEqual(
    [],
  );
  await page.keyboard.press('Escape');
  await expect(viewer).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await page.getByRole('button', { name: 'All6' }).click();
  await expect(page.locator('.work-card')).toHaveCount(6);
});

test('all six artworks remain available without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4173/');
  await expect(page.locator('.work-card')).toHaveCount(6);
  const href = await page.locator('.work-card .artwork-frame').first().getAttribute('href');
  expect((await page.request.get(href)).status()).toBe(200);
  await context.close();
});
