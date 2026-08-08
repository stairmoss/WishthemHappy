import React, { useEffect, useRef } from 'react';

export function CanvasParticles({ themeId = 'SOFT_DREAMY' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle pool
    const particleCount = themeId === 'COSMIC_STARLIGHT' ? 65 : 35;
    const particles = [];

    const getColors = (theme) => {
      switch (theme) {
        case 'COSMIC_STARLIGHT':
          return ['#F59E0B', '#818CF8', '#38BDF8', '#FFFFFF'];
        case 'VINTAGE_SEPIA':
          return ['#C68B59', '#A64B2A', '#EFE6D5', '#D4A373'];
        case 'CYBER_NEON':
          return ['#1DB954', '#FF007A', '#00F0FF', '#FFFFFF'];
        case 'LAVENDER_MINT':
          return ['#D8B4FE', '#A7F3D0', '#FEF08A', '#818CF8'];
        case 'SOFT_DREAMY':
        default:
          return ['#FFD1DC', '#FF6B8B', '#FFF5F7', '#FFFFFF'];
      }
    };

    const colors = getColors(themeId);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.5 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 0.4,
        vy: -Math.random() * 0.5 - 0.2, // float upwards
        alpha: Math.random() * 0.6 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.005
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += Math.sin(Date.now() * p.pulseSpeed) * 0.005;

        // Wrap around bounds
        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0.1, Math.min(0.8, p.alpha));
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [themeId]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        opacity: 0.75
      }}
    />
  );
}
