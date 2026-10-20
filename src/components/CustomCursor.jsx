import React, { useEffect } from 'react';

export default function CustomCursor() {
  useEffect(() => {
    const handleMouseDown = () => {
      document.body.classList.add('cursor-clicking');
    };
    const handleMouseUp = () => {
      document.body.classList.remove('cursor-clicking');
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.classList.remove('cursor-clicking');
    };
  }, []);

  return null; // Cursor is rendered via native hardware-accelerated CSS SVG arrow for zero latency
}
