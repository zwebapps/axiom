"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

import { inViewOptions, wordReveal } from "@/lib/motion-presets";

/**
 * Reveals a heading word by word. Newlines in `text` are preserved as
 * hard breaks so callers keep their existing multi-line copy.
 *
 * The full string stays readable to assistive tech via `aria-label`; the
 * per-word spans are hidden from the accessibility tree so screen readers
 * don't announce the heading one word at a time.
 */
export function SplitText({
  text,
  className = "",
  as: Tag = "h2",
  stagger = 0.055,
  delay = 0,
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  stagger?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(ref, inViewOptions);
  const MotionTag = motion[Tag];

  if (reduceMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <MotionTag
      ref={ref as React.RefObject<HTMLHeadingElement>}
      className={className}
      aria-label={text}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {text.split("\n").map((line, lineIndex) => {
        const words = line.split(" ");
        return (
          <span key={lineIndex} aria-hidden className="block">
            {words.map((word, wordIndex) => (
              <span key={`${lineIndex}-${wordIndex}`}>
                <span className="inline-block overflow-hidden align-bottom">
                  <motion.span className="inline-block" variants={wordReveal}>
                    {word}
                  </motion.span>
                </span>
                {wordIndex < words.length - 1 ? " " : null}
              </span>
            ))}
          </span>
        );
      })}
    </MotionTag>
  );
}
