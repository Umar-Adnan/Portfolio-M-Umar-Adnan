import React, { useEffect } from 'react';
import particlesConfig from '../data/particlesConfig.json';

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

          // Launch particles.js with exact config from particlesjs-config.json
          window.particlesJS('particles-js', particlesConfig);
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
