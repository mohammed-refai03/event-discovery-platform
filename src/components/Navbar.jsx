import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getAssetUrl } from '../utils/assetPath';

function Navbar({ registrationCount = 0 }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setIsMobileMenuOpen(false);

  // Strict scroll lock when fullscreen drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.documentElement.classList.add('drawer-scroll-locked');
      document.body.classList.add('drawer-scroll-locked');

      const preventTouch = (e) => {
        // Prevent scrolling background if touch occurs outside the scrollable drawer body
        if (!e.target.closest('.drawer-body')) {
          e.preventDefault();
        }
      };

      document.addEventListener('touchmove', preventTouch, { passive: false });

      return () => {
        document.documentElement.classList.remove('drawer-scroll-locked');
        document.body.classList.remove('drawer-scroll-locked');
        document.removeEventListener('touchmove', preventTouch);
      };
    }
  }, [isMobileMenuOpen]);

  // Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <nav className="navbar" role="navigation" aria-label="Main Navigation">
        <div className="container navbar-container">
          {/* Brand Logo */}
          <Link to="/" className="navbar-brand" onClick={closeMenu} aria-label="STACKLY Home">
            <img
              src={getAssetUrl('images/logo.webp')}
              alt="STACKLY"
              className="brand-logo-img"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                if (e.currentTarget.nextElementSibling) {
                  e.currentTarget.nextElementSibling.style.display = 'inline-flex';
                }
              }}
            />
            <span className="navbar-brand-text-fallback" style={{ display: 'none', alignItems: 'center', gap: '0.65rem' }}>
              <div className="navbar-brand-icon">
                <i className="fa-solid fa-layer-group"></i>
              </div>
              <span>STACKLY</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="navbar-links desktop-only">
            <Link
              to="/"
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
            >
              <i className="fa-solid fa-house"></i>
              <span>Home</span>
            </Link>
            <Link
              to="/events"
              className={`nav-link ${isActive('/events') ? 'active' : ''}`}
            >
              <i className="fa-solid fa-compass"></i>
              <span>Explore Events</span>
            </Link>
            <Link
              to="/my-registrations"
              className={`nav-link ${isActive('/my-registrations') ? 'active' : ''}`}
            >
              <i className="fa-solid fa-ticket"></i>
              <span>My Registrations</span>
              {registrationCount > 0 && (
                <span className="nav-badge" aria-label={`${registrationCount} registered events`}>
                  {registrationCount}
                </span>
              )}
            </Link>
          </div>

          {/* Right Action & Mobile Toggle */}
          <div className="navbar-actions">
            <Link to="/events" className="btn btn-primary btn-sm desktop-only">
              <span>Find Workshops</span>
              <i className="fa-solid fa-arrow-right"></i>
            </Link>

            <button
              type="button"
              className="navbar-toggle"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              <i className="fa-solid fa-bars"></i>
            </button>
          </div>
        </div>
      </nav>

      {/* ===================================================================
          FULLSCREEN MOBILE NAVIGATION DRAWER
         =================================================================== */}
      <div
        className={`fullscreen-drawer ${isMobileMenuOpen ? 'drawer-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
      >
        {/* Drawer Header */}
        <div className="drawer-header container">
          <Link to="/" className="navbar-brand" onClick={closeMenu} aria-label="STACKLY Home">
            <img
              src={getAssetUrl('images/logo.webp')}
              alt="STACKLY"
              className="brand-logo-img"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                if (e.currentTarget.nextElementSibling) {
                  e.currentTarget.nextElementSibling.style.display = 'inline-flex';
                }
              }}
            />
            <span className="navbar-brand-text-fallback" style={{ display: 'none', alignItems: 'center', gap: '0.65rem' }}>
              <div className="navbar-brand-icon">
                <i className="fa-solid fa-layer-group"></i>
              </div>
              <span>STACKLY</span>
            </span>
          </Link>

          <button
            type="button"
            className="drawer-close-btn"
            onClick={closeMenu}
            aria-label="Close navigation menu"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Drawer Body with Navigation Links */}
        <div className="drawer-body container">
          <div className="drawer-links-list">
            <Link
              to="/"
              className={`drawer-link ${isActive('/') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              <div className="drawer-link-icon">
                <i className="fa-solid fa-house"></i>
              </div>
              <div className="drawer-link-text">
                <span className="drawer-link-title">Home</span>
                <span className="drawer-link-sub">Discover curated workshops</span>
              </div>
              <i className="fa-solid fa-chevron-right drawer-chevron"></i>
            </Link>

            <Link
              to="/events"
              className={`drawer-link ${isActive('/events') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              <div className="drawer-link-icon">
                <i className="fa-solid fa-compass"></i>
              </div>
              <div className="drawer-link-text">
                <span className="drawer-link-title">Explore Events</span>
                <span className="drawer-link-sub">Conferences, seminars & masterclasses</span>
              </div>
              <i className="fa-solid fa-chevron-right drawer-chevron"></i>
            </Link>

            <Link
              to="/my-registrations"
              className={`drawer-link ${isActive('/my-registrations') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              <div className="drawer-link-icon">
                <i className="fa-solid fa-ticket"></i>
              </div>
              <div className="drawer-link-text">
                <span className="drawer-link-title">
                  My Registrations
                  {registrationCount > 0 && (
                    <span className="nav-badge" style={{ marginLeft: '0.6rem' }}>
                      {registrationCount}
                    </span>
                  )}
                </span>
                <span className="drawer-link-sub">View tickets & calendar schedule</span>
              </div>
              <i className="fa-solid fa-chevron-right drawer-chevron"></i>
            </Link>
          </div>

          {/* Drawer CTA Button */}
          <div className="drawer-cta-wrap">
            <Link
              to="/events"
              className="btn btn-primary btn-lg drawer-primary-btn"
              onClick={closeMenu}
            >
              <i className="fa-solid fa-magnifying-glass"></i>
              <span>Find Workshops & Events</span>
            </Link>
          </div>

          {/* Drawer Footer Information */}
          <div className="drawer-footer-info">
            <p className="drawer-contact-line">
              <i className="fa-solid fa-phone"></i> 9876543210
            </p>
            <p className="drawer-contact-line">
              <i className="fa-regular fa-envelope"></i> info@stackly.com
            </p>
            <p className="drawer-address-line">
              <i className="fa-solid fa-location-dot"></i> MMR Complex, Chinna Thirupathi, Salem, TN 636008
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
