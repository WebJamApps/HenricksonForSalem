import { render, screen, fireEvent, act } from '@testing-library/react';
import { App } from 'src/App';
import { expect, describe, it, vi, beforeEach, afterEach } from 'vitest';

describe('App', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

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

    // Purely static: no form fields, no buttons in the join section
    const joinSection = document.getElementById('join');
    expect(joinSection?.querySelector('form')).toBeNull();
    expect(joinSection?.querySelector('input, select, textarea, button')).toBeNull();
  });

  it('renders the footer social-link placeholders and disclosure', () => {
    render(<App />);
    expect(screen.getByLabelText('Facebook')).toBeInTheDocument();
    expect(screen.getByLabelText('Twitter/X')).toBeInTheDocument();
    expect(screen.getByLabelText('Instagram')).toBeInTheDocument();
    expect(screen.getByText('PAID FOR BY THE COMMITTEE TO ELECT MARK HENRICKSON')).toBeInTheDocument();
  });

  it('advances the slideshow automatically via autoplay', () => {
    render(<App />);
    
    // First slide is active initially
    const firstSlide = screen.getByAltText('A Fresh Voice for Salem');
    expect(firstSlide.parentElement).toHaveClass('active');

    // Advance time by 6000ms wrapped in act
    act(() => {
      vi.advanceTimersByTime(6000);
    });

    // Second slide should be active now
    const secondSlide = screen.getByAltText('Supporting Small Businesses');
    expect(secondSlide.parentElement).toHaveClass('active');
  });

  it('navigates the slideshow manually using Prev and Next buttons', () => {
    render(<App />);

    const nextButton = screen.getByRole('button', { name: 'Next slide' });
    const prevButton = screen.getByRole('button', { name: 'Previous slide' });

    // Click next
    fireEvent.click(nextButton);
    const secondSlide = screen.getByAltText('Supporting Small Businesses');
    expect(secondSlide.parentElement).toHaveClass('active');

    // Click prev (goes back to first slide)
    fireEvent.click(prevButton);
    const firstSlide = screen.getByAltText('A Fresh Voice for Salem');
    expect(firstSlide.parentElement).toHaveClass('active');

    // Click prev again (goes to last slide)
    fireEvent.click(prevButton);
    const lastSlide = screen.getByAltText('Civic Accessibility');
    expect(lastSlide.parentElement).toHaveClass('active');
  });

  it('navigates the slideshow using indicator dots', () => {
    render(<App />);

    const dots = screen.getAllByRole('tab');
    expect(dots).toHaveLength(4);

    // Click third dot (index 2)
    fireEvent.click(dots[2]);
    const thirdSlide = screen.getByAltText('Investing in Our Public Spaces');
    expect(thirdSlide.parentElement).toHaveClass('active');
  });
});
