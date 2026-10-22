import React, { useRef } from 'react';

/**
 * Ultra-high-performance 3D Tilt Card
 * - Zero React state updates on mousemove (direct DOM transforms via requestAnimationFrame)
 * - Skips entirely on low-end hardware, touch screens, and prefers-reduced-motion
 * - 120 FPS hardware-accelerated (will-change: transform)
 * - Dynamic crimson specular glare follows cursor
 */
export default function TiltCard({ children, className = '', maxTilt = 8, ...props }) {
  const cardRef = useRef(null);
  const glareRef = useRef(null);
  const rafId = useRef(null);

  const handleMouseMove = (e) => {
    // 28. Skip 3D tilt on low-end hardware, touch devices or reduced motion
    const doc = document.documentElement;
    if (doc.classList.contains('low-end') || doc.classList.contains('reduced-motion') || doc.classList.contains('touch-device')) {
      return;
    }

    const card = cardRef.current;
    if (!card) return;

    if (rafId.current) return;
    const clientX = e.clientX;
    const clientY = e.clientY;

    rafId.current = requestAnimationFrame(() => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      const xPct = (x / rect.width) - 0.5;
      const yPct = (y / rect.height) - 0.5;

      const rotateX = -yPct * maxTilt;
      const rotateY = xPct * maxTilt;

      cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.012, 1.012, 1.012)`;

      if (glareRef.current) {
        glareRef.current.style.opacity = '0.12';
        glareRef.current.style.background = `radial-gradient(circle 280px at ${x}px ${y}px, rgba(255, 0, 51, 0.25), transparent 70%)`;
      }
      rafId.current = null;
    });
  };

  const handleMouseLeave = () => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }
    if (glareRef.current) {
      glareRef.current.style.opacity = '0';
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transition: 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
        transformStyle: 'preserve-3d',
        willChange: 'transform'
      }}
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      {/* Dynamic Cursor Red Glare */}
      <div
        ref={glareRef}
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-10"
        style={{ opacity: 0 }}
      />
      {children}
    </div>
  );
}
