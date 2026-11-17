import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addRegistration, isUserRegistered } from '../utils/localStorage';

function RegistrationForm({ event, onClose, onRegistrationComplete }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [alreadyRegisteredMessage, setAlreadyRegisteredMessage] = useState('');
  const [confirmedData, setConfirmedData] = useState(null);

  // Check on mount if already registered
  const alreadyRegistered = event ? isUserRegistered(event.id) : false;

  const validate = (dataToValidate) => {
    const errs = {};

    // Name Validation: Required, letters & spaces only, min 2 chars
    if (!dataToValidate.name.trim()) {
      errs.name = 'Full name is required.';
    } else if (!/^[A-Za-z\s]{2,50}$/.test(dataToValidate.name.trim())) {
      errs.name = 'Please enter a valid name using letters and spaces only.';
    }

    // Email Validation: Required, standard email regex
    if (!dataToValidate.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dataToValidate.email.trim())) {
      errs.email = 'Please provide a valid email address (e.g. name@domain.com).';
    }

    // Phone Validation: Required, digits only, 10 to 15 digits
    const cleanedPhone = dataToValidate.phone.replace(/[\s\-\(\)\+]/g, '');
    if (!dataToValidate.phone.trim()) {
      errs.phone = 'Phone number is required.';
    } else if (!/^\d{10,15}$/.test(cleanedPhone)) {
      errs.phone = 'Please enter a valid phone number (10 to 15 digits).';
    }

    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);

    // If already tried to submit, clear errors as user types
    if (hasSubmitted) {
      const errs = validate(updatedData);
      setErrors(errs);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    setAlreadyRegisteredMessage('');

    if (alreadyRegistered) {
      setAlreadyRegisteredMessage('You are already registered for this event.');
      return;
    }

    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    // Attempt to register
    const result = addRegistration({
      eventId: event.id,
      eventTitle: event.title,
      eventDate: event.displayDate || event.date,
      eventLocation: event.location,
      eventCategory: event.category,
      eventImage: event.image,
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim()
    });

    if (result.success) {
      setIsSuccess(true);
      setConfirmedData(result.registration);
      if (onRegistrationComplete) {
        onRegistrationComplete(result.registration);
      }
    } else {
      setAlreadyRegisteredMessage(result.message);
    }
  };

  // If successfully registered, show confirmation screen (Fixed for Image 5)
  if (isSuccess && confirmedData) {
    return (
      <div className="confirmation-card">
        <div className="confirmation-icon">
          <i className="fa-solid fa-check"></i>
        </div>
        <h2 className="confirmation-title">Registration Confirmed!</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
          Your ticket for <strong>{event.title}</strong> is secured. A confirmation email has been dispatched to <strong>{confirmedData.email}</strong>.
        </p>

        {/* Robust, Clean, Fully Responsive Details Container */}
        <div className="confirmation-details">
          <div className="confirmation-detail-item">
            <span className="confirmation-detail-label">Registration ID</span>
            <span className="confirmation-detail-value">{confirmedData.id}</span>
          </div>
          <div className="confirmation-detail-item">
            <span className="confirmation-detail-label">Attendee Name</span>
            <span className="confirmation-detail-value">{confirmedData.name}</span>
          </div>
          <div className="confirmation-detail-item">
            <span className="confirmation-detail-label">Date &amp; Time</span>
            <span className="confirmation-detail-value">{confirmedData.eventDate}</span>
          </div>
          <div className="confirmation-detail-item">
            <span className="confirmation-detail-label">Venue</span>
            <span className="confirmation-detail-value">{confirmedData.eventLocation}</span>
          </div>
        </div>

        <div className="confirmation-card-actions">
          <button
            type="button"
            className="btn btn-outline"
            onClick={onClose}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              onClose();
              navigate('/my-registrations');
            }}
          >
            <i className="fa-solid fa-ticket"></i>
            <span>View My Registrations</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="registration-container" style={{ padding: '0.5rem 0' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <span className="badge badge-technology" style={{ marginBottom: '0.5rem' }}>
          {event?.category}
        </span>
        <h2 style={{ fontSize: '1.45rem', color: 'var(--primary)', marginBottom: '0.35rem' }}>
          Register for Workshop
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
          {event?.title} • {event?.displayDate || event?.date}
        </p>
      </div>

      {alreadyRegistered || alreadyRegisteredMessage ? (
        <div
          style={{
            backgroundColor: 'var(--surface-secondary)',
            border: '1px solid rgba(75, 155, 232, 0.4)',
            borderRadius: 'var(--radius-sm)',
            padding: '1.25rem',
            marginBottom: '1.5rem',
            textAlign: 'center'
          }}
        >
          <i className="fa-solid fa-circle-info" style={{ color: 'var(--accent)', fontSize: '1.5rem', marginBottom: '0.5rem' }}></i>
          <h4 style={{ color: 'var(--primary)', marginBottom: '0.3rem' }}>Already Registered</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
            {alreadyRegisteredMessage || 'You are already registered for this event.'}
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button type="button" className="btn btn-outline btn-sm" onClick={onClose}>
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => {
                onClose();
                navigate('/my-registrations');
              }}
            >
              Go to My Registrations
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          {/* Full Name */}
          <div className="form-group">
            <label className="form-label" htmlFor="reg-name">
              Full Name <span style={{ color: 'var(--error)' }}>*</span>
            </label>
            <div className="form-input-container">
              <i className="fa-regular fa-user"></i>
              <input
                id="reg-name"
                name="name"
                type="text"
                className={`form-input ${hasSubmitted && errors.name ? 'has-error' : ''}`}
                placeholder="e.g. Sophia Turner"
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
              />
            </div>
            {hasSubmitted && errors.name && (
              <p className="form-error">
                <i className="fa-solid fa-circle-exclamation"></i>
                <span>{errors.name}</span>
              </p>
            )}
          </div>

          {/* Email Address */}
          <div className="form-group">
            <label className="form-label" htmlFor="reg-email">
              Email Address <span style={{ color: 'var(--error)' }}>*</span>
            </label>
            <div className="form-input-container">
              <i className="fa-regular fa-envelope"></i>
              <input
                id="reg-email"
                name="email"
                type="email"
                className={`form-input ${hasSubmitted && errors.email ? 'has-error' : ''}`}
                placeholder="e.g. sophia.turner@company.com"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>
            {hasSubmitted && errors.email && (
              <p className="form-error">
                <i className="fa-solid fa-circle-exclamation"></i>
                <span>{errors.email}</span>
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div className="form-group">
            <label className="form-label" htmlFor="reg-phone">
              Phone Number <span style={{ color: 'var(--error)' }}>*</span>
            </label>
            <div className="form-input-container">
              <i className="fa-solid fa-phone"></i>
              <input
                id="reg-phone"
                name="phone"
                type="tel"
                className={`form-input ${hasSubmitted && errors.phone ? 'has-error' : ''}`}
                placeholder="e.g. 4155552671"
                value={formData.phone}
                onChange={handleChange}
                autoComplete="tel"
              />
            </div>
            {hasSubmitted && errors.phone && (
              <p className="form-error">
                <i className="fa-solid fa-circle-exclamation"></i>
                <span>{errors.phone}</span>
              </p>
            )}
          </div>

          {/* Actions Row (Fixed for Image 4: No clipping, 100% visible on mobile) */}
          <div className="registration-form-actions">
            <button
              type="button"
              className="btn btn-outline"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-confirm-reg"
            >
              <i className="fa-solid fa-ticket"></i>
              <span>Confirm Registration</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default RegistrationForm;
