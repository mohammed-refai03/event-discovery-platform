import React from 'react';
import { locations } from '../data/events';

const CATEGORIES = ['All Events', 'Technology', 'Business', 'Design', 'Education'];

function SearchFilter({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedLocation,
  onLocationChange,
  sortOption,
  onSortChange,
  onClearSearch
}) {
  return (
    <div className="toolbar-card aos-fade-up" role="region" aria-label="Event search and filter controls">
      {/* Search Input Row */}
      <div className="toolbar-search-row">
        <div className="search-input-wrapper">
          <i className="fa-solid fa-magnifying-glass search-leading-icon"></i>
          <input
            type="text"
            placeholder="Search events by title or keyword..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search events by name"
          />
          {searchQuery && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={onClearSearch}
              aria-label="Clear search input"
              title="Clear search"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          )}
        </div>
      </div>

      {/* Category Pills & Dropdowns Row */}
      <div className="toolbar-filters-row">
        {/* Category Pills */}
        <div className="category-pills" role="tablist" aria-label="Event category filters">
          {CATEGORIES.map((cat) => {
            const isActive =
              cat === 'All Events'
                ? !selectedCategory || selectedCategory === 'All Events'
                : selectedCategory === cat;

            return (
              <button
                key={cat}
                type="button"
                className={`category-pill ${isActive ? 'active' : ''}`}
                onClick={() => onCategoryChange(cat)}
                role="tab"
                aria-selected={isActive}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Location & Sort Dropdowns with Font Awesome Icons */}
        <div className="toolbar-selects">
          {/* Location Dropdown with FontAwesome Icon */}
          <div className="select-with-icon">
            <i className="fa-solid fa-location-dot select-leading-icon"></i>
            <select
              className="toolbar-select with-icon"
              value={selectedLocation}
              onChange={(e) => onLocationChange(e.target.value)}
              aria-label="Filter events by location"
            >
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Dropdown with FontAwesome Icon */}
          <div className="select-with-icon">
            <i className="fa-solid fa-arrow-down-short-wide select-leading-icon"></i>
            <select
              className="toolbar-select with-icon"
              value={sortOption}
              onChange={(e) => onSortChange(e.target.value)}
              aria-label="Sort events"
            >
              <option value="default">Sort: Default</option>
              <option value="earliest">Date: Earliest First</option>
              <option value="latest">Date: Latest First</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchFilter;
