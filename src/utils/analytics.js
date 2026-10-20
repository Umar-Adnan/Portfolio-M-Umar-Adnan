// Lightweight privacy-first analytics helper
export const trackEvent = (eventName, eventParams = {}) => {
  try {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, eventParams);
    }
    // Also track in dev console
    if (import.meta.env.DEV) {
      console.log(`[Analytics] ${eventName}`, eventParams);
    }
  } catch (err) {
    // Fail silently to avoid breaking UX
  }
};
