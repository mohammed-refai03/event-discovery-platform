// STACKLY — LocalStorage Helper Utilities

const REGISTRATIONS_KEY = 'stackly_registrations';
const FAVOURITES_KEY = 'stackly_favourites';

/**
 * Safely parse JSON from LocalStorage
 * @param {string} key
 * @param {any} defaultValue
 * @returns {any}
 */
export const getStorageItem = (key, defaultValue = null) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultValue;
    return JSON.parse(raw);
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return defaultValue;
  }
};

/**
 * Safely save JSON to LocalStorage
 * @param {string} key
 * @param {any} value
 */
export const setStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    // Dispatch a custom event so other components in the same window can react
    window.dispatchEvent(new CustomEvent('stackly_storage_change', { detail: { key, value } }));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

/**
 * Safely remove an item from LocalStorage
 * @param {string} key
 */
export const removeStorageItem = (key) => {
  try {
    localStorage.removeItem(key);
    window.dispatchEvent(new CustomEvent('stackly_storage_change', { detail: { key, value: null } }));
  } catch (error) {
    console.error(`Error removing ${key} from localStorage:`, error);
  }
};

// --- Registration Helpers ---

/**
 * Get all registrations
 * @returns {Array} list of registered event objects with user details
 */
export const getRegistrations = () => {
  const data = getStorageItem(REGISTRATIONS_KEY, []);
  return Array.isArray(data) ? data : [];
};

/**
 * Check if user is registered for a given eventId
 * @param {string} eventId
 * @returns {boolean}
 */
export const isUserRegistered = (eventId) => {
  const registrations = getRegistrations();
  return registrations.some((reg) => reg.eventId === eventId);
};

/**
 * Add a new registration
 * @param {Object} registrationData { eventId, eventTitle, eventDate, eventLocation, eventCategory, eventImage, name, email, phone, registeredAt }
 * @returns {{ success: boolean, message: string, registration?: Object }}
 */
export const addRegistration = (registrationData) => {
  const current = getRegistrations();
  const alreadyExists = current.some((reg) => reg.eventId === registrationData.eventId);

  if (alreadyExists) {
    return {
      success: false,
      message: 'You are already registered for this event.'
    };
  }

  const newRegistration = {
    ...registrationData,
    id: `reg-${Date.now()}`,
    registeredAt: new Date().toISOString()
  };

  const updated = [newRegistration, ...current];
  setStorageItem(REGISTRATIONS_KEY, updated);

  return {
    success: true,
    message: 'Registration successful! See you at the event.',
    registration: newRegistration
  };
};

/**
 * Cancel/Remove a registration by its registration id or eventId
 * @param {string} identifier (can be registration id or eventId)
 * @returns {boolean}
 */
export const cancelRegistration = (identifier) => {
  const current = getRegistrations();
  const updated = current.filter(
    (reg) => reg.id !== identifier && reg.eventId !== identifier
  );
  setStorageItem(REGISTRATIONS_KEY, updated);
  return true;
};

// --- Favourites Helpers ---

/**
 * Get all favourite event IDs
 * @returns {Array<string>} list of event IDs
 */
export const getFavourites = () => {
  const data = getStorageItem(FAVOURITES_KEY, []);
  return Array.isArray(data) ? data : [];
};

/**
 * Check if an event is favourited
 * @param {string} eventId
 * @returns {boolean}
 */
export const isFavourite = (eventId) => {
  const favourites = getFavourites();
  return favourites.includes(eventId);
};

/**
 * Toggle favourite status for an event
 * @param {string} eventId
 * @returns {boolean} new favourite status
 */
export const toggleFavourite = (eventId) => {
  const current = getFavourites();
  let updated;
  let status = false;

  if (current.includes(eventId)) {
    updated = current.filter((id) => id !== eventId);
    status = false;
  } else {
    updated = [...current, eventId];
    status = true;
  }

  setStorageItem(FAVOURITES_KEY, updated);
  return status;
};
