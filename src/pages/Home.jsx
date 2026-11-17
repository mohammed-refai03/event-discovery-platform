import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { events, categories, locations } from '../data/events';
import EventCard from '../components/EventCard';
import CategoryCard from '../components/CategoryCard';
import LetterRiseHeading from '../components/LetterRiseHeading';

function Home({ onSelectEvent, favourites, onToggleFavourite }) {
  const navigate = useNavigate();

  // Floating search state
  const [heroSearch, setHeroSearch] = useState('');
  const [heroLocation, setHeroLocation] = useState('All Locations');
  const [heroCategory, setHeroCategory] = useState('All Events');

  const handleHeroSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (heroSearch.trim()) params.set('search', heroSearch.trim());
    if (heroLocation !== 'All Locations') params.set('location', heroLocation);
    if (heroCategory !== 'All Events') params.set('category', heroCategory);

    navigate(`/events?${params.toString()}`);
  };

  // Filter 3 featured events
  const featuredEvents = events.filter((ev) => ev.featured).slice(0, 3);

  // Take 4 upcoming events for horizontal row layout
  const upcomingEvents = events.slice(0, 4);

  return (
    <div className="home-page">
      {/* ===================================================================
          1. HERO SECTION (Matching uploaded image layout)
         =================================================================== */}
      <section className="hero-section" aria-label="Hero Introduction">
        <div className="container">
          <div className="hero-grid">
            {/* Left Content */}
            <div className="hero-content reveal-fade-up">
              <span className="eyebrow">
                <i className="fa-solid fa-star" style={{ color: 'var(--accent)' }}></i>
                YOUR NEXT EXPERIENCE STARTS HERE
              </span>

              <h1 className="hero-title stacking-words">
                <span className="stack-word" style={{ transitionDelay: '0.05s' }}>Discover</span>
                <span className="stack-word" style={{ transitionDelay: '0.16s' }}>Events</span>
                <span className="stack-word highlight" style={{ transitionDelay: '0.28s' }}>That</span>
                <span className="stack-word highlight" style={{ transitionDelay: '0.40s' }}>Inspire</span>
              </h1>

              <p className="hero-description">
                Explore inspiring workshops, connect with creative minds, and discover events that turn your curiosity into opportunity. Join thousands of lifelong learners today.
              </p>

              <div className="hero-buttons">
                <Link to="/events" className="btn btn-primary btn-lg">
                  <i className="fa-solid fa-compass"></i>
                  <span>Explore Events</span>
                </Link>
                <Link to="/my-registrations" className="btn btn-secondary btn-lg">
                  <i className="fa-solid fa-ticket"></i>
                  <span>My Registrations</span>
                </Link>
              </div>

              <div className="hero-trust">
                <div className="hero-trust-item">
                  <i className="fa-solid fa-circle-check"></i>
                  <span>Verified Organizers</span>
                </div>
                <div className="hero-trust-item">
                  <i className="fa-solid fa-shield-halved"></i>
                  <span>Instant Confirmation</span>
                </div>
                <div className="hero-trust-item">
                  <i className="fa-solid fa-users"></i>
                  <span>10,000+ Community Members</span>
                </div>
              </div>
            </div>

            {/* Right Visual Composition (Matching Image with Float Animation) */}
            <div className="hero-visual reveal-zoom-in">
              {/* Tall Trending Card */}
              <div
                className="hero-card-tall floating-hero-card"
                onClick={() => onSelectEvent(events[0])}
                style={{ cursor: 'pointer' }}
              >
                <span className="hero-card-tall-badge">
                  <i className="fa-solid fa-fire"></i> Trending
                </span>
                <img
                  src="/images/banners/hero-trending.webp"
                  alt="Neon Night Festival"
                  className="hero-card-tall-image"
                />
                <div className="hero-card-tall-body">
                  <span className="badge badge-technology" style={{ fontSize: '0.7rem' }}>Technology & Music</span>
                  <h3 className="hero-card-tall-title">Neon Night Festival 2027</h3>
                  <p className="hero-card-tall-meta">
                    <i className="fa-solid fa-location-dot"></i> San Francisco, CA
                  </p>
                </div>
              </div>

              {/* Small Cards Stack */}
              <div className="hero-stack floating-hero-stack">
                <div
                  className="hero-card-small"
                  onClick={() => onSelectEvent(events[4])}
                  style={{ cursor: 'pointer' }}
                >
                  <img
                    src="/images/banners/hero-workshop.webp"
                    alt="Creative Workshop"
                    className="hero-card-small-img"
                  />
                  <div className="hero-card-small-body">
                    <h4 className="hero-card-small-title">Creative Workshop</h4>
                    <span className="hero-card-small-info">
                      <i className="fa-regular fa-clock"></i> 24+ Attending
                    </span>
                  </div>
                </div>

                <div
                  className="hero-card-small"
                  onClick={() => onSelectEvent(events[1])}
                  style={{ cursor: 'pointer' }}
                >
                  <img
                    src="/images/banners/hero-community.webp"
                    alt="Future of AI Design"
                    className="hero-card-small-img"
                  />
                  <div className="hero-card-small-body">
                    <h4 className="hero-card-small-title">Future of AI Design 2027</h4>
                    <span className="hero-card-small-info">
                      <i className="fa-solid fa-award" style={{ color: 'var(--accent)' }}></i> Top Rated
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Search Strip (Matching Image) */}
          <div className="search-strip-container reveal-fade-up">
            <form className="search-strip" onSubmit={handleHeroSearchSubmit}>
              <div className="search-strip-field">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input
                  type="text"
                  placeholder="Search event, workshop or keyword..."
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  aria-label="Search event keywords"
                />
              </div>

              <div className="search-strip-divider"></div>

              <div className="search-strip-field">
                <i className="fa-solid fa-location-dot"></i>
                <select
                  value={heroLocation}
                  onChange={(e) => setHeroLocation(e.target.value)}
                  aria-label="Filter by location"
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc === 'All Locations' ? 'Any Location' : loc}
                    </option>
                  ))}
                </select>
              </div>

              <div className="search-strip-divider"></div>

              <div className="search-strip-field">
                <i className="fa-solid fa-shapes"></i>
                <select
                  value={heroCategory}
                  onChange={(e) => setHeroCategory(e.target.value)}
                  aria-label="Filter by category"
                >
                  <option value="All Events">All Categories</option>
                  <option value="Technology">Technology</option>
                  <option value="Business">Business</option>
                  <option value="Design">Design</option>
                  <option value="Education">Education</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary search-strip-btn">
                <span>Search</span>
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ===================================================================
          2. EXPLORE BY CATEGORY SECTION
         =================================================================== */}
      <section className="categories-section" aria-labelledby="cat-heading">
        <div className="container">
          <div className="section-header reveal-fade-up">
            <div>
              <span className="eyebrow" style={{ marginBottom: '0.4rem' }}>CURATED PATHS</span> <br />
              <LetterRiseHeading id="cat-heading" text="Explore By Category" className="section-header-title" />
            </div>
            <Link to="/events" className="section-header-link">
              <span>View All</span>
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>

          <div className="categories-grid">
            {categories.map((cat, idx) => (
              <div key={cat.id} className={`reveal-fade-up reveal-delay-${(idx % 4) + 1}`} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CategoryCard
                  category={cat}
                  onSelectCategory={(catName) => navigate(`/events?category=${encodeURIComponent(catName)}`)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================
          3. FEATURED EVENTS SECTION
         =================================================================== */}
      <section className="featured-section" aria-labelledby="featured-heading">
        <div className="container">
          <div className="section-header reveal-fade-up">
            <div>
              <span className="eyebrow" style={{ marginBottom: '0.4rem' }}>HANDPICKED</span> <br />
              <LetterRiseHeading id="featured-heading" text="Featured Events" className="section-header-title" />
            </div>
            <Link to="/events" className="section-header-link">
              <span>Explore All Featured</span>
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>

          <div className="event-grid-featured">
            {featuredEvents.map((event, idx) => (
              <div key={event.id} className={`reveal-fade-up reveal-delay-${(idx % 3) + 1}`}>
                <EventCard
                  event={event}
                  onSelectEvent={onSelectEvent}
                  isFavourited={favourites.includes(event.id)}
                  onToggleFavourite={onToggleFavourite}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================
          4. UPCOMING EVENTS (Horizontal Layout Matching Mockup - Image 1 Fix)
         =================================================================== */}
      <section className="upcoming-section" aria-labelledby="upcoming-heading">
        <div className="container">
          <div className="section-header reveal-fade-up">
            <div>
              <span className="eyebrow" style={{ marginBottom: '0.4rem' }}>HAPPENING SOON</span> <br />
              <LetterRiseHeading id="upcoming-heading" text="Upcoming Events" className="section-header-title" />
            </div>
            <Link to="/events" className="section-header-link">
              <span>View All Events ({events.length})</span>
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>

          <div className="upcoming-list">
            {upcomingEvents.map((event, idx) => (
              <article key={event.id} className={`upcoming-card reveal-fade-up reveal-delay-${(idx % 4) + 1}`}>
                <div
                  className="upcoming-card-thumb"
                  onClick={() => onSelectEvent(event)}
                  style={{ cursor: 'pointer' }}
                >
                  <img src={event.image} alt={event.title} loading="lazy" />
                </div>

                <div className="upcoming-card-info">
                  <div className="upcoming-card-meta-top">
                    <span className={`badge badge-${(event.category || '').toLowerCase()}`}>
                      {event.category}
                    </span>
                    <span className="upcoming-card-date">
                      <i className="fa-regular fa-calendar"></i> {event.displayDate || event.date}
                    </span>
                  </div>

                  <h3
                    className="upcoming-card-title"
                    onClick={() => onSelectEvent(event)}
                    style={{ cursor: 'pointer' }}
                    title={event.title}
                  >
                    {event.title}
                  </h3>

                  <p className="upcoming-card-location">
                    <i className="fa-solid fa-location-dot"></i> {event.location}
                  </p>

                  <div className="upcoming-card-stats">
                    <span>
                      <i className="fa-solid fa-users"></i> {event.availableSeats * 6} Participating
                    </span>
                    <span style={{ color: '#E11D48', fontWeight: 600 }}>
                      <i className="fa-solid fa-fire"></i> {event.availableSeats} seats left
                    </span>
                  </div>
                </div>

                <div className="upcoming-card-action">
                  <span className="upcoming-card-price">{event.price || 'Free'}</span>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => onSelectEvent(event)}
                  >
                    <span>View Details</span>
                    <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================
          5. PROMOTIONAL HOST CTA BANNER
         =================================================================== */}
      <section className="container" aria-label="Promotional banner">
        <div className="promo-banner reveal-zoom-in">
          <div className="promo-banner-content">
            <span className="eyebrow" style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', color: '#ffffff' }}>
              HOST WITH US
            </span>
            <h2 className="promo-banner-title">Your next big opportunity could be one event away.</h2>
            <p className="promo-banner-desc">
              Create an experience people will love. Our platform makes it easy to organize, promote, and register attendees in minutes.
            </p>
            <Link to="/events" className="btn btn-primary btn-lg">
              <span>Explore All Events</span>
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
