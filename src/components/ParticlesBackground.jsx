import React, { useEffect } from 'react';
import baseConfig from '../data/particlesConfig.json';

export default function ParticlesBackground() {
  useEffect(() => {
    let checkInterval = null;

    const init = () => {
      if (typeof window.particlesJS === 'function') {
        try {
          // Clean up any old particle instances before instantiating
          if (window.pJSDom && window.pJSDom.length > 0) {
            for (let i = 0; i < window.pJSDom.length; i++) {
              if (window.pJSDom[i]?.pJS?.fn?.drawAnimFrame) {
                cancelAnimationFrame(window.pJSDom[i].pJS.fn.drawAnimFrame);
              }
            }
            window.pJSDom = [];
          }

          // Clone base configuration
          const config = JSON.parse(JSON.stringify(baseConfig));

          // Device & viewport-aware performance scaling:
          // Low-end / mobile: 38 particles, distance 130px
          // Medium / laptop: 55 particles, distance 155px
          // Desktop: 72 particles, distance 170px
          const isMobile = window.innerWidth < 768;
          const isLowEnd = (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) || isMobile;

          const particleCount = isMobile ? 38 : (isLowEnd ? 52 : 72);
          const linkDistance = isMobile ? 130 : 165;

          // CRITICAL: Disable unbounded density scaling so zooming out or 4K never explodes particles to 2000+
          config.particles.number.value = particleCount;
          config.particles.number.density.enable = false;
          config.particles.line_linked.distance = linkDistance;

          // Launch particles.js with capped, ultra-smooth configuration
          window.particlesJS('particles-js', config);
        } catch (err) {
          console.error('particlesJS init error:', err);
        }
      }
    };

    if (typeof window.particlesJS === 'function') {
      init();
    } else {
      checkInterval = setInterval(() => {
        if (typeof window.particlesJS === 'function') {
          clearInterval(checkInterval);
          init();
        }
      }, 40);
    }

    // Performance optimization: Pause particle animation when tab is inactive to use 0% CPU
    const handleVisibilityChange = () => {
      if (window.pJSDom && window.pJSDom[0]?.pJS?.fn) {
        const pJS = window.pJSDom[0].pJS;
        if (document.hidden) {
          if (pJS.fn.drawAnimFrame) cancelAnimationFrame(pJS.fn.drawAnimFrame);
        } else {
          pJS.fn.drawAnimFrame = requestAnimationFrame(pJS.fn.vendors.draw);
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (checkInterval) clearInterval(checkInterval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (window.pJSDom && window.pJSDom.length > 0) {
        for (let i = 0; i < window.pJSDom.length; i++) {
          if (window.pJSDom[i]?.pJS?.fn?.drawAnimFrame) {
            cancelAnimationFrame(window.pJSDom[i].pJS.fn.drawAnimFrame);
          }
        }
        window.pJSDom = [];
      }
    };
  }, []);

  return (
    <div
      id="particles-js"
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
