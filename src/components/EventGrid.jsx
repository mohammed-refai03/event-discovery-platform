import React from 'react';
import EventCard from './EventCard';
import EmptyState from './EmptyState';

function EventGrid({
  events = [],
  onSelectEvent,
  favourites = [],
  onToggleFavourite,
  emptyTitle = 'No events found',
  emptyMessage = 'Try adjusting your search criteria or filters to discover other available experiences.',
  onResetFilters
}) {
  if (!events || events.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        message={emptyMessage}
        actionLabel={onResetFilters ? 'Reset Filters' : 'Explore Events'}
        onAction={onResetFilters}
      />
    );
  }

  return (
    <div className="event-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.75rem' }}>
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onSelectEvent={onSelectEvent}
          isFavourited={favourites.includes(event.id)}
          onToggleFavourite={onToggleFavourite}
        />
      ))}
    </div>
  );
}

export default EventGrid;
