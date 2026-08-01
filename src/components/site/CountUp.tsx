"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * Splits a display figure into an animatable numeric core plus its
 * decorative prefix/suffix — "$2B+" becomes ["$", 2, "B+"].
 *
 * Returns null when the value can't be counted (e.g. "24/7", where the
 * trailing part carries its own digits), so the caller renders it verbatim.
 */
function parseFigure(value: string) {
  const match = /^(\D*)(\d+(?:\.\d+)?)(.*)$/.exec(value);
  if (!match) return null;

  const [, prefix, digits, suffix] = match;
  if (/\d/.test(suffix)) return null;

  const decimals = digits.includes(".") ? digits.split(".")[1].length : 0;
  return { prefix, target: Number(digits), suffix, decimals };
}

export function CountUp({
  value,
  className,
  duration = 1.9,
  delay = 0,
}: {
  value: string;
  className?: string;
  duration?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const parsed = parseFigure(value);
  const [display, setDisplay] = useState(() =>
    parsed ? `${parsed.prefix}0${parsed.suffix}` : value,
  );

  useEffect(() => {
    if (!parsed || reduceMotion || !inView) return;

    const controls = animate(0, parsed.target, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        setDisplay(`${parsed.prefix}${latest.toFixed(parsed.decimals)}${parsed.suffix}`);
      },
    });

    return () => controls.stop();
    // `parsed` is derived from `value`; depending on it directly would
    // restart the tween on every render since it's a fresh object.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, reduceMotion, inView, duration, delay]);

  // No animatable core, or motion is suppressed → render the literal value.
  if (!parsed || reduceMotion) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span ref={ref} className={className} aria-label={value}>
      {display}
    </span>
  );
}
