import React, { useRef, useEffect } from 'react';
import { Fireworks } from 'fireworks-js';

export function FireworksCanvas({ active = true, duration = 8000, className = '' }) {
  const containerRef = useRef(null);
  const fireworksRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const fireworks = new Fireworks(containerRef.current, {
      autoresize: true,
      opacity: 0.8,
      acceleration: 1.05,
      friction: 0.97,
      gravity: 1.5,
      particles: 60,
      traceLength: 3,
      traceSpeed: 10,
      explosion: 6,
      intensity: 25,
      flickering: 50,
      lineStyle: 'round',
      hue: { min: 0, max: 360 },
      delay: { min: 15, max: 30 },
      brightness: { min: 50, max: 80 },
      decay: { min: 0.015, max: 0.03 }
    });

    fireworksRef.current = fireworks;

    if (active) {
      fireworks.start();
    }

    if (duration > 0) {
      const timer = setTimeout(() => {
        if (fireworksRef.current) {
          fireworksRef.current.waitStop();
        }
      }, duration);

      return () => clearTimeout(timer);
    }

    return () => {
      if (fireworksRef.current) {
        fireworksRef.current.stop();
      }
    };
  }, [active, duration]);

  if (!active) return null;

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none z-40 ${className}`}
    />
  );
}
