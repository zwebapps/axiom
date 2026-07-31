"use client";

import { motion, useReducedMotion } from "motion/react";

const easeLux = [0.22, 1, 0.36, 1] as const;

type LogoMarkProps = {
  className?: string;
  animate?: boolean;
};

export function LogoMark({ className = "h-11 w-12", animate = true }: LogoMarkProps) {
  const reduceMotion = useReducedMotion();
  const shouldAnimate = animate && !reduceMotion;

  const drawTransition = {
    duration: 1,
    ease: easeLux,
  };

  return (
    <motion.svg
      viewBox="0 0 64 58"
      aria-hidden="true"
      className={`shrink-0 ${className}`}
      fill="none"
      initial={shouldAnimate ? "hidden" : "show"}
      animate="show"
    >
      <defs>
        <linearGradient id="axiom-mark-gold" x1="16" y1="6" x2="48" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="oklch(0.74 0.11 78)" />
          <stop offset="48%" stopColor="oklch(0.9 0.075 86)" />
          <stop offset="100%" stopColor="oklch(0.62 0.12 70)" />
        </linearGradient>
        <filter id="axiom-mark-shadow" x="-25%" y="-25%" width="150%" height="150%">
          <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="oklch(0.05 0 0)" floodOpacity="0.4" />
        </filter>
      </defs>

      <motion.path
        d="M14 50 L32 20 L50 50 Z"
        fill="oklch(0.94 0.008 255 / 0.1)"
        stroke="oklch(0.72 0.02 255)"
        strokeWidth="1.6"
        strokeLinejoin="miter"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          show: {
            pathLength: 1,
            opacity: 1,
            transition: drawTransition,
          },
        }}
      />

      <motion.path
        d="M12 50 H52"
        stroke="oklch(0.72 0.02 255)"
        strokeWidth="1.6"
        strokeLinecap="square"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          show: {
            pathLength: 1,
            opacity: 1,
            transition: { ...drawTransition, delay: 0.06 },
          },
        }}
      />

      <motion.path
        d="M18 50 L32 30 L46 50 Z"
        fill="oklch(0.96 0.006 255 / 0.08)"
        stroke="oklch(0.68 0.025 255)"
        strokeWidth="1.35"
        strokeLinejoin="miter"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          show: {
            pathLength: 1,
            opacity: 1,
            transition: { ...drawTransition, delay: 0.1 },
          },
        }}
      />

      <motion.path
        d="M32 7 L49 33 H15 L32 7 Z"
        fill="url(#axiom-mark-gold)"
        filter="url(#axiom-mark-shadow)"
        variants={{
          hidden: { opacity: 0, y: -12, scale: 0.9 },
          show: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
              type: "spring",
              stiffness: 280,
              damping: 22,
              delay: 0.22,
            },
          },
        }}
      />

      {shouldAnimate ? (
        <motion.path
          d="M32 7 L49 33 H15 L32 7 Z"
          fill="oklch(1 0 0 / 0.25)"
          style={{ mixBlendMode: "overlay" }}
          animate={{ opacity: [0.1, 0.35, 0.1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : null}
    </motion.svg>
  );
}
