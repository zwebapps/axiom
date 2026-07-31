import type { Transition, Variants } from "motion/react";

export const easeLux = [0.22, 1, 0.36, 1] as const;

export const viewportEnter = {
  once: true,
  amount: 0.2,
  margin: "0px 0px -5% 0px",
} as const;

export type RevealVariant =
  | "rise"
  | "slideLeft"
  | "slideRight"
  | "scale"
  | "blur"
  | "fade"
  | "pop";

export const revealVariants: Record<RevealVariant, Variants> = {
  rise: {
    hidden: { opacity: 0, y: 52, filter: "blur(8px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 64, filter: "blur(4px)" },
    visible: { opacity: 1, x: 0, filter: "blur(0px)" },
  },
  slideRight: {
    hidden: { opacity: 0, x: -64, filter: "blur(4px)" },
    visible: { opacity: 1, x: 0, filter: "blur(0px)" },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.82, filter: "blur(6px)" },
    visible: { opacity: 1, scale: 1, filter: "blur(0px)" },
  },
  pop: {
    hidden: { opacity: 0, scale: 0.35 },
    visible: { opacity: 1, scale: 1 },
  },
  blur: {
    hidden: { opacity: 0, filter: "blur(14px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
};

export function revealTransition(delayMs = 0): Transition {
  return {
    duration: 0.8,
    ease: easeLux,
    delay: delayMs / 1000,
  };
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.06,
    },
  },
};

export const staggerItem: Variants = revealVariants.rise;
