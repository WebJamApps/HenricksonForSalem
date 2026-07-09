import { render, screen, fireEvent, act } from '@testing-library/react';
import { App } from 'src/App';
import { expect, describe, it, vi } from 'vitest';

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

    // Purely static: no form fields, no buttons anywhere on the page
    expect(document.querySelector('form')).toBeNull();
    expect(document.querySelector('input, select, textarea')).toBeNull();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
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
});
