"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

/**
 * Hairline gold progress bar pinned above the navbar.
 * Decorative only — the same information is available from the scrollbar.
 */
export function ScrollProgress() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  if (reduceMotion) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-linear-to-r from-gold-deep via-gold-soft to-gold-deep"
      style={{ scaleX }}
    />
  );
}
