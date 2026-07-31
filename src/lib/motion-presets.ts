import type { Transition, Variants } from "motion/react";

export const easeLux = [0.22, 1, 0.36, 1] as const;
export const easeSmooth = [0.16, 1, 0.3, 1] as const;

/** Fire slightly before the block enters the viewport (positive bottom margin). */
export const inViewOptions = {
  once: true,
  amount: 0.08,
  margin: "0px 0px 18% 0px",
} as const;

export const viewportEnter = inViewOptions;

export type RevealVariant = "rise" | "slideLeft" | "slideRight" | "scale" | "blur" | "fade" | "pop";

const visibleTransition = (delayMs = 0): Transition => ({
  duration: 1.05,
  ease: easeSmooth,
  delay: delayMs / 1000,
});

export const revealVariants: Record<RevealVariant, Variants> = {
  rise: {
    hidden: { opacity: 0, y: 56 },
    visible: {
      opacity: 1,
      y: 0,
      transition: visibleTransition(),
    },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 72 },
    visible: {
      opacity: 1,
      x: 0,
      transition: visibleTransition(),
    },
  },
  slideRight: {
    hidden: { opacity: 0, x: -72 },
    visible: {
      opacity: 1,
      x: 0,
      transition: visibleTransition(),
    },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.88, y: 24 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: visibleTransition(),
    },
  },
  pop: {
    hidden: { opacity: 0, scale: 0.35 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 420, damping: 26 },
    },
  },
  blur: {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.95, ease: easeSmooth },
    },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.85, ease: easeSmooth },
    },
  },
};

export function revealTransition(delayMs = 0): Transition {
  return visibleTransition(delayMs);
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.04,
    },
  },
};

export const staggerItem: Variants = revealVariants.rise;

/* ------------------------------------------------------------------ *
 * Interaction springs — shared so every hover/tap across the site
 * settles with the same weight.
 * ------------------------------------------------------------------ */

/** Crisp, low-overshoot: buttons, links, small controls. */
export const springSnappy: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 28,
  mass: 0.7,
};

/** Softer and heavier: cards, panels, anything with real surface area. */
export const springSurface: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 26,
  mass: 0.9,
};

/** Loose tracking for pointer-driven values (tilt, spotlight). */
export const springPointer = {
  stiffness: 150,
  damping: 18,
  mass: 0.4,
} as const;

/** Standard hover lift + tap compression for interactive surfaces. */
export const hoverLift = {
  whileHover: { y: -6, transition: springSurface },
  whileTap: { y: -2, scale: 0.99, transition: springSnappy },
} as const;

/** Standard hover/tap for buttons and pill links. */
export const hoverPress = {
  whileHover: { scale: 1.035, transition: springSnappy },
  whileTap: { scale: 0.97, transition: springSnappy },
} as const;

/** Word-by-word heading reveal, used with `SplitText`. */
export const wordReveal: Variants = {
  hidden: { opacity: 0, y: "0.55em", filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: "0em",
    filter: "blur(0px)",
    transition: { duration: 0.72, ease: easeLux },
  },
};
