"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import type { CSSProperties, ReactNode, AriaAttributes } from "react";

import {
  revealTransition,
  revealVariants,
  viewportEnter,
  type RevealVariant,
} from "@/lib/motion-presets";

const motionTags = {
  div: motion.div,
  section: motion.section,
  li: motion.li,
  span: motion.span,
  article: motion.article,
} as const;

export function Reveal({
  children,
  delay = 0,
  className = "",
  style,
  as = "div",
  variant = "rise",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  as?: keyof typeof motionTags;
  variant?: RevealVariant;
}) {
  const reduceMotion = useReducedMotion();
  const Tag = motionTags[as];

  if (reduceMotion) {
    const Plain = as;
    return (
      <Plain className={className} style={style}>
        {children}
      </Plain>
    );
  }

  const transition =
    variant === "pop"
      ? { type: "spring" as const, stiffness: 440, damping: 26, delay: delay / 1000 }
      : revealTransition(delay);

  const motionProps: HTMLMotionProps<"div"> = {
    className,
    style,
    initial: "hidden",
    whileInView: "visible",
    viewport: viewportEnter,
    variants: revealVariants[variant],
    transition,
  };

  return <Tag {...motionProps}>{children}</Tag>;
}

export function RevealStagger({
  children,
  className = "",
  style,
  stagger = 0.1,
  delayChildren = 0.06,
  id,
  as = "div",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  stagger?: number;
  delayChildren?: number;
  id?: string;
  as?: "div" | "section";
} & AriaAttributes) {
  const reduceMotion = useReducedMotion();
  const MotionTag = as === "section" ? motion.section : motion.div;
  const PlainTag = as;

  if (reduceMotion) {
    return (
      <PlainTag id={id} className={className} style={style} {...rest}>
        {children}
      </PlainTag>
    );
  }

  return (
    <MotionTag
      id={id}
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={viewportEnter}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren },
        },
      }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({
  children,
  className = "",
  variant = "rise",
}: {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={revealVariants[variant]}
      transition={variant === "pop" ? { type: "spring", stiffness: 440, damping: 26 } : revealTransition(0)}
    >
      {children}
    </motion.div>
  );
}
