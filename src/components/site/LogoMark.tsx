"use client";

import { motion, useReducedMotion } from "motion/react";

import { logos } from "@/content/site";

type LogoMarkProps = {
  className?: string;
  animate?: boolean;
};

export function LogoMark({ className = "h-11 w-10", animate = true }: LogoMarkProps) {
  const reduceMotion = useReducedMotion();
  const shouldAnimate = animate && !reduceMotion;

  return (
    <motion.img
      src={logos.mark}
      alt=""
      aria-hidden
      className={`shrink-0 object-contain [mix-blend-mode:lighten] ${className}`}
      width={120}
      height={132}
      initial={
        shouldAnimate ? { opacity: 0, y: -8, scale: 0.92 } : { opacity: 1, y: 0, scale: 1 }
      }
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
    />
  );
}
