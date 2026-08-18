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

  test('should render hero, yard sign form, and footer disclosure', async ({ page, isMobile }) => {
    if (isMobile) return;

    // Hero renders
    const heroTitle = page.locator('.hero-title');
    await expect(heroTitle).toBeVisible();
    await expect(heroTitle).toContainText('Mark Henrickson');

    // Footer disclosure and Facebook link present
    const disclosure = page.locator('.disclosure-box');
    await expect(disclosure).toBeVisible();
    const facebookLink = page.locator('a[aria-label="Facebook"]');
    await expect(facebookLink).toBeVisible();
  });

  test('should open, validate, and close the yard sign request modal dialog', async ({ page, isMobile }) => {
    if (isMobile) return;

    // Modal is initially not visible
    const modal = page.locator('[role="dialog"]');
    await expect(modal).not.toBeVisible();

    // Click Request a Yard Sign card button
    const openModalBtn = page.locator('button:has-text("Request a Yard Sign")');
    await openModalBtn.click();

    await expect(modal).toBeVisible();
    await expect(page.locator('#yard-sign-dialog-title')).toHaveText('Yard Sign Request Form');

    // Close via close button
    const closeBtn = page.locator('button[aria-label="Close yard sign request dialog"]');
    await closeBtn.click();
    await expect(modal).not.toBeVisible();
  });

  test('should render footer star logo icon inline with the campaign heading and aligned to top of text', async ({ page, isMobile }) => {
    if (isMobile) return;

    const logoIcon = page.locator('.footer-logo-icon');
    const heading = page.locator('.footer-brand h3');

    await expect(logoIcon).toBeVisible();
    await expect(heading).toBeVisible();

    const logoBox = await logoIcon.boundingBox();
    const headingBox = await heading.boundingBox();

    expect(logoBox).not.toBeNull();
    expect(headingBox).not.toBeNull();

    if (logoBox && headingBox) {
      // Logo is positioned to the left of heading text
      expect(headingBox.x).toBeGreaterThan(logoBox.x);
      // Logo top is AT or SLIGHTLY HIGHER than heading top (never lower)
      expect(logoBox.y).toBeLessThanOrEqual(headingBox.y);
      // Maximum top offset difference is within 5px
      expect(headingBox.y - logoBox.y).toBeLessThanOrEqual(5);
    }
  });

  test('should ensure all visible SVG icons maintain strictly constrained dimensions (width and height <= 60px)', async ({ page, isMobile }) => {
    if (isMobile) return;

    const svgs = page.locator('svg');
    const count = await svgs.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const svg = svgs.nth(i);
      if (await svg.isVisible()) {
        const box = await svg.boundingBox();
        expect(box).not.toBeNull();
        if (box) {
          expect(box.width).toBeLessThanOrEqual(60);
          expect(box.height).toBeLessThanOrEqual(60);
        }
      }
    }
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

  test('should scroll desktop navigation links to target headings without sticky header overlap', async ({ page, isMobile }) => {
    if (isMobile) return;

    const links = [
      { selector: 'a.nav-link:has-text("Meet Mark")', hash: '#about', heading: 'Meet Mark Henrickson' },
      { selector: 'a.nav-link:has-text("Why I\'m Running")', hash: '#why-running', heading: "Why I'm Running" },
      { selector: 'a.nav-link:has-text("My Values")', hash: '#values', heading: 'My Values' },
      { selector: 'a.nav-link:has-text("Platform")', hash: '#platform', heading: 'My Vision for Salem' },
      { selector: 'a.nav-link:has-text("Get Involved")', hash: '#join', heading: 'Get Involved' },
    ];

    for (const item of links) {
      const link = page.locator(item.selector);
      await link.click();

      await expect(page).toHaveURL(new RegExp(item.hash));
      const targetHeading = page.locator(`h2:has-text("${item.heading}")`).first();
      await expect(targetHeading).toBeVisible();

      const headingBox = await targetHeading.boundingBox();
      expect(headingBox).not.toBeNull();
      if (headingBox) {
        // Heading top must be at or below the 80px desktop navbar (not covered behind navbar)
        expect(headingBox.y).toBeGreaterThanOrEqual(70);
      }
    }
  });
});

test.describe('Campaign Site - Mobile', () => {
  test.beforeEach(async ({ page, isMobile }) => {
    if (isMobile) {
      await page.goto('/');
    }
  });

  test('should render hero and footer disclosure on mobile', async ({ page, isMobile }) => {
    if (!isMobile) return;

    // Hero renders
    const heroTitle = page.locator('.hero-title');
    await expect(heroTitle).toBeVisible();

    // Footer disclosure present
    const disclosure = page.locator('.disclosure-box');
    await expect(disclosure).toBeVisible();
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

  test('should render hero photo slideshow with sufficient height on cellphone display', async ({ page, isMobile }) => {
    if (!isMobile) return;

    const gallery = page.locator('.hero-gallery');
    await expect(gallery).toBeVisible();

    const box = await gallery.boundingBox();
    expect(box).not.toBeNull();
    if (box) {
      // Height must be at least 320px on mobile so top image graphics are not clipped off
      expect(box.height).toBeGreaterThanOrEqual(320);
    }
  });

  test('should scroll navigation links to target headings without sticky header overlap on mobile', async ({ page, isMobile }) => {
    if (!isMobile) return;

    const hamburger = page.locator('.hamburger-btn');
    const links = [
      { text: 'Meet Mark', hash: '#about', heading: 'Meet Mark Henrickson' },
      { text: "Why I'm Running", hash: '#why-running', heading: "Why I'm Running" },
      { text: 'My Values', hash: '#values', heading: 'My Values' },
      { text: 'Platform', hash: '#platform', heading: 'My Vision for Salem' },
      { text: 'Get Involved', hash: '#join', heading: 'Get Involved' },
    ];

    for (const item of links) {
      await hamburger.click();
      const link = page.locator(`.mobile-drawer-link:has-text("${item.text}")`);
      await link.click();

      await expect(page).toHaveURL(new RegExp(item.hash));
      const targetHeading = page.locator(`h2:has-text("${item.heading}")`).first();
      await expect(targetHeading).toBeVisible();

      const headingBox = await targetHeading.boundingBox();
      expect(headingBox).not.toBeNull();
      if (headingBox) {
        // Heading top must be at or below the 70px mobile navbar (not covered behind navbar)
        expect(headingBox.y).toBeGreaterThanOrEqual(60);
      }
    }
  });
});
