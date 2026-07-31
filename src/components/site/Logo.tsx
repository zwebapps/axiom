"use client";

import { motion, useReducedMotion } from "motion/react";

import { LogoMark } from "./LogoMark";

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
      className={`flex items-center gap-3.5 ${className}`}
      initial={shouldAnimate ? "hidden" : "show"}
      animate="show"
      whileHover={reduceMotion ? undefined : { scale: 1.015 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: 0.09, delayChildren: 0.02 },
        },
      }}
    >
      <LogoMark animate={animate} className="h-11 w-12 sm:h-12 sm:w-[3.25rem]" />

      <div className="leading-none">
        <motion.div
          className="flex flex-wrap items-baseline gap-x-2 font-display text-[1.05rem] tracking-[0.12em] sm:text-xl sm:tracking-[0.1em]"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.07 } },
          }}
        >
          <motion.span
            className="text-transparent"
            style={{ WebkitTextStroke: "1px oklch(0.82 0.02 255)" }}
            variants={{
              hidden: { opacity: 0, x: -12 },
              show: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.65, ease: easeLux },
              },
            }}
          >
            AXIOM
          </motion.span>
          <motion.span
            className="text-gold-gradient"
            variants={{
              hidden: { opacity: 0, x: 12 },
              show: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.65, ease: easeLux },
              },
            }}
          >
            VERTEX
          </motion.span>
        </motion.div>

        {!compact ? (
          <motion.div
            className="mt-1.5 flex items-center gap-2"
            variants={{
              hidden: { opacity: 0, y: 6 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.55, ease: easeLux, delay: 0.2 },
              },
            }}
          >
            <motion.span
              className="h-px w-5 origin-right bg-gold sm:w-6"
              variants={{
                hidden: { scaleX: 0, opacity: 0 },
                show: {
                  scaleX: 1,
                  opacity: 1,
                  transition: { duration: 0.5, ease: easeLux, delay: 0.28 },
                },
              }}
            />
            <span className="text-[8px] font-sans font-medium tracking-[0.55em] text-muted-foreground sm:text-[9px]">
              GROUP
            </span>
            <motion.span
              className="h-px w-5 origin-left bg-muted-foreground/50 sm:w-6"
              variants={{
                hidden: { scaleX: 0, opacity: 0 },
                show: {
                  scaleX: 1,
                  opacity: 1,
                  transition: { duration: 0.5, ease: easeLux, delay: 0.34 },
                },
              }}
            />
          </motion.div>
        ) : null}
      </div>
    </motion.div>
  );
}
