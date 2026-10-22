/**
 * Core Web Vitals Monitoring (LCP, CLS, INP, FID)
 * Zero runtime cost observer pattern storing metrics in window.__vitals
 */
export function initVitals() {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

  window.__vitals = {
    lcp: 0,
    cls: 0,
    inp: 0,
    fid: 0
  };

  try {
    // 1. Largest Contentful Paint (LCP)
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      if (lastEntry) {
        window.__vitals.lcp = Math.round(lastEntry.renderTime || lastEntry.loadTime);
      }
    });
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

    // 2. Cumulative Layout Shift (CLS)
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          window.__vitals.cls = Number(clsValue.toFixed(4));
        }
      }
    });
    clsObserver.observe({ type: 'layout-shift', buffered: true });

    // 3. First Input Delay (FID)
    const fidObserver = new PerformanceObserver((entryList) => {
      const firstInput = entryList.getEntries()[0];
      if (firstInput) {
        window.__vitals.fid = Math.round(firstInput.processingStart - firstInput.startTime);
      }
    });
    fidObserver.observe({ type: 'first-input', buffered: true });

    // 4. Interaction to Next Paint (INP)
    if (PerformanceObserver.supportedEntryTypes && PerformanceObserver.supportedEntryTypes.includes('event')) {
      const inpObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (entry.interactionId) {
            const duration = entry.duration;
            if (duration > window.__vitals.inp) {
              window.__vitals.inp = Math.round(duration);
            }
          }
        }
      });
      inpObserver.observe({ type: 'event', buffered: true, durationThreshold: 16 });
    }
  } catch (err) {
    // Graceful bypass
  }
}
