import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check for touch / pointer capability and reduced motion
    const touchCheck =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches;
    const reducedMotionCheck = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (touchCheck || reducedMotionCheck) {
      setIsTouchDevice(true);
      return;
    }
    setIsTouchDevice(false);

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Check if hovering over clickable items
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isClickable = Boolean(
        target.closest('a, button, [role="button"], input, textarea, select, label')
      );
      setIsHovered(isClickable);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  if (isTouchDevice || !isVisible) {
    return null;
  }

  return (
    <>
      {/* Central crisp dot */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-50 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-lime shadow-[0_0_8px_var(--accent-lime)]"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      />
      {/* Outer interactive ring */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-50 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent-lime/60"
        style={{
          x: smoothX,
          y: smoothY,
        }}
        animate={{
          width: isHovered ? 40 : 24,
          height: isHovered ? 40 : 24,
          borderColor: isHovered ? 'var(--accent-lime)' : 'rgba(198, 255, 61, 0.4)',
          backgroundColor: isHovered ? 'var(--accent-lime-glow)' : 'transparent',
        }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
      />
    </>
  );
};

