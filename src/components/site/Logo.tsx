"use client";

import { motion, useReducedMotion } from "motion/react";

import { brand, logos } from "@/content/site";

const easeLux = [0.22, 1, 0.36, 1] as const;

type LogoProps = {
  compact?: boolean;
  animate?: boolean;
  className?: string;
};

export function Logo({ compact = false, animate = true, className = "" }: LogoProps) {
  const reduceMotion = useReducedMotion();
  const shouldAnimate = animate && !reduceMotion;

  return (
    <motion.div
      className={`inline-flex items-center ${className}`}
      initial={shouldAnimate ? { opacity: 0, y: 6 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: easeLux }}
      whileHover={reduceMotion ? undefined : { scale: 1.02 }}
    >
      <img
        src={compact ? logos.mark : logos.full}
        alt={brand.name}
        className={
          compact
            ? "h-9 w-auto object-contain sm:h-10 [mix-blend-mode:lighten]"
            : "h-9 w-auto max-w-[min(100%,280px)] object-contain object-left sm:h-11 sm:max-w-[320px] [mix-blend-mode:lighten]"
        }
        width={compact ? 120 : 420}
        height={compact ? 132 : 88}
      />
    </motion.div>
  );
}
