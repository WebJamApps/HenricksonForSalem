/**
 * @file index.tsx
 * @description Involvement and contact form component for Mark Henrickson for Salem City Council.
 */

import { useState, ChangeEvent, FormEvent } from 'react';
import './involvement-form.css';

declare const process: {
  env: {
    BackendUrl?: string;
  };
};

export interface IInvolvementFormData {
  campaign: string;
  name: string;
  email: string;
  phone: string;
  involvementType: string;
  message: string;
}

export function InvolvementForm() {
  const [formData, setFormData] = useState<IInvolvementFormData>({
    campaign: 'henrickson',
    name: '',
    email: '',
    phone: '',
    involvementType: 'volunteer',
    message: '',
  });

  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Simple and robust email validation regex
  const validateEmail = (emailStr: string): boolean => {
    const regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regEx.test(emailStr) && emailStr.includes('.');
  };

  // Client-side validation function to toggle the submit button and provide feedback
  const isFormInvalid = (): boolean => {
    const { name, email, phone, involvementType, message } = formData;
    if (!name.trim()) return true;
    if (!validateEmail(email)) return true;
    if (!phone.trim()) return true;
    if (!involvementType) return true;
    if (!message.trim()) return true;
    return false;
  };

  function handleInputChange(
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { id, value } = evt.target;
    setFormData(prev => ({
      ...prev,
      [id]: value,
    }));
  }

  async function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    if (isFormInvalid()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    const backendUrl =
      (typeof process !== 'undefined' && process && process.env && process.env.BackendUrl) ||
      'http://localhost:7000';

    try {
      const res = await fetch(`${backendUrl}/inquiry`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          artist: formData.campaign, // Map to artist field for backward compatibility with backend
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          eventDate: new Date().toISOString().split('T')[0], // Map to eventDate for backend compatibility
          message: `[Involvement Type: ${formData.involvementType}] ${formData.message}`,
        }),
      });

      if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
      }

      setHasSubmitted(true);
    } catch (err) {
      console.error('Submission failed:', err);
      setSubmitError(
        'Sorry, we could not deliver your message at this moment. Please try again, or email us directly.'
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleReset = () => {
    setFormData({
      campaign: 'henrickson',
      name: '',
      email: '',
      phone: '',
      involvementType: 'volunteer',
      message: '',
    });
    setHasSubmitted(false);
    setSubmitError(null);
  };

  // Compute email validation class name to avoid nested ternary warning
  let emailClass = 'form-input';
  if (formData.email) {
    emailClass += validateEmail(formData.email) ? ' is-valid' : ' is-invalid';
  }

  if (hasSubmitted) {
    return (
      <div className="involvement-card success-card" role="alert" aria-live="polite" id="join">
        <div className="success-icon-wrapper">
          <svg
            className="success-svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2 className="success-title">Thank You, Salem!</h2>
        <p className="success-message">
          Your message has been received! Together, we can make a difference in Salem. We will be in touch with you shortly.
        </p>
        <button
          onClick={handleReset}
          className="reset-button btn-premium"
          type="button"
          id="btn-reset-form"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="involvement-card" id="join">
      <div className="involvement-header">
        <h2 className="involvement-title">Join the Campaign</h2>
        <p className="involvement-subtitle">
          Be a part of building a stronger, safer, and more vibrant Salem. Let us know how you'd like to get involved!
        </p>
      </div>

      {submitError && (
        <div className="error-alert" role="alert">
          <p className="error-text">{submitError}</p>
          <p className="error-fallback">
            Direct Campaign Email:{' '}
            <a href="mailto:info@henricksonforsalem.com" className="email-link">
              info@henricksonforsalem.com
            </a>
          </p>
        </div>
      )}

      <form id="campaign-involvement-form" onSubmit={handleSubmit} noValidate className="involvement-form-element">
        <div className="form-grid">
          {/* Name Field */}
          <div className="form-group full-width">
            <label htmlFor="name" className="form-label">
              Full Name <span className="required-asterisk">*</span>
            </label>
            <input
              type="text"
              id="name"
              aria-label="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              className={`form-input ${formData.name.trim() ? 'is-valid' : ''}`}
              placeholder="e.g. John Doe"
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address <span className="required-asterisk">*</span>
            </label>
            <input
              type="email"
              id="email"
              aria-label="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              className={emailClass}
              placeholder="e.g. john@example.com"
              required
              disabled={isSubmitting}
            />
            {formData.email && !validateEmail(formData.email) && (
              <span className="field-error-msg">Please enter a valid email address</span>
            )}
          </div>

          {/* Phone Field */}
          <div className="form-group">
            <label htmlFor="phone" className="form-label">
              Phone Number <span className="required-asterisk">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              aria-label="Phone Number"
              value={formData.phone}
              onChange={handleInputChange}
              className={`form-input ${formData.phone.trim() ? 'is-valid' : ''}`}
              placeholder="e.g. 555-123-4567"
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Involvement Type */}
          <div className="form-group full-width">
            <label htmlFor="involvementType" className="form-label">
              How would you like to get involved? <span className="required-asterisk">*</span>
            </label>
            <select
              id="involvementType"
              aria-label="How would you like to get involved?"
              value={formData.involvementType}
              onChange={handleInputChange}
              className="form-input form-select"
              required
              disabled={isSubmitting}
            >
              <option value="volunteer">Volunteer on the campaign team</option>
              <option value="yardSign">Request a Yard Sign</option>
              <option value="host">Host a Meet & Greet</option>
              <option value="subscribe">Stay updated via email</option>
            </select>
          </div>

          {/* Message Field */}
          <div className="form-group full-width">
            <label htmlFor="message" className="form-label">
              Message or Notes <span className="required-asterisk">*</span>
            </label>
            <textarea
              id="message"
              aria-label="Message or Notes"
              value={formData.message}
              onChange={handleInputChange}
              className={`form-input form-textarea ${formData.message.trim() ? 'is-valid' : ''}`}
              placeholder="Let us know how you would like to help, ask any questions, or suggest ideas..."
              required
              disabled={isSubmitting}
              rows={4}
            />
          </div>
        </div>

        <div className="form-footer">
          <span className="required-notice">
            <span className="required-asterisk">*</span> Required fields
          </span>
          <button
            type="submit"
            id="btn-submit-form"
            disabled={isFormInvalid() || isSubmitting}
            className={`btn-premium submit-button ${isSubmitting ? 'is-loading' : ''}`}
          >
            {isSubmitting ? (
              <>
                <span className="spinner"></span>
                Sending...
              </>
            ) : (
              'Submit Request'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
