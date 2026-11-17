import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { events } from '../data/events';
import SearchFilter from '../components/SearchFilter';
import EventGrid from '../components/EventGrid';
import LetterRiseHeading from '../components/LetterRiseHeading';

function ExploreEvents({ onSelectEvent, favourites, onToggleFavourite }) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read initial query params
  const initialCategory = searchParams.get('category') || 'All Events';
  const initialSearch = searchParams.get('search') || '';
  const initialLocation = searchParams.get('location') || 'All Locations';
  const initialFeatured = searchParams.get('featured') === 'true';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  const [sortOption, setSortOption] = useState('default');

  // Sync state if URL query params change (e.g. navigating via footer or navbar)
  useEffect(() => {
    const cat = searchParams.get('category') || 'All Events';
    const q = searchParams.get('search') || '';
    const loc = searchParams.get('location') || 'All Locations';

    setSelectedCategory(cat);
    setSearchQuery(q);
    setSelectedLocation(loc);
  }, [searchParams]);

  // Update URL search parameters when filters change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    const newParams = new URLSearchParams(searchParams);
    if (category === 'All Events') {
      newParams.delete('category');
    } else {
      newParams.set('category', category);
    }
    setSearchParams(newParams);
  };

  const handleLocationChange = (loc) => {
    setSelectedLocation(loc);
    const newParams = new URLSearchParams(searchParams);
    if (loc === 'All Locations') {
      newParams.delete('location');
    } else {
      newParams.set('location', loc);
    }
    setSearchParams(newParams);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    const newParams = new URLSearchParams(searchParams);
    if (!query) {
      newParams.delete('search');
    } else {
      newParams.set('search', query);
    }
    setSearchParams(newParams);
  };

  const handleClearSearch = () => {
    handleSearchChange('');
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Events');
    setSelectedLocation('All Locations');
    setSortOption('default');
    setSearchParams({});
  };

  // Filter & Sort Logic
  const filteredEvents = useMemo(() => {
    let result = [...events];

    // Filter by Featured flag if requested
    if (initialFeatured) {
      result = result.filter((ev) => ev.featured);
    }

    // Filter by Category
    if (selectedCategory && selectedCategory !== 'All Events') {
      result = result.filter(
        (ev) => ev.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by Location
    if (selectedLocation && selectedLocation !== 'All Locations') {
      result = result.filter((ev) =>
        ev.location.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }

    // Filter by Search query (case-insensitive title and description)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (ev) =>
          ev.title.toLowerCase().includes(q) ||
          ev.shortDescription.toLowerCase().includes(q) ||
          ev.category.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sortOption === 'earliest') {
      result.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortOption === 'latest') {
      result.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    return result;
  }, [selectedCategory, selectedLocation, searchQuery, sortOption, initialFeatured]);

  return (
    <div className="explore-events-page">
      {/* Header Banner */}
      <section className="explore-header reveal-fade-up">
        <div className="container">
          <span className="eyebrow">DISCOVER EXPERIENCES</span> <br />
          <LetterRiseHeading as="h1" text="Explore Events & Workshops" className="explore-title" />
          <p className="explore-subtitle">
            Find workshops, conferences, and networking opportunities worth showing up for.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container" style={{ paddingBottom: '5rem' }}>
        {/* Search & Filter Toolbar */}
        <div className="reveal-fade-up">
          <SearchFilter
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            selectedLocation={selectedLocation}
            onLocationChange={handleLocationChange}
            sortOption={sortOption}
            onSortChange={setSortOption}
            onClearSearch={handleClearSearch}
          />
        </div>

        {/* Results Metadata Summary */}
        <div className="results-meta reveal-fade-up">
          <div>
            Showing <strong>{filteredEvents.length}</strong> of{' '}
            <strong>{events.length}</strong> events
            {selectedCategory !== 'All Events' && (
              <span> in <strong>{selectedCategory}</strong></span>
            )}
            {selectedLocation !== 'All Locations' && (
              <span> near <strong>{selectedLocation}</strong></span>
            )}
            {searchQuery && (
              <span> matching &ldquo;<strong>{searchQuery}</strong>&rdquo;</span>
            )}
          </div>

          {(selectedCategory !== 'All Events' ||
            selectedLocation !== 'All Locations' ||
            searchQuery) && (
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={handleResetFilters}
            >
              <i className="fa-solid fa-arrow-rotate-left"></i>
              <span>Reset All Filters</span>
            </button>
          )}
        </div>

        {/* Event Grid Display */}
        <div className="reveal-fade-up reveal-delay-1">
          <EventGrid
            events={filteredEvents}
            onSelectEvent={onSelectEvent}
            favourites={favourites}
            onToggleFavourite={onToggleFavourite}
            emptyTitle="No matching events found"
            emptyMessage="We couldn't find any events matching your active filters. Try clearing your search query or selecting another category."
            onResetFilters={handleResetFilters}
          />
        </div>
      </div>
    </div>
  );
}

export default ExploreEvents;
