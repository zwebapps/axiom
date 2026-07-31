"use client";

import { motion, useInView, useReducedMotion, type HTMLMotionProps } from "motion/react";
import {
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type AriaAttributes,
} from "react";

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

const NARROW = "(max-width: 767px)";

/**
 * On viewports below `md`, horizontal slides are mapped to `rise` so content
 * doesn't sit off-screen in a single column.
 *
 * SSR and the first client paint must use the same resolved variant. Do not
 * read `window` in the `useState` initializer — the server has no viewport,
 * which caused slideRight (server) vs rise (client) hydration mismatches.
 */
function useResponsiveVariant(variant: RevealVariant): RevealVariant {
  const [narrow, setNarrow] = useState(true);

  useLayoutEffect(() => {
    const mq = window.matchMedia(NARROW);
    const update = () => setNarrow(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (narrow && (variant === "slideLeft" || variant === "slideRight")) return "rise";
  return variant;
}

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
  const resolved = useResponsiveVariant(variant);
  // All entries render the same prop shape; widening to the div component
  // lets one `HTMLMotionProps<"div">` object serve every tag.
  const Tag = motionTags[as] as typeof motion.div;

  if (reduceMotion) {
    const Plain = as;
    return (
      <Plain className={className} style={style}>
        {children}
      </Plain>
    );
  }

  const transition =
    resolved === "pop"
      ? { type: "spring" as const, stiffness: 440, damping: 26, delay: delay / 1000 }
      : revealTransition(delay);

  const motionProps: HTMLMotionProps<"div"> = {
    ref: ref as React.RefObject<HTMLDivElement>,
    className,
    style,
    initial: "hidden",
    animate: show ? "visible" : "hidden",
    variants: revealVariants[resolved],
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
  const resolved = useResponsiveVariant(variant);

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={revealVariants[resolved]}>
      {children}
    </motion.div>
  );
}
