import React, { useEffect } from 'react';
import baseConfig from '../data/particlesConfig.json';

export default function ParticlesBackground() {
  useEffect(() => {
    let checkInterval = null;

    const cleanupParticles = () => {
      try {
        if (window.pJSDom && window.pJSDom.length > 0) {
          for (let i = 0; i < window.pJSDom.length; i++) {
            if (window.pJSDom[i]?.pJS?.fn?.drawAnimFrame) {
              cancelAnimationFrame(window.pJSDom[i].pJS.fn.drawAnimFrame);
            }
          }
          window.pJSDom = [];
        }
      } catch (e) {}
    };

    const init = () => {
      if (typeof window.particlesJS === 'function') {
        try {
          cleanupParticles();

          const doc = document.documentElement;
          const isLowEnd = doc.classList.contains('low-end') || !!(window.__deviceTier && window.__deviceTier.isLowEnd);
          const isReducedMotion = doc.classList.contains('reduced-motion') ||
            (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

          // Clone base configuration
          const config = JSON.parse(JSON.stringify(baseConfig));

          const isMobile = window.innerWidth < 768;
          const isMidTier = doc.classList.contains('mid-tier');

          // 17. Particle count scaling by device tier
          let particleCount = 72;
          let particleSpeed = 3;

          if (isReducedMotion) {
            particleCount = 30;
            particleSpeed = 0;
          } else if (isLowEnd) {
            particleCount = 24;
            particleSpeed = 0.5;
          } else if (isMobile || isMidTier) {
            particleCount = 42;
            particleSpeed = 2;
          }

          const linkDistance = isMobile ? 125 : 165;

          config.particles.number.value = particleCount;
          config.particles.number.density.enable = false;
          config.particles.line_linked.distance = linkDistance;
          config.particles.move.speed = particleSpeed;

          // 23. Wrap execution in try-catch
          window.particlesJS('particles-js', config);
        } catch (err) {
          console.warn('particlesJS gracefully bypassed:', err);
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

    // 20. Lifecycle: Pause particle animation when tab is inactive to use 0% CPU
    const handleVisibilityChange = () => {
      try {
        if (window.pJSDom && window.pJSDom[0]?.pJS?.fn) {
          const pJS = window.pJSDom[0].pJS;
          if (document.hidden) {
            if (pJS.fn.drawAnimFrame) cancelAnimationFrame(pJS.fn.drawAnimFrame);
          } else {
            pJS.fn.drawAnimFrame = requestAnimationFrame(pJS.fn.vendors.draw);
          }
        }
      } catch (e) {}
    };
    document.addEventListener('visibilitychange', handleVisibilityChange, { passive: true });

    // 22. GPU Memory Cleanup on Unload
    window.addEventListener('beforeunload', cleanupParticles, { once: true });

    return () => {
      if (checkInterval) clearInterval(checkInterval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', cleanupParticles);
      cleanupParticles();
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
