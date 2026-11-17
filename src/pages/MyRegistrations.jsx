import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getRegistrations, cancelRegistration } from '../utils/localStorage';
import { events } from '../data/events';
import EmptyState from '../components/EmptyState';
import LetterRiseHeading from '../components/LetterRiseHeading';

function MyRegistrations({ registrations = [], onSelectEvent, onRegistrationsChange }) {
  const navigate = useNavigate();

  // Ensure synchronous persistence on page refresh: fallback to getRegistrations() immediately
  const [localRegistrations, setLocalRegistrations] = useState(() => getRegistrations());

  // Keep in sync with parent props or storage updates
  useEffect(() => {
    if (registrations && registrations.length > 0) {
      setLocalRegistrations(registrations);
    } else {
      const fresh = getRegistrations();
      setLocalRegistrations(fresh);
    }
  }, [registrations]);

  // Ensure cards are always revealed on refresh/mount immediately
  useEffect(() => {
    const timer = setTimeout(() => {
      const cards = document.querySelectorAll('.registration-card');
      cards.forEach((card) => card.classList.add('is-revealed'));
    }, 40);
    return () => clearTimeout(timer);
  }, [localRegistrations]);

  const activeRegistrations = localRegistrations;

  // Cancel Confirmation Modal State
  const [cancellingItem, setCancellingItem] = useState(null);

  const handleOpenCancelDialog = (registration) => {
    setCancellingItem(registration);
  };

  const handleCloseCancelDialog = () => {
    setCancellingItem(null);
  };

  const handleConfirmCancel = () => {
    if (!cancellingItem) return;

    cancelRegistration(cancellingItem.id);
    const updated = getRegistrations();
    setLocalRegistrations(updated);
    if (onRegistrationsChange) {
      onRegistrationsChange();
    }
    setCancellingItem(null);
  };

  const handleViewEventDetails = (reg) => {
    // Look up original event in events dataset
    const matched = events.find((ev) => ev.id === reg.eventId);
    if (matched) {
      onSelectEvent(matched);
    } else {
      // Fallback object from registration data
      onSelectEvent({
        id: reg.eventId,
        title: reg.eventTitle,
        category: reg.eventCategory,
        date: reg.eventDate,
        displayDate: reg.eventDate,
        location: reg.eventLocation,
        image: reg.eventImage,
        description: 'You are registered for this event.'
      });
    }
  };

  const getBadgeClass = (category) => {
    const cat = (category || '').toLowerCase();
    if (cat === 'technology') return 'badge-technology';
    if (cat === 'business') return 'badge-business';
    if (cat === 'design') return 'badge-design';
    if (cat === 'education') return 'badge-education';
    return 'badge-technology';
  };

  return (
    <div className="my-registrations-page">
      {/* Header Banner */}
      <section className="explore-header reveal-fade-up">
        <div className="container">
          <span className="eyebrow">YOUR CALENDAR</span> <br />
          <LetterRiseHeading as="h1" text="My Registrations" className="explore-title" />
          <p className="explore-subtitle">
            Keep track of the experiences and workshops you&apos;ve signed up for.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container" style={{ paddingBottom: '5rem' }}>
        {activeRegistrations.length === 0 ? (
          <div className="reveal-fade-up">
            <EmptyState
              icon="fa-calendar-xmark"
              title="No events on your calendar yet."
              message="Discover something exciting and make your next experience count. Browse our workshops and secure your spot today."
              actionLabel="Explore Events"
              onAction={() => navigate('/events')}
            />
          </div>
        ) : (
          <>
            <div className="reveal-fade-up" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                You have <strong>{activeRegistrations.length}</strong> active{' '}
                {activeRegistrations.length === 1 ? 'registration' : 'registrations'}
              </p>
              <Link to="/events" className="btn btn-outline btn-sm">
                <i className="fa-solid fa-plus"></i>
                <span>Register for More</span>
              </Link>
            </div>

            <div className="registrations-list">
              {activeRegistrations.map((reg, idx) => (
                <article key={reg.id} className={`registration-card reveal-fade-up reveal-delay-${(idx % 4) + 1}`}>
                  {/* Event Thumbnail */}
                  <div
                    className="registration-thumb"
                    onClick={() => handleViewEventDetails(reg)}
                    style={{ cursor: 'pointer' }}
                  >
                    <img src={reg.eventImage} alt={reg.eventTitle} loading="lazy" />
                  </div>

                  {/* Body Information */}
                  <div className="registration-body">
                    <div className="registration-top-meta">
                      <span className={`badge ${getBadgeClass(reg.eventCategory)}`}>
                        {reg.eventCategory}
                      </span>
                      <span className="badge badge-confirmed">
                        <i className="fa-solid fa-circle-check"></i> Confirmed
                      </span>
                    </div>

                    <h3
                      className="registration-title"
                      onClick={() => handleViewEventDetails(reg)}
                      style={{ cursor: 'pointer' }}
                    >
                      {reg.eventTitle}
                    </h3>

                    <div className="registration-info-grid">
                      <div>
                        <span style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)' }}>Date & Time</span>
                        <span style={{ fontWeight: 600, color: 'var(--primary)' }}>
                          <i className="fa-regular fa-calendar" style={{ marginRight: '0.35rem', color: 'var(--accent)' }}></i>
                          {reg.eventDate}
                        </span>
                      </div>

                      <div>
                        <span style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)' }}>Location</span>
                        <span style={{ fontWeight: 600, color: 'var(--primary)' }}>
                          <i className="fa-solid fa-location-dot" style={{ marginRight: '0.35rem', color: 'var(--accent)' }}></i>
                          {reg.eventLocation}
                        </span>
                      </div>

                      <div>
                        <span style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)' }}>Attendee Name</span>
                        <span style={{ color: 'var(--text-secondary)' }}>
                          <i className="fa-regular fa-user" style={{ marginRight: '0.35rem' }}></i>
                          {reg.name}
                        </span>
                      </div>

                      <div>
                        <span style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)' }}>Confirmation Email</span>
                        <span style={{ color: 'var(--text-secondary)' }}>
                          <i className="fa-regular fa-envelope" style={{ marginRight: '0.35rem' }}></i>
                          {reg.email}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="registration-actions">
                    <button
                      type="button"
                      className="btn btn-outline btn-sm"
                      onClick={() => handleViewEventDetails(reg)}
                      style={{ width: '100%' }}
                    >
                      <span>View Details</span>
                      <i className="fa-solid fa-arrow-up-right-from-square"></i>
                    </button>

                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => handleOpenCancelDialog(reg)}
                      style={{ width: '100%' }}
                      aria-label={`Cancel registration for ${reg.eventTitle}`}
                    >
                      <i className="fa-solid fa-trash-can"></i>
                      <span>Cancel</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Cancel Confirmation Dialog */}
      {cancellingItem && (
        <div
          className="modal-overlay"
          onClick={handleCloseCancelDialog}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="modal-dialog"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '480px', padding: '2rem', textAlign: 'center' }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--error-bg)',
                color: 'var(--error)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.8rem',
                margin: '0 auto 1.25rem'
              }}
            >
              <i className="fa-solid fa-triangle-exclamation"></i>
            </div>

            <h3 style={{ fontSize: '1.4rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>
              Cancel Registration?
            </h3>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.75rem' }}>
              Are you sure you want to cancel your registration for{' '}
              <strong>&ldquo;{cancellingItem.eventTitle}&rdquo;</strong>? This will release your seat for other attendees. You can register again later if spots remain available.
            </p>

            <div style={{ display: 'flex', gap: '0.85rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="btn btn-outline"
                onClick={handleCloseCancelDialog}
              >
                Keep Registration
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleConfirmCancel}
              >
                Yes, Cancel Registration
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyRegistrations;
