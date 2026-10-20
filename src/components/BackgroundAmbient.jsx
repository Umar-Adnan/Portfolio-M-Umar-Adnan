import React, { useEffect, useRef } from 'react';

export default function BackgroundAmbient() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Micro-particles and code fragments drifting slowly (Consumes ~0% CPU)
    const particleCount = 28;
    const particles = [];
    const codeSnippets = ['01', 'λ', 'RoR', 'PyTorch', 'C++', 'UMT', 'AI', 'git'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vy: 0.15 + Math.random() * 0.25, // very slow drift
        text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
        opacity: 0.03 + Math.random() * 0.05
      });
    }

    let lastTime = 0;
    const render = (time) => {
      // Throttle to 30 FPS to preserve battery
      if (time - lastTime > 33) {
        lastTime = time;

        if (document.visibilityState === 'visible') {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          ctx.font = '11px JetBrains Mono, monospace';
          particles.forEach((p) => {
            p.y += p.vy;
            if (p.y > canvas.height) {
              p.y = -10;
              p.x = Math.random() * canvas.width;
            }

            ctx.fillStyle = `rgba(255, 0, 51, ${p.opacity})`;
            ctx.fillText(p.text, p.x, p.y);
          });
        }
      }
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
      aria-hidden="true"
    />
  );
}
