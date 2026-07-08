import { render, screen } from '@testing-library/react';
import { App } from 'src/App';
import { expect, describe, it } from 'vitest';

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
    expect(screen.getByLabelText('Twitter/X')).toBeInTheDocument();
    expect(screen.getByLabelText('Instagram')).toBeInTheDocument();
    expect(screen.getByText('PAID FOR BY THE COMMITTEE TO ELECT MARK HENRICKSON')).toBeInTheDocument();
  });
});
