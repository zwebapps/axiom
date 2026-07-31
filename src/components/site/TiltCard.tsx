"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import type { PointerEvent, ReactNode } from "react";

import { springPointer, springSurface } from "@/lib/motion-presets";

/**
 * Pointer-reactive surface: a subtle 3D tilt plus a gold spotlight that
 * tracks the cursor. Falls back to a plain element under
 * `prefers-reduced-motion`, and never traps keyboard focus — the tilt is
 * pointer-only decoration layered over whatever children provide.
 */
export function TiltCard({
  children,
  className = "",
  /** Max rotation in degrees at the card's edges. */
  intensity = 6,
  /** Set false for wide/short cards where a glow reads better than a tilt. */
  tilt = true,
  spotlight = true,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
  tilt?: boolean;
  spotlight?: boolean;
}) {
  const reduceMotion = useReducedMotion();

  // -1..1 pointer position, springed so the card trails the cursor.
  const px = useSpring(useMotionValue(0), springPointer);
  const py = useSpring(useMotionValue(0), springPointer);
  // Raw 0-100% position for the spotlight centre.
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const glowOpacity = useSpring(useMotionValue(0), springPointer);

  const rotateX = useSpring(useMotionValue(0), springPointer);
  const rotateY = useSpring(useMotionValue(0), springPointer);

  const spotlightBg = useMotionTemplate`radial-gradient(340px circle at ${gx}% ${gy}%, oklch(0.77 0.095 82 / 14%), transparent 70%)`;

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const nx = (event.clientX - rect.left) / rect.width;
    const ny = (event.clientY - rect.top) / rect.height;

    gx.set(nx * 100);
    gy.set(ny * 100);
    glowOpacity.set(1);

    if (tilt) {
      rotateY.set((nx - 0.5) * 2 * intensity);
      rotateX.set((ny - 0.5) * -2 * intensity);
    }
    px.set((nx - 0.5) * 2);
    py.set((ny - 0.5) * 2);
  }

  function handlePointerLeave() {
    rotateX.set(0);
    rotateY.set(0);
    px.set(0);
    py.set(0);
    glowOpacity.set(0);
  }

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={`relative h-full [transform-style:preserve-3d] ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ rotateX, rotateY, perspective: 1000 }}
      whileHover={{ y: -6, transition: springSurface }}
    >
      {children}
      {spotlight ? (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-xs"
          style={{ background: spotlightBg, opacity: glowOpacity }}
        />
      ) : null}
    </motion.div>
  );
}
