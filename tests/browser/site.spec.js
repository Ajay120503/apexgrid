import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { routes } from '../../src/lib/routes.js';
const widths = [320, 375, 390, 768, 1024, 1440, 1920, 3840];
test('every route loads directly, reloads, has unique metadata and hydrates cleanly', async ({
  page,
}) => {
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text());
  });
  const titles = new Set();
  for (const route of routes) {
    const response = await page.goto(route.path);
    expect(response.status()).toBe(route.type === '404' ? 404 : 200);
    await expect(page.locator('h1')).toHaveCount(1);
    expect(await page.locator('main').innerText()).toHaveLengthGreaterThan(100);
    const title = await page.title();
    expect(titles.has(title)).toBe(false);
    titles.add(title);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      route.description,
    );
    await page.reload();
    await expect(page.locator('h1')).toBeVisible();
  }
  expect(errors.filter((e) => !e.includes('404 (Not Found)'))).toEqual([]);
});
for (const width of widths)
  test(`no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const url of ['/', '/services/seo/', '/contact/', '/approach/']) {
      await page.goto(url);
      await page.evaluate(() => document.fonts.ready);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
      ).toBe(true);
    }
  });
test('mobile menu supports keyboard, Escape and focus restoration', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const toggle = page.locator('.mobile-menu summary');
  await toggle.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('.mobile-menu')).toHaveAttribute('open', '');
  await page.keyboard.press('Tab');
  await expect(
    page
      .getByRole('navigation', { name: 'Primary' })
      .getByRole('link', { name: 'Services', exact: true }),
  ).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(toggle).toBeFocused();
  await expect(page.locator('.mobile-menu')).not.toHaveAttribute('open', '');
  await toggle.click();
  await page
    .getByRole('navigation', { name: 'Primary' })
    .getByRole('link', { name: 'About', exact: true })
    .click();
  await expect(page.locator('.mobile-menu')).not.toHaveAttribute('open', '');
  await expect(page.locator('#about')).toBeInViewport();
});
test('skip link, native FAQ keyboard behavior and visible focus', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main')).toBeFocused();
  const summary = page.locator('.faq-list summary').first();
  await summary.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('.faq-list details').first()).toHaveAttribute('open', '');
  expect(await summary.evaluate((el) => getComputedStyle(el).outlineStyle)).not.toBe('none');
});
test('service CTA has safe preselection; contact unavailable state is honest', async ({ page }) => {
  await page.goto('/services/seo/');
  await page.getByRole('link', { name: 'Discuss your SEO goals', exact: true }).first().click();
  await expect(page).toHaveURL(/\/contact\/\?service=seo$/);
  await expect(
    page.getByText('Online enquiries are not yet available.', { exact: false }),
  ).toBeVisible();
  await expect(page.locator('form')).toHaveCount(0);
});
test('all static content and navigation work without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 375, height: 812 },
  });
  const page = await context.newPage();
  for (const route of routes) {
    await page.goto(`http://127.0.0.1:4173${route.path}`);
    await expect(page.locator('h1')).toBeVisible();
    await page.locator('.mobile-menu summary').click();
    await expect(
      page
        .getByRole('navigation', { name: 'Primary' })
        .getByRole('link', { name: 'Services', exact: true }),
    ).toBeVisible();
  }
  await page.goto('http://127.0.0.1:4173/');
  await page.locator('.faq-list summary').first().click();
  await expect(page.locator('.faq-list details').first().locator('p')).toBeVisible();
  await context.close();
});
test('unknown URLs return actual 404 and useful recovery', async ({ page }) => {
  const response = await page.goto('/not-a-real-page/');
  expect(response.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('A little off grid.');
  await page.getByRole('link', { name: 'Return home', exact: true }).click();
  await expect(page).toHaveURL('http://127.0.0.1:4173/');
});
test('reduced motion retains content and disables smooth scroll', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe(
    'auto',
  );
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('#services')).toBeVisible();
});
for (const url of ['/', '/services/seo/', '/contact/', '/approach/', '/privacy/', '/terms/'])
  test(`automated accessibility ${url}`, async ({ page }) => {
    await page.goto(url);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(results.violations).toEqual([]);
  });
test('visual evidence at mobile, tablet and desktop sizes', async ({ page }, testInfo) => {
  for (const width of [390, 768, 1440]) {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
    for (const [name, url] of [
      ['home', '/'],
      ['service', '/services/seo/'],
      ['contact', '/contact/'],
    ]) {
      await page.goto(url);
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({
        path: `qa/${name}-${width}${testInfo.project.name === 'chromium' ? '' : '-' + testInfo.project.name}.png`,
        fullPage: true,
      });
    }
  }
});
expect.extend({
  toHaveLengthGreaterThan(received, min) {
    return {
      pass: received.length > min,
      message: () => `Expected length greater than ${min}, got ${received.length}`,
    };
  },
});
test('200% zoom emulation reflows to 640 and 320 CSS pixels', async ({ browser }) => {
  for (const width of [640, 320]) {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();
    for (const url of ['/', '/services/seo/', '/contact/']) {
      await page.goto(`http://127.0.0.1:4173${url}`);
      await expect(page.locator('h1')).toBeVisible();
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
      ).toBe(true);
    }
    await context.close();
  }
});
