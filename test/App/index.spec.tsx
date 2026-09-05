import { render, screen, fireEvent, act } from '@testing-library/react';
import { App } from 'src/App';
import { expect, describe, it, vi, beforeEach } from 'vitest';
import { axe } from 'vitest-axe';
import * as axeMatchers from 'vitest-axe/matchers.js';

expect.extend(axeMatchers);

describe('App', () => {
  it('renders the static campaign page sections including Dropbox text & photos', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'Mark Henrickson for Salem City Council' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'A Message from Mark' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Meet Mark Henrickson' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: "Why I'm Running" })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'My Values' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'My Vision for Salem' })).toBeInTheDocument();

    // Verify campaign images loaded from public/images
    const heroImg = screen.getByAltText('Mark Henrickson hero portrait');
    expect(heroImg).toHaveAttribute('src', '/images/mark-henrickson-1.png');

    const portraitImg = screen.getByAltText('Mark Henrickson portrait');
    expect(portraitImg).toHaveAttribute('src', '/images/mark-henrickson-2.png');
  });

  it('renders direct email link to henmark1@aol.com', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'Get Involved' })).toBeInTheDocument();
    const directEmailLink = screen.getByRole('link', { name: /Get in Touch/i });
    expect(directEmailLink).toHaveAttribute('href', 'mailto:henmark1@aol.com?subject=Message%20for%20Mark%20Henrickson');
    expect(screen.getByText(/Email Mark Henrickson directly at henmark1@aol.com/i)).toBeInTheDocument();
  });

  it('renders and validates the Yard Sign Request Form modal', () => {
    render(<App />);
    expect(screen.queryByRole('dialog')).toBeNull();

    // Click request sign button to open modal dialog
    const openModalBtn = screen.getByRole('button', { name: /Request a Yard Sign/i });
    fireEvent.click(openModalBtn);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Yard Sign Request Form' })).toBeInTheDocument();

    const nameInput = screen.getByLabelText(/Full Name/i);
    const addressInput = screen.getByLabelText(/Physical Address/i);
    const phoneInput = screen.getByLabelText(/Contact Phone Number/i);
    const permissionCheckbox = screen.getByLabelText(/I give permission for the sign to be installed/i);
    const submitBtn = screen.getByRole('button', { name: 'Submit Yard Sign Request' });

    // Test validation for empty name
    fireEvent.click(submitBtn);
    expect(screen.getByText('Please enter your full name.')).toBeInTheDocument();

    // Fill name, test address required
    fireEvent.change(nameInput, { target: { value: 'John Smith' } });
    fireEvent.click(submitBtn);
    expect(screen.getByText('Please enter your physical address.')).toBeInTheDocument();

    // Test address must be in Salem, VA validation
    fireEvent.change(addressInput, { target: { value: '123 Main St, Roanoke, VA' } });
    fireEvent.click(submitBtn);
    expect(screen.getByText('Physical address must be located within the city of Salem, Virginia.')).toBeInTheDocument();

    // Correct address to Salem
    fireEvent.change(addressInput, { target: { value: '123 College Ave, Salem, VA 24153' } });
    fireEvent.click(submitBtn);
    expect(screen.getByText('Please enter a contact phone number.')).toBeInTheDocument();

    // Fill phone number
    fireEvent.change(phoneInput, { target: { value: '540-555-0123' } });
    fireEvent.click(submitBtn);
    expect(screen.getByText('Please check the box granting permission to install the sign visible to the street.')).toBeInTheDocument();

    // Check permission and submit successfully
    fireEvent.click(permissionCheckbox);
    fireEvent.click(submitBtn);

    expect(screen.getByText(/Your yard sign request details have been prepared in your email client/i)).toBeInTheDocument();

    // Click Done to close modal
    fireEvent.click(screen.getByRole('button', { name: 'Done' }));
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('renders business name field when Business property type is selected in modal', () => {
    render(<App />);

    // Open modal
    fireEvent.click(screen.getByRole('button', { name: /Request a Yard Sign/i }));

    const businessRadio = screen.getByLabelText('Business');
    expect(screen.queryByLabelText(/Business Name/i)).toBeNull();

    fireEvent.click(businessRadio);
    const businessInput = screen.getByLabelText(/Business Name/i);
    expect(businessInput).toBeInTheDocument();

    const submitBtn = screen.getByRole('button', { name: 'Submit Yard Sign Request' });
    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'Jane Doe' } });
    fireEvent.click(submitBtn);
    expect(screen.getByText('Please enter your business name.')).toBeInTheDocument();
  });

  it('closes modal dialog when clicking close button or pressing Escape key', () => {
    render(<App />);

    // Open modal
    fireEvent.click(screen.getByRole('button', { name: /Request a Yard Sign/i }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    // Close via close button
    fireEvent.click(screen.getByRole('button', { name: 'Close yard sign request dialog' }));
    expect(screen.queryByRole('dialog')).toBeNull();

    // Reopen modal and close via Escape key
    fireEvent.click(screen.getByRole('button', { name: /Request a Yard Sign/i }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('renders the footer disclosure and official campaign Facebook link', () => {
    render(<App />);
    const facebookLink = screen.getByRole('link', { name: 'Facebook' });
    expect(facebookLink).toBeInTheDocument();
    expect(facebookLink).toHaveAttribute('href', 'https://www.facebook.com/profile.php?id=61592284724059');
    expect(facebookLink).toHaveAttribute('target', '_blank');
    expect(facebookLink).toHaveAttribute('rel', 'noopener noreferrer');
    expect(facebookLink).toHaveAttribute('aria-label', 'Facebook');

    expect(screen.queryByLabelText('YouTube')).toBeNull();
    expect(screen.queryByLabelText('Instagram')).toBeNull();
    expect(screen.getByText('PAID FOR BY HENRICKSON FOR SALEM')).toBeInTheDocument();
  });

  it('supports rotating hero gallery slides automatically and manually', () => {
    vi.useFakeTimers();
    render(<App />);

    const bullet1 = screen.getByLabelText('Go to slide 1');
    const bullet2 = screen.getByLabelText('Go to slide 2');
    const bullet6 = screen.getByLabelText('Go to slide 6');

    expect(bullet1).toHaveClass('active');
    expect(bullet2).not.toHaveClass('active');

    // Click bullet 2
    fireEvent.click(bullet2);
    expect(bullet1).not.toHaveClass('active');
    expect(bullet2).toHaveClass('active');

    // Click bullet 6
    fireEvent.click(bullet6);
    expect(bullet2).not.toHaveClass('active');
    expect(bullet6).toHaveClass('active');

    // Advance timer by 5 seconds to rotate back to slide 1 (wrapping from 6 to 1)
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(bullet6).not.toHaveClass('active');
    expect(bullet1).toHaveClass('active');

    vi.useRealTimers();
  });

  it('supports rotating story photo slideshow automatically and manually via bullets and nav buttons', () => {
    vi.useFakeTimers();
    render(<App />);

    expect(
      screen.getByText('Mark Henrickson — Dedicated to serving Salem families and businesses.'),
    ).toBeInTheDocument();

    const storyBullet1 = screen.getByLabelText('Go to community photo 1');
    const storyBullet2 = screen.getByLabelText('Go to community photo 2');
    const storyBullet9 = screen.getByLabelText('Go to community photo 9');
    const prevBtn = screen.getByLabelText('Previous community photo');
    const nextBtn = screen.getByLabelText('Next community photo');

    expect(storyBullet1).toHaveClass('active');
    expect(storyBullet2).not.toHaveClass('active');

    // Click bullet 2 (Family)
    fireEvent.click(storyBullet2);
    expect(storyBullet1).not.toHaveClass('active');
    expect(storyBullet2).toHaveClass('active');
    expect(screen.getByText(/Family — Celebrating Mark’s father/i)).toBeInTheDocument();

    // Click Next button -> slide 3 (Rotary Christmas for Kids)
    fireEvent.click(nextBtn);
    expect(screen.getByLabelText('Go to community photo 3')).toHaveClass('active');
    expect(screen.getByText(/Rotary Christmas for Kids/i)).toBeInTheDocument();

    // Click Prev button -> back to slide 2
    fireEvent.click(prevBtn);
    expect(storyBullet2).toHaveClass('active');

    // Click Prev button from slide 2 -> slide 1
    fireEvent.click(prevBtn);
    expect(storyBullet1).toHaveClass('active');

    // Click Prev button from slide 1 -> wraps to slide 9
    fireEvent.click(prevBtn);
    expect(storyBullet9).toHaveClass('active');
    expect(screen.getByText(/1971 Andrew Lewis Football Team/i)).toBeInTheDocument();

    // Advance timer by 5 seconds to auto-rotate from slide 9 back to slide 1
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(storyBullet9).not.toHaveClass('active');
    expect(storyBullet1).toHaveClass('active');
    expect(
      screen.getByText('Mark Henrickson — Dedicated to serving Salem families and businesses.'),
    ).toBeInTheDocument();

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
