import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { App } from 'src/App';
import { vi, expect, describe, it, beforeEach, afterEach } from 'vitest';

describe('App & InvolvementForm', () => {
  let fetchSpy: any;

  beforeEach(() => {
    fetchSpy = vi.spyOn(globalThis, 'fetch');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the Mark Henrickson campaign brand heading and involvement form', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'Mark Henrickson for Salem City Council' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Join the Campaign' })).toBeInTheDocument();
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/How would you like to get involved\?/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message or Notes/i)).toBeInTheDocument();
  });

  it('initially disables the submit button and validates email correctly', async () => {
    render(<App />);
    const submitBtn = screen.getByRole('button', { name: /Submit Request/i });
    expect(submitBtn).toBeDisabled();

    // Fill in Name
    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'John Doe' } });
    expect(submitBtn).toBeDisabled();

    // Fill in invalid Email
    const emailInput = screen.getByLabelText(/Email Address/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
    expect(submitBtn).toBeDisabled();

    // Correct the Email
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    expect(screen.queryByText(/Please enter a valid email address/i)).not.toBeInTheDocument();
    expect(submitBtn).toBeDisabled();

    // Fill in Phone
    fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: '555-123-4567' } });
    expect(submitBtn).toBeDisabled();

    // Select involvement type (defaults to volunteer)
    fireEvent.change(screen.getByLabelText(/How would you like to get involved\?/i), { target: { value: 'yardSign' } });
    expect(submitBtn).toBeDisabled();

    // Fill in Message
    fireEvent.change(screen.getByLabelText(/Message or Notes/i), { target: { value: 'I want a yard sign!' } });
    
    // Now it should be enabled!
    expect(submitBtn).not.toBeDisabled();
  });

  it('submits successfully and transitions to success view', async () => {
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'message sent' }),
    } as Response);

    render(<App />);

    // Fill in valid details
    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: '555-123-4567' } });
    fireEvent.change(screen.getByLabelText(/How would you like to get involved\?/i), { target: { value: 'volunteer' } });
    fireEvent.change(screen.getByLabelText(/Message or Notes/i), { target: { value: 'Count me in!' } });

    const submitBtn = screen.getByRole('button', { name: /Submit Request/i });
    fireEvent.click(submitBtn);

    expect(screen.getByText(/Sending.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText(/Thank You, Salem!/i)).toBeInTheDocument();
      expect(screen.getByText(/Together, we can make a difference in Salem/i)).toBeInTheDocument();
    });

    // Reset the form
    const resetBtn = screen.getByRole('button', { name: /Send Another Message/i });
    fireEvent.click(resetBtn);

    expect(screen.getByRole('heading', { name: 'Join the Campaign' })).toBeInTheDocument();
    expect((screen.getByLabelText(/Full Name/i) as HTMLInputElement).value).toBe('');
  });

  it('handles server submission error gracefully', async () => {
    fetchSpy.mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    } as Response);

    render(<App />);

    // Fill in valid details
    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: '555-123-4567' } });
    fireEvent.change(screen.getByLabelText(/How would you like to get involved\?/i), { target: { value: 'host' } });
    fireEvent.change(screen.getByLabelText(/Message or Notes/i), { target: { value: 'Host a meet!' } });

    const submitBtn = screen.getByRole('button', { name: /Submit Request/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText(/Sorry, we could not deliver your message/i)).toBeInTheDocument();
      expect(screen.getByText(/info@henricksonforsalem.com/i)).toBeInTheDocument();
    });
  });

  it('handles fetch network/rejection error gracefully', async () => {
    fetchSpy.mockRejectedValueOnce(new Error('Network disconnected'));

    render(<App />);

    // Fill in valid details
    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: '555-123-4567' } });
    fireEvent.change(screen.getByLabelText(/How would you like to get involved\?/i), { target: { value: 'volunteer' } });
    fireEvent.change(screen.getByLabelText(/Message or Notes/i), { target: { value: 'Let us help.' } });

    const submitBtn = screen.getByRole('button', { name: /Submit Request/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText(/Sorry, we could not deliver your message/i)).toBeInTheDocument();
    });
  });
});
