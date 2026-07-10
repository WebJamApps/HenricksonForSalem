/**
 * @file campaign.spec.ts
 * @description Playwright end-to-end test suite for desktop and mobile viewports.
 */

import { test, expect } from '@playwright/test';

test.describe('Campaign Site - Desktop', () => {
  test.beforeEach(async ({ page, isMobile }) => {
    if (!isMobile) {
      await page.goto('/');
    }
  });

  test('should render hero and footer social links', async ({ page, isMobile }) => {
    if (isMobile) return;

    // Hero renders
    const heroTitle = page.locator('.hero-title');
    await expect(heroTitle).toBeVisible();
    await expect(heroTitle).toContainText('Mark Henrickson');

    // Footer social links present
    const facebookLink = page.locator('a[aria-label="Facebook"]');
    const youtubeLink = page.locator('a[aria-label="YouTube"]');
    const instagramLink = page.locator('a[aria-label="Instagram"]');
    await expect(facebookLink).toBeVisible();
    await expect(youtubeLink).toBeVisible();
    await expect(instagramLink).toBeVisible();
  });

  test('should not show hamburger menu and should have functional inline nav and theme toggle', async ({ page, isMobile }) => {
    if (isMobile) return;

    // No hamburger
    const hamburger = page.locator('.hamburger-btn');
    await expect(hamburger).not.toBeVisible();

    // Inline nav visible
    const navLinks = page.locator('.nav-links');
    await expect(navLinks).toBeVisible();

    // Theme toggle visible and working
    const html = page.locator('html');
    await expect(html).toHaveAttribute('data-theme', 'light');

    const themeToggle = page.locator('.theme-toggle-btn');
    await expect(themeToggle).toBeVisible();

    await themeToggle.click();
    await expect(html).toHaveAttribute('data-theme', 'dark');

    await themeToggle.click();
    await expect(html).toHaveAttribute('data-theme', 'light');
  });
});

test.describe('Campaign Site - Mobile', () => {
  test.beforeEach(async ({ page, isMobile }) => {
    if (isMobile) {
      await page.goto('/');
    }
  });

  test('should render hero and footer social links on mobile', async ({ page, isMobile }) => {
    if (!isMobile) return;

    // Hero renders
    const heroTitle = page.locator('.hero-title');
    await expect(heroTitle).toBeVisible();

    // Footer social links present
    const facebookLink = page.locator('a[aria-label="Facebook"]');
    await expect(facebookLink).toBeVisible();
  });

  test('should support mobile hamburger menu, links, escape key and theme toggling with persistence', async ({ page, isMobile }) => {
    if (!isMobile) return;

    const html = page.locator('html');
    const hamburger = page.locator('.hamburger-btn');
    const drawer = page.locator('.mobile-drawer');

    // Hamburger is visible
    await expect(hamburger).toBeVisible();
    // Drawer is hidden initially
    await expect(drawer).not.toBeVisible();

    // Opens drawer
    await hamburger.click();
    await expect(drawer).toBeVisible();
    await expect(hamburger).toHaveAttribute('aria-expanded', 'true');

    // Theme toggle inside drawer switches theme and persists
    const mobileThemeToggle = page.locator('.mobile-theme-toggle-btn');
    await expect(mobileThemeToggle).toBeVisible();
    await expect(html).toHaveAttribute('data-theme', 'light');

    await mobileThemeToggle.click();
    await expect(html).toHaveAttribute('data-theme', 'dark');

    // Reload page to verify persistence in localStorage
    await page.reload();
    await expect(html).toHaveAttribute('data-theme', 'dark');

    // Toggle back to light and verify
    await hamburger.click(); // Re-open since reload closed it
    await mobileThemeToggle.click();
    await expect(html).toHaveAttribute('data-theme', 'light');
    await page.reload();
    await expect(html).toHaveAttribute('data-theme', 'light');

    // Nav links scroll to sections and close menu
    await hamburger.click(); // Re-open menu
    const meetMarkLink = page.locator('.mobile-drawer-link:has-text("Meet Mark")');
    await meetMarkLink.click();
    await expect(drawer).not.toBeVisible();

    // Verify page has scrolled (url contains #about or section visible)
    await expect(page).toHaveURL(/#about/);

    // Escape closes menu
    await hamburger.click();
    await expect(drawer).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(drawer).not.toBeVisible();
  });
});
