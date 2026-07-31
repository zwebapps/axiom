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

export type RevealVariant =
  | "rise"
  | "slideLeft"
  | "slideRight"
  | "scale"
  | "blur"
  | "fade"
  | "pop";

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
