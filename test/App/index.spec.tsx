import { render, screen, fireEvent, act } from '@testing-library/react';
import { App } from 'src/App';
import { expect, describe, it, vi, beforeEach } from 'vitest';
import { axe } from 'vitest-axe';
import * as axeMatchers from 'vitest-axe/matchers.js';

expect.extend(axeMatchers);

describe('App', () => {
  it('renders the static campaign page sections', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'Mark Henrickson for Salem City Council' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'About Mark Henrickson' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Campaign Platform' })).toBeInTheDocument();
  });

  it('renders the Get Involved section as a static placeholder with no form', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'Join the Campaign' })).toBeInTheDocument();
    expect(screen.getByText('Want to help? Ways to volunteer are coming soon.')).toBeInTheDocument();

    // Purely static: no form fields, no buttons anywhere on the page besides the theme toggle and hamburger
    expect(document.querySelector('form')).toBeNull();
    expect(document.querySelector('input, select, textarea')).toBeNull();
    
    const toggleBtns = screen.getAllByRole('button', { name: /Switch to (dark|light) theme/i });
    expect(toggleBtns.length).toBe(2);
    expect(screen.getByRole('button', { name: 'Toggle navigation menu' })).toBeInTheDocument();
    expect(screen.queryAllByRole('button')).toHaveLength(3);
  });

  it('renders the footer social-link placeholders and disclosure', () => {
    render(<App />);
    expect(screen.getByLabelText('Facebook')).toBeInTheDocument();
    expect(screen.getByLabelText('YouTube')).toBeInTheDocument();
    expect(screen.getByLabelText('Instagram')).toBeInTheDocument();
    expect(screen.getByText('PAID FOR BY THE COMMITTEE TO ELECT MARK HENRICKSON')).toBeInTheDocument();
  });

  it('supports rotating hero gallery slides automatically and manually', () => {
    vi.useFakeTimers();
    render(<App />);

    const bullet1 = screen.getByLabelText('Go to slide 1');
    const bullet2 = screen.getByLabelText('Go to slide 2');
    const bullet3 = screen.getByLabelText('Go to slide 3');

    expect(bullet1).toHaveClass('active');
    expect(bullet2).not.toHaveClass('active');

    // Click bullet 2
    fireEvent.click(bullet2);
    expect(bullet1).not.toHaveClass('active');
    expect(bullet2).toHaveClass('active');

    // Click bullet 3
    fireEvent.click(bullet3);
    expect(bullet2).not.toHaveClass('active');
    expect(bullet3).toHaveClass('active');

    // Advance timer by 5 seconds to rotate back to slide 1
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(bullet3).not.toHaveClass('active');
    expect(bullet1).toHaveClass('active');

    vi.useRealTimers();
  });

  it('cleans up interval on unmount', () => {
    vi.useFakeTimers();
    const clearIntervalSpy = vi.spyOn(globalThis, 'clearInterval');
    const { unmount } = render(<App />);
    unmount();
    expect(clearIntervalSpy).toHaveBeenCalled();
    vi.useRealTimers();
  });

  describe('theme selector and accessibility', () => {
    beforeEach(() => {
      localStorage.clear();
      document.documentElement.removeAttribute('data-theme');
    });

    it('supports toggling and persisting theme', () => {
      const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
      render(<App />);

      const toggleBtns = screen.getAllByRole('button', { name: 'Switch to dark theme' });
      const toggleBtn = toggleBtns[0];
      expect(document.documentElement.getAttribute('data-theme')).toBe('light');

      // Toggle to dark
      fireEvent.click(toggleBtn);
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
      expect(setItemSpy).toHaveBeenCalledWith('theme', 'dark');
      expect(screen.getAllByRole('button', { name: 'Switch to light theme' })[0]).toBeInTheDocument();

      // Toggle back to light
      fireEvent.click(toggleBtn);
      expect(document.documentElement.getAttribute('data-theme')).toBe('light');
      expect(setItemSpy).toHaveBeenCalledWith('theme', 'light');
      expect(screen.getAllByRole('button', { name: 'Switch to dark theme' })[0]).toBeInTheDocument();

      setItemSpy.mockRestore();
    });

    it('respects prefers-color-scheme if no localStorage is set', () => {
      const originalMatchMedia = window.matchMedia;
      window.matchMedia = vi.fn().mockImplementation(query => ({
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      render(<App />);
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');

      if (originalMatchMedia) {
        window.matchMedia = originalMatchMedia;
      } else {
        // @ts-expect-error delete non-optional
        delete window.matchMedia;
      }
    });

    it('loads theme from localStorage', () => {
      localStorage.setItem('theme', 'dark');
      render(<App />);
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });

    it('has no axe accessibility violations in light theme', async () => {
      const { container } = render(<App />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no axe accessibility violations in dark theme', async () => {
      localStorage.setItem('theme', 'dark');
      const { container } = render(<App />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no axe accessibility violations when mobile menu is open', async () => {
      const { container } = render(<App />);
      const hamburger = screen.getByRole('button', { name: 'Toggle navigation menu' });
      fireEvent.click(hamburger);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
