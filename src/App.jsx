import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ExploreEvents from './pages/ExploreEvents';
import MyRegistrations from './pages/MyRegistrations';
import EventModal from './components/EventModal';
import Preloader from './components/Preloader';
import {
  getRegistrations,
  getFavourites,
  toggleFavourite
} from './utils/localStorage';

// ScrollToTop & Dynamic Scroll-to-Reveal Intersection Observer
function ScrollAndRevealHandler() {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Genuine AOS & GSAP style Scroll-to-Reveal observer
  useEffect(() => {
    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          // Once revealed, unobserve to keep high performance
          observer.unobserve(entry.target);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const scanAndObserve = () => {
      const targets = document.querySelectorAll(
        '.reveal-on-scroll, .reveal-fade-up, .reveal-fade-left, .reveal-fade-right, .reveal-zoom-in, .reveal-text, .letters-rise-wrapper, .stacking-words'
      );

      targets.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 30) {
          el.classList.add('is-revealed');
        } else {
          observer.observe(el);
        }
      });
    };

    // Immediate initial scan
    scanAndObserve();

    // Secondary scan to catch asynchronously/locally populated elements (e.g. registrations list on refresh)
    const scanTimeout = setTimeout(scanAndObserve, 80);
    const scanTimeout2 = setTimeout(scanAndObserve, 300);

    return () => {
      clearTimeout(scanTimeout);
      clearTimeout(scanTimeout2);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}

function AppContent() {
  const location = useLocation();
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [registrations, setRegistrations] = useState(() => getRegistrations());
  const [favourites, setFavourites] = useState(() => getFavourites());

  // Modal State
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalView, setModalView] = useState('details');

  // Initial load preloader
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Route transition effect with preloader
  const [isFirstRender, setIsFirstRender] = useState(true);
  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }
    setIsPageLoading(true);
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 380);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Load registrations & favourites from LocalStorage
  const refreshStorageData = useCallback(() => {
    setRegistrations(getRegistrations());
    setFavourites(getFavourites());
  }, []);

  useEffect(() => {
    refreshStorageData();

    // Listen for custom storage events dispatched within the app
    const handleStorageChange = () => {
      refreshStorageData();
    };

    window.addEventListener('stackly_storage_change', handleStorageChange);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('stackly_storage_change', handleStorageChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [refreshStorageData]);

  // Handle Event Modal Open
  const handleOpenEventModal = (event, view = 'details') => {
    setSelectedEvent(event);
    setModalView(view);
    setIsModalOpen(true);
  };

  const handleCloseEventModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  // Handle Favourite Toggle
  const handleToggleFavourite = (eventId) => {
    toggleFavourite(eventId);
    setFavourites(getFavourites());
  };

  const handleRegistrationComplete = () => {
    refreshStorageData();
  };

  return (
    <div className="app-container">
      {/* Page Preloader */}
      <Preloader isLoading={isPageLoading} />

      <ScrollAndRevealHandler />
      <Navbar registrationCount={registrations.length} />

      <main className="main-content page-enter-animation">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                onSelectEvent={(ev) => handleOpenEventModal(ev, "details")}
                favourites={favourites}
                onToggleFavourite={handleToggleFavourite}
              />
            }
          />
          <Route
            path="/events"
            element={
              <ExploreEvents
                onSelectEvent={(ev) => handleOpenEventModal(ev, "details")}
                favourites={favourites}
                onToggleFavourite={handleToggleFavourite}
              />
            }
          />
          <Route
            path="/my-registrations"
            element={
              <MyRegistrations
                registrations={registrations}
                onSelectEvent={(ev) => handleOpenEventModal(ev, "details")}
                onRegistrationsChange={refreshStorageData}
              />
            }
          />
        </Routes>
      </main>

      <Footer />

      {/* Global Event Details & Registration Modal */}
      {selectedEvent && (
        <EventModal
          isOpen={isModalOpen}
          onClose={handleCloseEventModal}
          event={selectedEvent}
          isFavourited={favourites.includes(selectedEvent.id)}
          onToggleFavourite={handleToggleFavourite}
          initialView={modalView}
          onRegistrationComplete={handleRegistrationComplete}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
