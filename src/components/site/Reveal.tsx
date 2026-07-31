"use client";

import { motion, useInView, useReducedMotion, type HTMLMotionProps } from "motion/react";
import { useRef, type CSSProperties, type ReactNode, type AriaAttributes } from "react";

import {
  inViewOptions,
  revealTransition,
  revealVariants,
  staggerContainer,
  type RevealVariant,
} from "@/lib/motion-presets";

const motionTags = {
  div: motion.div,
  section: motion.section,
  li: motion.li,
  span: motion.span,
  article: motion.article,
} as const;

function useScrollReveal() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, inViewOptions);
  const reduceMotion = useReducedMotion();
  const show = reduceMotion || inView;
  return { ref, show, reduceMotion };
}

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
  const { ref, show, reduceMotion } = useScrollReveal();
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
    ref: ref as React.RefObject<HTMLDivElement>,
    className,
    style,
    initial: "hidden",
    animate: show ? "visible" : "hidden",
    variants: revealVariants[variant],
    transition,
  };

  return <Tag {...motionProps}>{children}</Tag>;
}

export function RevealStagger({
  children,
  className = "",
  style,
  stagger = 0.14,
  delayChildren = 0.04,
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
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, inViewOptions);
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
      ref={ref as React.RefObject<HTMLDivElement>}
      id={id}
      className={className}
      style={style}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        ...staggerContainer,
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
    <motion.div className={className} variants={revealVariants[variant]}>
      {children}
    </motion.div>
  );
}
