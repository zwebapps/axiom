"use client";

import { motion, useReducedMotion } from "motion/react";

import { logos } from "@/content/logos";
import { useSiteContent } from "@/context/SiteContentProvider";

const easeLux = [0.22, 1, 0.36, 1] as const;

type LogoProps = {
  compact?: boolean;
  animate?: boolean;
  className?: string;
  /** Official header lockup PNG (navbar) */
  lockup?: boolean;
  /** Larger lockup for footer brand column */
  footer?: boolean;
};

/** Black-backed PNG lockups: lighten blends the plate into navy backgrounds. */
const lockupImgEffects =
  "[mix-blend-mode:lighten] brightness-[1.14] contrast-[1.1] saturate-[1.06] drop-shadow-[0_2px_28px_rgba(245,199,106,0.32)]";

export function Logo({
  compact = false,
  animate = true,
  className = "",
  lockup = false,
  footer = false,
}: LogoProps) {
  const { content } = useSiteContent();
  const brand = content.brand;
  const reduceMotion = useReducedMotion();
  const shouldAnimate = animate && !reduceMotion;

  if (lockup) {
    const lockupSize = footer
      ? compact
        ? "h-10 w-auto max-w-[168px] object-contain object-left sm:h-11"
        : `h-14 w-auto max-w-[min(100%,340px)] object-contain object-left sm:h-16 sm:max-w-[420px] md:h-[72px] md:max-w-[480px] ${lockupImgEffects}`
      : compact
        ? `h-10 w-auto max-w-[168px] object-contain object-left sm:h-11 ${lockupImgEffects}`
        : `h-14 w-auto max-w-[min(100%,min(70vw,320px))] object-contain object-left sm:h-16 sm:max-w-[400px] md:h-[72px] md:max-w-[480px] ${lockupImgEffects}`;

    return (
      <motion.div
        className={`inline-flex items-center ${className}`}
        initial={shouldAnimate ? { opacity: 0, y: 6 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: easeLux }}
        whileHover={reduceMotion ? undefined : { scale: 1.03 }}
      >
        <img
          src={compact ? logos.mark : logos.header}
          alt={brand.name}
          className={lockupSize}
          width={557}
          height={192}
          decoding="async"
          fetchPriority={footer ? undefined : "high"}
        />
      </motion.div>
    );
  }

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
            ? `h-9 w-auto object-contain sm:h-10 ${lockupImgEffects}`
            : `h-10 w-auto max-w-[min(100%,300px)] object-contain object-left sm:h-12 sm:max-w-[340px] ${lockupImgEffects}`
        }
        width={compact ? 120 : 420}
        height={compact ? 132 : 88}
      />
    </motion.div>
  );
}
