"use client";

import { ChevronRight, MapPin } from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

import { globalPresence as globalContent } from "@/content/site";
import { inViewOptions } from "@/lib/motion-presets";

import { CountUp } from "./CountUp";
import { PageWrap } from "./PageWrap";
import { Reveal, RevealItem, RevealStagger } from "./Reveal";
import { SectionIntro } from "./SectionIntro";

const pins = [
  { x: 22, y: 34 },
  { x: 30, y: 62 },
  { x: 47, y: 30 },
  { x: 55, y: 45 },
  { x: 63, y: 38 },
  { x: 72, y: 55 },
  { x: 80, y: 68 },
];

/** Seconds before the first pin starts falling, and between each one after. */
const PIN_LEAD_IN = 0.35;
const PIN_STAGGER = 0.32;
/** Roughly how long a pin takes to settle — the glow waits this long to start. */
const PIN_SETTLE = 1.1;

function MapPinMarker({
  pin,
  index,
  dropped,
  glowing,
}: {
  pin: (typeof pins)[number];
  index: number;
  /** Latches true the first time the map is reached — drives the fall. */
  dropped: boolean;
  /** Tracks visibility both ways, so the halo idles while off screen. */
  glowing: boolean;
}) {
  const dropDelay = PIN_LEAD_IN + index * PIN_STAGGER;
  // Offset each halo so the pins breathe out of sync rather than in unison.
  const glowDelay = dropDelay + PIN_SETTLE + index * 0.18;

  return (
    <motion.span
      className="absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-gold"
      style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
      initial={{ opacity: 0, scale: 0.2, y: -18 }}
      animate={dropped ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.2, y: -18 }}
      // Soft, low-stiffness spring so the pin visibly falls and settles instead
      // of snapping into place.
      transition={{
        type: "spring",
        stiffness: 110,
        damping: 13,
        mass: 1.1,
        delay: dropped ? dropDelay : 0,
      }}
    >
      {/* Expanding halo — the continuous glow. Animating scale/opacity keeps it
          on the compositor; an animated box-shadow would repaint every frame. */}
      <motion.span
        aria-hidden
        className="absolute h-2.5 w-2.5 rounded-full bg-gold"
        initial={{ scale: 1, opacity: 0 }}
        animate={glowing ? { scale: [1, 3.4], opacity: [0.55, 0] } : { scale: 1, opacity: 0 }}
        transition={
          glowing
            ? {
                duration: 2.8,
                ease: "easeOut",
                repeat: Infinity,
                repeatDelay: 0.5,
                delay: glowDelay,
              }
            : { duration: 0.3 }
        }
      />
      {/* Static bloom so the pin still reads as lit between halo pulses. */}
      <span
        aria-hidden
        className="absolute h-2 w-2 rounded-full bg-gold shadow-[0_0_10px_2px_oklch(0.79_0.115_82/60%)]"
      />
      <MapPin size={16} className="relative opacity-80" />
    </motion.span>
  );
}

function MapPins() {
  const reduceMotion = useReducedMotion();
  const ref = useRef(null);
  // `inViewOptions` latches (`once: true`) so the drop plays a single time.
  const hasEntered = useInView(ref, inViewOptions);
  // A second, non-latching observer parks the infinite halo while the section
  // is off screen instead of animating forever in the background.
  const onScreen = useInView(ref, { amount: 0.1 });

  if (reduceMotion) {
    return (
      <div className="absolute inset-0">
        {pins.map((p, i) => (
          <span
            key={i}
            className="absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-gold"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
          >
            <span aria-hidden className="absolute h-2 w-2 rounded-full bg-gold" />
            <MapPin size={16} className="relative opacity-80" />
          </span>
        ))}
      </div>
    );
  }

  return (
    // Must be a real box, not `display: contents` — IntersectionObserver can't
    // observe an element that generates no layout box, so `useInView` would
    // never fire and the pins would stay invisible forever. `inset-0` matches
    // the map exactly, so the pins' percentage offsets are unchanged.
    <div ref={ref} className="absolute inset-0">
      {pins.map((p, i) => (
        <MapPinMarker
          key={i}
          pin={p}
          index={i}
          dropped={hasEntered}
          glowing={hasEntered && onScreen}
        />
      ))}
    </div>
  );
}

export function GlobalPresence() {
  return (
    <section
      id="global"
      className="scroll-mt-[var(--site-nav-h)] border-b border-border bg-navy py-16 md:py-24"
    >
      <PageWrap>
        <SectionIntro eyebrow={globalContent.eyebrow} title={globalContent.title} />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-start">
          <Reveal variant="slideRight">
            <div className="relative aspect-16/9 w-full overflow-hidden rounded-xs border border-border bg-navy-deep">
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, oklch(0.72 0.014 255) 1px, transparent 1px)",
                  backgroundSize: "10px 10px",
                  maskImage:
                    "url(https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg)",
                  maskSize: "100% 100%",
                  maskRepeat: "no-repeat",
                  WebkitMaskImage:
                    "url(https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg)",
                  WebkitMaskSize: "100% 100%",
                  WebkitMaskRepeat: "no-repeat",
                }}
              />
              <MapPins />
            </div>
          </Reveal>

          <Reveal delay={120} variant="slideLeft">
            <div className="panel rounded-xs p-6">
              <h3 className="font-display text-lg text-gold">{globalContent.regionsTitle}</h3>
              <RevealStagger className="mt-5 space-y-3" stagger={0.06}>
                {globalContent.regions.map((r) => (
                  <RevealItem key={r}>
                    <button
                      type="button"
                      className="group flex w-full items-center justify-between rounded-xs border border-border bg-navy-deep/60 px-4 py-3 text-left text-[13px] text-foreground transition-colors duration-300 hover:border-gold/60"
                    >
                      <span className="flex items-center gap-3">
                        <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                        {r}
                      </span>
                      <ChevronRight
                        size={15}
                        className="text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-gold"
                      />
                    </button>
                  </RevealItem>
                ))}
              </RevealStagger>
            </div>
          </Reveal>
        </div>

        <RevealStagger
          className="mt-10 grid grid-cols-2 rounded-xs border border-border lg:grid-cols-4"
          stagger={0.1}
        >
          {globalContent.figures.map((f, i) => (
            <RevealItem
              key={f.label}
              className={`px-6 py-7 text-center ${i > 0 ? "lg:hairline-x" : ""}`}
              variant="scale"
            >
              <CountUp
                value={f.value}
                className="block font-display text-3xl text-foreground tabular-nums"
              />
              <div className="mt-1 text-xs text-muted-foreground">{f.label}</div>
            </RevealItem>
          ))}
        </RevealStagger>
      </PageWrap>
    </section>
  );
}
