import React, { useEffect, useState } from 'react';

function Preloader({ isLoading = true, onFinish }) {
  const [shouldRender, setShouldRender] = useState(isLoading);
  const [fadeClass, setFadeClass] = useState('preloader-visible');

  useEffect(() => {
    if (!isLoading) {
      setFadeClass('preloader-exit');
      const timer = setTimeout(() => {
        setShouldRender(false);
        if (onFinish) onFinish();
      }, 450);
      return () => clearTimeout(timer);
    } else {
      setShouldRender(true);
      setFadeClass('preloader-visible');
    }
  }, [isLoading, onFinish]);

  if (!shouldRender) return null;

  return (
    <aside
      className={`preloader-overlay ${fadeClass}`}
      role="status"
      aria-label="Loading page content"
    >
      <div className="preloader-content">
        {/* Animated Brand Emblem */}
        <div className="preloader-emblem-wrap">
          <div className="preloader-pulse-ring"></div>
          <div className="preloader-spinner-ring"></div>
          <div className="preloader-brand-icon">
            <i className="fa-solid fa-layer-group"></i>
          </div>
        </div>

        {/* Brand Name */}
        <div className="preloader-text-group">
          <h2 className="preloader-title">STACKLY</h2>
          <p className="preloader-subtitle">
            <span>Discover</span> • <span>Connect</span> • <span>Experience</span>
          </p>
        </div>

        {/* Animated Slim Progress Bar */}
        <div className="preloader-bar">
          <div className="preloader-bar-fill"></div>
        </div>
      </div>
    </aside>
  );
}

export default Preloader;
