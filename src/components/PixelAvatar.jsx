import React, { useEffect, useRef, useState } from 'react';
import { RotateCcw, Sparkles, Shield, Terminal } from 'lucide-react';

export default function PixelAvatar() {
  const canvasRef = useRef(null);
  const [isAssembled, setIsAssembled] = useState(false);
  const [progress, setProgress] = useState(0);

  const startAnimation = () => {
    setIsAssembled(false);
    setProgress(0);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onerror = () => {
      if (img.src.endsWith('.webp')) {
        img.src = '/avatar.jpg';
      }
    };
    img.src = '/avatar.webp';

    img.onload = () => {
      const size = 320;
      canvas.width = size;
      canvas.height = size;

      // Render image onto offscreen canvas to sample pixel colors
      const offscreen = document.createElement('canvas');
      offscreen.width = size;
      offscreen.height = size;
      const offCtx = offscreen.getContext('2d');

      // Calculate square center crop from 682x1024
      const srcW = img.naturalWidth;
      const srcH = img.naturalHeight;
      const cropSize = Math.min(srcW, srcH) * 0.88;
      const cropX = (srcW - cropSize) / 2;
      const cropY = (srcH - cropSize) * 0.42;

      offCtx.drawImage(img, cropX, cropY, cropSize, cropSize, 0, 0, size, size);

      // Create circular mask that removes the outer gray outline
      // Circle center: size/2, radius: size * 0.455 (just inside the gray ring)
      const cx = size / 2;
      const cy = size / 2;
      const radius = size * 0.455;

      const imgData = offCtx.getImageData(0, 0, size, size);
      const data = imgData.data;

      // Extract grid of pixel blocks for authentic pixel-by-pixel assembly
      const blockSize = 4; // 4px pixel art chunks
      const blocks = [];

      for (let y = 0; y < size; y += blockSize) {
        for (let x = 0; x < size; x += blockSize) {
          const dx = x + blockSize / 2 - cx;
          const dy = y + blockSize / 2 - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Only keep pixels inside the circle (gray outline on periphery is completely clipped out)
          if (dist <= radius) {
            const idx = (y * size + x) * 4;
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];
            const a = data[idx + 3];

            if (a > 30) {
              // Check if pixel is gray border residue: if neutral gray near periphery, skip it
              const isGray = Math.abs(r - g) < 18 && Math.abs(g - b) < 18 && r > 90 && r < 170;
              if (dist > radius - 8 && isGray) {
                continue; // Skip gray ring pixel
              }

              blocks.push({
                x,
                y,
                r,
                g,
                b,
                // Assign a randomized reveal time within 2.3 seconds
                delay: Math.random() * 2000 + (y / size) * 400
              });
            }
          }
        }
      }

      // Animate pixel by pixel over 2.4 seconds
      const startTime = performance.now();
      const duration = 2400; // 2.4 seconds total animation

      const renderFrame = (now) => {
        const elapsed = now - startTime;
        const currentProgress = Math.min(1, elapsed / duration);
        setProgress(Math.round(currentProgress * 100));

        ctx.clearRect(0, 0, size, size);

        // Draw inner dark circle base
        ctx.fillStyle = '#0a0a0d';
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();

        // Draw pixels that have unlocked
        blocks.forEach((block) => {
          if (elapsed >= block.delay) {
            // Flash red for 150ms upon spawning, then show true color
            const timeSinceSpawn = elapsed - block.delay;
            if (timeSinceSpawn < 120) {
              ctx.fillStyle = '#ff0033';
            } else {
              ctx.fillStyle = `rgb(${block.r}, ${block.g}, ${block.b})`;
            }
            ctx.fillRect(block.x, block.y, blockSize, blockSize);
          }
        });

        // Draw a glowing Crimson Red Cybernetic Ring replacing the old gray ring
        ctx.save();
        ctx.strokeStyle = '#ff0033';
        ctx.lineWidth = 3;
        ctx.shadowColor = '#ff0033';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(cx, cy, radius + 1, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        if (currentProgress < 1) {
          requestAnimationFrame(renderFrame);
        } else {
          setIsAssembled(true);
        }
      };

      requestAnimationFrame(renderFrame);
    };
  };

  useEffect(() => {
    startAnimation();
  }, []);

  return (
    <div className="flex flex-col items-center">
      
      {/* Canvas Wrapper */}
      <div className="relative group">
        <canvas
          ref={canvasRef}
          className="w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 block rounded-full"
        />

        {/* Ambient Backlight Glow */}
        <div className="absolute inset-0 rounded-full bg-[#ff0033]/20 blur-2xl -z-10 pointer-events-none" />

        {/* Scan Status Badge */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#111116] border border-[#ff0033]/40 text-[10px] font-mono flex items-center gap-1.5 shadow-lg whitespace-nowrap">
          <span className={`w-2 h-2 rounded-full ${isAssembled ? 'bg-[#ff0033]' : 'bg-[#ff0033] animate-ping'}`} />
          <span className="text-zinc-200 font-semibold">
            {isAssembled ? 'BIO-CORE: ONLINE' : `DECODING PIXELS: ${progress}%`}
          </span>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="mt-6 flex items-center gap-2">
        <button
          onClick={startAnimation}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-[#ff0033] text-zinc-300 hover:text-white border border-white/10 hover:border-[#ff0033] transition-all text-xs font-mono"
          title="Replay Pixel Assembly Animation"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Replay Pixel Build</span>
        </button>
      </div>

    </div>
  );
}
