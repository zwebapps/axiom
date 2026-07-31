"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { hoverPress } from "@/lib/motion-presets";

/**
 * Motion redefines the drag and animation handlers with its own signatures,
 * so they're dropped from the passthrough props rather than fought with.
 * Nothing on this site uses them on a button or link.
 */
type MotionConflicts =
  | "onDrag"
  | "onDragStart"
  | "onDragEnd"
  | "onAnimationStart"
  | "onAnimationEnd"
  | "onAnimationIteration";

type MotionLinkProps = { children: ReactNode } & Omit<
  ComponentPropsWithoutRef<"a">,
  MotionConflicts
>;

type MotionButtonProps = { children: ReactNode } & Omit<
  ComponentPropsWithoutRef<"button">,
  MotionConflicts
>;

/**
 * Anchor with a spring hover/tap. The existing `btn-*` utility classes keep
 * doing the visual work — this only adds the physical feel.
 */
export function MotionLink({ children, className = "", ...rest }: MotionLinkProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <a className={className} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <motion.a className={className} {...hoverPress} {...rest}>
      {children}
    </motion.a>
  );
}

/** Button counterpart of `MotionLink`. */
export function MotionButton({ children, className = "", ...rest }: MotionButtonProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <button className={className} {...rest}>
        {children}
      </button>
    );
  }

  return (
    <motion.button className={className} {...hoverPress} {...rest}>
      {children}
    </motion.button>
  );
}
