import React from 'react';
import { Link } from 'react-router-dom';
import { getAssetUrl } from '../utils/assetPath';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Col */}
          <div className="footer-col-brand">
            <div className="footer-brand">
              <Link to="/" className="navbar-brand" aria-label="STACKLY Home">
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
                  <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.45rem', color: 'var(--primary)' }}>
                    STACKLY
                  </span>
                </span>
              </Link>
            </div>
            <p className="footer-desc">
              The premier editorial platform for discovering workshops, creative intensives, tech conferences, and executive networking sessions.
            </p>
            <div className="footer-socials">
              <a href="/"  className="footer-social-link" aria-label="Twitter">
                <i className="fa-brands fa-x-twitter"></i>
              </a>
              <a href="/"  className="footer-social-link" aria-label="LinkedIn">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
              <a href="/"  className="footer-social-link" aria-label="Instagram">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="/"  className="footer-social-link" aria-label="GitHub">
                <i className="fa-brands fa-github"></i>
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="footer-col-title">Platform</h4>
            <div className="footer-links">
              <Link to="/">Home</Link>
              <Link to="/events">Explore Events</Link>
              <Link to="/my-registrations">My Registrations</Link>
              <Link to="/events?featured=true">Featured Events</Link>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="footer-col-title">Categories</h4>
            <div className="footer-links">
              <Link to="/events?category=Technology">Technology</Link>
              <Link to="/events?category=Business">Business</Link>
              <Link to="/events?category=Design">Design</Link>
              <Link to="/events?category=Education">Education</Link>
            </div>
          </div>

          {/* Contact / Support */}
          <div>
            <h4 className="footer-col-title">Contact & Help</h4>
            <div className="footer-links footer-contact-info">
              <a href="" className="footer-contact-item">
                <i className="fa-regular fa-envelope"></i>
                <span>info@stackly.com</span>
              </a>
              <a href="" className="footer-contact-item">
                <i className="fa-solid fa-phone"></i>
                <span>9876543210</span>
              </a>
              <div className="footer-contact-item address-item">
                <i className="fa-solid fa-location-dot"></i>
                <span>MMR Complex, Chinna Thirupathi, near Chinna Muniyappan Kovil, Salem, Tamil Nadu 636008</span>
              </div>
              <span className="footer-hours">
                <i className="fa-regular fa-clock"></i> Mon - Sat: 9:00 AM – 6:00 PM IST
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>© {currentYear} STACKLY Technologies, Inc. All rights reserved.</p>
          <div className="footer-legal-links">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
