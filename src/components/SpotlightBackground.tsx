import React, { useEffect, useState } from 'react';

export const SpotlightBackground: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });
  const [isPointerDevice, setIsPointerDevice] = useState(true);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) {
      setIsPointerDevice(false);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Blueprint Dot Grid */}
      <div className="absolute inset-0 blueprint-grid opacity-80" />

      {/* Dynamic Cursor Spotlight (Desktop) */}
      {isPointerDevice && (
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(650px circle at ${mousePosition.x}px ${mousePosition.y}px, var(--spotlight-glow), transparent 70%)`,
          }}
        />
      )}

      {/* Subtle Ambient Vignette & Top Grid Fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-base/80" />
    </div>
  );
};

