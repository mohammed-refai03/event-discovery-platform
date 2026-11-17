import React, { useEffect, useState } from 'react';
import RegistrationForm from './RegistrationForm';
import { isUserRegistered } from '../utils/localStorage';

function EventModal({
  isOpen,
  onClose,
  event,
  isFavourited,
  onToggleFavourite,
  initialView = 'details', // 'details' or 'register'
  onRegistrationComplete
}) {
  const [currentView, setCurrentView] = useState(initialView);

  // Sync initial view when modal opens or event changes
  useEffect(() => {
    if (isOpen) {
      setCurrentView(initialView);
    }
  }, [isOpen, initialView, event]);

  // Handle Escape key & Scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Lock background scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen || !event) return null;

  const isRegistered = isUserRegistered(event.id);

  const getBadgeClass = (category) => {
    const cat = (category || '').toLowerCase();
    if (cat === 'technology') return 'badge-technology';
    if (cat === 'business') return 'badge-business';
    if (cat === 'design') return 'badge-design';
    if (cat === 'education') return 'badge-education';
    return 'badge-technology';
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-event-title"
    >
      <div
        className="modal-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        {currentView === 'register' ? (
          <div style={{ padding: '2rem' }}>
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={() => setCurrentView('details')}
              style={{ marginBottom: '1rem' }}
            >
              <i className="fa-solid fa-arrow-left"></i>
              <span>Back to Details</span>
            </button>
            <RegistrationForm
              event={event}
              onClose={onClose}
              onRegistrationComplete={onRegistrationComplete}
            />
          </div>
        ) : (
          <>
            {/* Event Media Banner */}
            <div className="modal-banner">
              <img src={event.image} alt={event.title} />
              <span className={`badge ${getBadgeClass(event.category)}`} style={{ position: 'absolute', bottom: '1rem', left: '1.5rem' }}>
                {event.category}
              </span>
              <button
                type="button"
                className={`event-card-favourite ${isFavourited ? 'is-favourite' : ''}`}
                onClick={() => onToggleFavourite && onToggleFavourite(event.id)}
                style={{ position: 'absolute', bottom: '1rem', right: '1.5rem' }}
                aria-label={isFavourited ? 'Remove from favourites' : 'Save to favourites'}
              >
                <i className={`${isFavourited ? 'fa-solid' : 'fa-regular'} fa-heart`}></i>
              </button>
            </div>

            {/* Modal Body */}
            <div className="modal-content-body">
              <h2 id="modal-event-title" style={{ fontSize: '1.65rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>
                {event.title}
              </h2>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                Organized by <strong>{event.organizer || 'Industry Professionals'}</strong>
              </p>

              {/* Meta Row */}
              <div className="modal-meta-row">
                <div className="modal-meta-item">
                  <i className="fa-regular fa-calendar"></i>
                  <span>{event.displayDate || event.date}</span>
                </div>
                <div className="modal-meta-item">
                  <i className="fa-solid fa-location-dot"></i>
                  <span>{event.location}</span>
                </div>
                {event.availableSeats && (
                  <div className="modal-meta-item" style={{ color: '#E11D48', fontWeight: 600 }}>
                    <i className="fa-solid fa-fire"></i>
                    <span>{event.availableSeats} spots available</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <h4 className="modal-section-title">About This Experience</h4>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.96rem' }}>
                {event.description}
              </p>

              {/* Highlights / Agenda */}
              {event.highlights && event.highlights.length > 0 && (
                <>
                  <h4 className="modal-section-title">Key Takeaways & Highlights</h4>
                  <div className="modal-highlights">
                    {event.highlights.map((item, index) => (
                      <div key={index} className="modal-highlight-item">
                        <i className="fa-solid fa-circle-check"></i>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Modal Action Footer */}
            <div className="modal-footer">
              <div>
                <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Ticket Price</span>
                <span style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--primary)' }}>
                  {event.price || 'Free'}
                </span>
              </div>

              {isRegistered ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span className="badge badge-confirmed">
                    <i className="fa-solid fa-check"></i> Registered
                  </span>
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={onClose}
                  >
                    Close
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  onClick={() => setCurrentView('register')}
                >
                  <i className="fa-solid fa-ticket"></i>
                  <span>Register Now</span>
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default EventModal;
