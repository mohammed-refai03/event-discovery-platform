import React from 'react';

function EventCard({ event, onSelectEvent, isFavourited = false, onToggleFavourite }) {
  if (!event) return null;

  const handleFavouriteClick = (e) => {
    e.stopPropagation();
    if (onToggleFavourite) {
      onToggleFavourite(event.id);
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
    <article className="event-card" aria-label={event.title}>
      {/* Media & Badges */}
      <div className="event-card-media" onClick={() => onSelectEvent && onSelectEvent(event)} style={{ cursor: 'pointer' }}>
        <img src={event.image} alt={event.title} loading="lazy" />
        <span className={`badge ${getBadgeClass(event.category)} event-card-badge`}>
          {event.category}
        </span>
        <button
          type="button"
          className={`event-card-favourite ${isFavourited ? 'is-favourite' : ''}`}
          onClick={handleFavouriteClick}
          aria-label={isFavourited ? 'Remove from favourites' : 'Save to favourites'}
          title={isFavourited ? 'Remove from favourites' : 'Save to favourites'}
        >
          <i className={`${isFavourited ? 'fa-solid' : 'fa-regular'} fa-heart`}></i>
        </button>
      </div>

      {/* Body Details */}
      <div className="event-card-body">
        <div className="event-card-date">
          <i className="fa-regular fa-calendar"></i>
          <span>{event.displayDate || event.date}</span>
        </div>

        <h3
          className="event-card-title"
          onClick={() => onSelectEvent && onSelectEvent(event)}
          style={{ cursor: 'pointer' }}
          title={event.title}
        >
          {event.title}
        </h3>

        <div className="event-card-location">
          <i className="fa-solid fa-location-dot"></i>
          <span>{event.location}</span>
        </div>

        <p className="event-card-desc">{event.shortDescription}</p>

        {/* Footer Meta & Action */}
        <div className="event-card-footer">
          <div className="event-card-meta">
            <span className="event-card-price">{event.price || 'Free'}</span>
            {event.availableSeats && (
              <span className="event-card-seats">
                <i className="fa-solid fa-fire"></i> {event.availableSeats} seats left
              </span>
            )}
          </div>

          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => onSelectEvent && onSelectEvent(event)}
          >
            <span>View Details</span>
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </article>
  );
}

export default EventCard;
