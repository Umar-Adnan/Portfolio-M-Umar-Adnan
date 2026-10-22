import React, { useEffect } from 'react';

export default function CustomCursor() {
  useEffect(() => {
    // 28. Skip custom cursor entirely on touch devices and low-end hardware
    const isTouch = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    const isLowEnd = document.documentElement.classList.contains('low-end');
    if (isTouch || isLowEnd) return;

    let scheduled = false;

    // 25. RAF-throttled event handlers
    const handleMouseDown = () => {
      if (!scheduled) {
        scheduled = true;
        requestAnimationFrame(() => {
          document.body.classList.add('cursor-clicking');
          scheduled = false;
        });
      }
    };

    const handleMouseUp = () => {
      if (!scheduled) {
        scheduled = true;
        requestAnimationFrame(() => {
          document.body.classList.remove('cursor-clicking');
          scheduled = false;
        });
      }
    };

    // 26. Passive event listeners
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.classList.remove('cursor-clicking');
    };
  }, []);

  return null;
}
