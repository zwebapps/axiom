"use client";

import {
  ArrowRight,
  Building2,
  Cpu,
  Factory,
  HeartPulse,
  Landmark,
  ShoppingBag,
  Zap,
} from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

import { industries as industriesContent, brand, logos } from "@/content/site";

import { MotionLink } from "./MotionCTA";
import { PageWrap } from "./PageWrap";
import { Reveal } from "./Reveal";
import { SectionIntro } from "./SectionIntro";

const industryIcons: Record<string, typeof HeartPulse> = {
  Healthcare: HeartPulse,
  Energy: Zap,
  Manufacturing: Factory,
  Infrastructure: Building2,
  Government: Landmark,
  "Consumer Goods": ShoppingBag,
  Technology: Cpu,
};

/**
 * Seconds each node holds the highlight. Index order runs clockwise from
 * top-centre (see the angle maths below), so stepping the delay by index
 * sweeps the glow clockwise around the ring.
 *
 * With 7 nodes this makes a full lap 7 × GLOW_STEP seconds.
 */
const GLOW_STEP = 1.15;

function IndustryNode({
  label,
  Icon,
  index,
  count,
  glowing,
}: {
  label: string;
  Icon: typeof HeartPulse;
  index: number;
  count: number;
  /** Chase only runs while the ring is on screen. */
  glowing: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const cycle = count * GLOW_STEP;
  // The pulse occupies this node's slice of the loop and stays dark for the
  // rest, so exactly one node is lit at a time.
  const slot = 1 / count;
  const chase = glowing && !reduceMotion;

  // Rise, linger, fade, then hold dark until the loop comes round again. The
  // fade finishes at 0.82 of the slot rather than at its end, leaving a short
  // gap before the next node lights so only one is ever glowing. The final
  // value matches the first so the loop doesn't jump.
  const pulse = {
    duration: cycle,
    times: [0, slot * 0.28, slot * 0.58, slot * 0.82, 1],
    ease: "easeInOut" as const,
    repeat: Infinity,
    delay: index * GLOW_STEP,
  };

  return (
    <motion.div
      className="group relative flex flex-col items-center gap-2"
      whileHover={reduceMotion ? undefined : { scale: 1.12 }}
      whileTap={reduceMotion ? undefined : { scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
    >
      {/* Travelling glow. A feathered radial gradient rather than a solid disc:
          a flat `bg-gold` circle scaled up reads as a second, larger shape
          instead of light. Transform/opacity only, so it stays on the
          compositor rather than repainting each frame. */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 h-12 w-12 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.79_0.115_82/45%)_0%,oklch(0.79_0.115_82/18%)_42%,transparent_68%)]"
        initial={{ opacity: 0, scale: 1 }}
        animate={
          chase
            ? { opacity: [0, 1, 0.85, 0, 0], scale: [1, 1.5, 1.85, 2, 1] }
            : { opacity: 0, scale: 1 }
        }
        transition={chase ? pulse : { duration: 0.3 }}
      />
      {/* Every disc stays exactly the same size and shape — only the border and
          the glow behind it change on its turn. */}
      <motion.span
        className="relative flex h-12 w-12 items-center justify-center rounded-full border bg-navy text-gold group-hover:bg-gold group-hover:text-navy-deep"
        initial={{ borderColor: "oklch(0.79 0.115 82 / 40%)" }}
        animate={
          chase
            ? {
                borderColor: [
                  "oklch(0.79 0.115 82 / 40%)",
                  "oklch(0.86 0.12 84 / 100%)",
                  "oklch(0.86 0.12 84 / 85%)",
                  "oklch(0.79 0.115 82 / 40%)",
                  "oklch(0.79 0.115 82 / 40%)",
                ],
              }
            : { borderColor: "oklch(0.79 0.115 82 / 40%)" }
        }
        transition={chase ? pulse : { duration: 0.3 }}
      >
        <Icon size={18} strokeWidth={1.4} />
      </motion.span>
      <span className="max-w-[4.5rem] text-center text-[9px] leading-tight text-muted-foreground">
        {label}
      </span>
    </motion.div>
  );
}

export function Industries() {
  const reduceMotion = useReducedMotion();
  const orbitRef = useRef<HTMLDivElement>(null);
  // Non-latching: parks the chase while the ring is off screen instead of
  // animating forever in the background.
  const onScreen = useInView(orbitRef, { amount: 0.2 });

  const items = industriesContent.items.map((label) => ({
    label,
    icon: industryIcons[label] ?? Building2,
  }));

  // Counter-rotating rings: slow enough to read as ambient, not spinning.
  const ring = (duration: number, direction: 1 | -1) =>
    reduceMotion
      ? {}
      : {
          animate: { rotate: 360 * direction },
          transition: { duration, ease: "linear" as const, repeat: Infinity },
        };

  return (
    <section
      id="industries"
      className="site-section scroll-mt-[var(--site-nav-h)] border-b border-border bg-navy-deep md:hidden"
    >
      <PageWrap>
        <SectionIntro
          align="center"
          eyebrow={industriesContent.eyebrow}
          title={industriesContent.title}
          titleClassName="mt-4 font-display text-[clamp(1.75rem,7vw,2.25rem)] font-light leading-tight"
        />

        <div
          ref={orbitRef}
          className="relative mx-auto mt-10 aspect-square w-full max-w-[min(100%,340px)]"
        >
          {/* Only the dashed ring rotates — the dashes are what make the motion
              readable. The outer ring is a plain circle, so rotating it would
              look identical while growing its axis-aligned bounding box by up
              to √2 (a rotated box, not the visual circle), which pushes past
              the viewport and makes the page scroll sideways. */}
          <motion.span
            aria-hidden
            className="absolute inset-[18%] rounded-full border border-dashed border-border"
            {...ring(58, 1)}
          />
          <span aria-hidden className="absolute inset-[6%] rounded-full border border-border/60" />

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Reveal variant="pop">
              <span className="pulse-gold flex h-[5.5rem] w-[5.5rem] items-center justify-center rounded-full border border-gold/50 bg-navy p-3 sm:h-28 sm:w-28 sm:p-3.5">
                <img
                  src={logos.hub}
                  alt={`${brand.name} mark`}
                  width={120}
                  height={120}
                  className="h-full w-full object-contain"
                  decoding="async"
                />
              </span>
            </Reveal>
          </div>

          {items.map((ind, i) => {
            // Starts at -90° (top centre) and increases, which in screen
            // coordinates walks clockwise.
            const angle = (i / items.length) * Math.PI * 2 - Math.PI / 2;
            const left = 50 + Math.cos(angle) * 42;
            const top = 50 + Math.sin(angle) * 42;
            return (
              <div
                key={ind.label}
                className="absolute"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <Reveal delay={120 + i * 70} variant="pop">
                  <IndustryNode
                    label={ind.label}
                    Icon={ind.icon}
                    index={i}
                    count={items.length}
                    glowing={onScreen}
                  />
                </Reveal>
              </div>
            );
          })}
        </div>

        <Reveal delay={120} className="mt-10 flex justify-center" variant="rise">
          <MotionLink
            href="#contact"
            className="btn-outline group w-full max-w-xs justify-center sm:w-auto"
          >
            {industriesContent.cta}
            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </MotionLink>
        </Reveal>
      </PageWrap>
    </section>
  );
}
