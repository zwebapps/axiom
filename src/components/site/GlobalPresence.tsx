"use client";

import { ChevronRight, MapPin } from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

import { globalPresence as globalContent, keyRegions } from "@/content/site";
import { easeLux, inViewOptions } from "@/lib/motion-presets";

import { CountUp } from "./CountUp";
import { PageWrap } from "./PageWrap";
import { RegionFlagStrip } from "./RegionFlagStrip";
import { Reveal, RevealItem, RevealStagger } from "./Reveal";
import { SectionIntro } from "./SectionIntro";

type CorridorHub = "usa" | "eu" | "gcc" | "asia" | "af" | "lam" | "pac";

type MapPin = {
  x: number;
  y: number;
  /** When set, this pin is a corridor endpoint (arcs attach here only). */
  hub?: CorridorHub;
};

const pins: MapPin[] = [
  { x: 22, y: 34, hub: "usa" },
  { x: 30, y: 62, hub: "lam" },
  { x: 47, y: 30, hub: "eu" },
  { x: 55, y: 45, hub: "af" },
  { x: 63, y: 38, hub: "gcc" },
  { x: 72, y: 55, hub: "asia" },
  { x: 80, y: 68, hub: "pac" },
];

const usaCorridorHubs: Exclude<CorridorHub, "usa">[] = [
  "eu",
  "gcc",
  "asia",
  "af",
  "lam",
  "pac",
];

function corridorHubPoints(allPins: MapPin[]) {
  const points = {} as Record<CorridorHub, { x: number; y: number }>;
  for (const pin of allPins) {
    if (pin.hub) points[pin.hub] = { x: pin.x, y: pin.y };
  }
  return points;
}

/** Curved lane — laneSign separates outbound vs return paths (hero-style lateral spread). */
function mapArcPath(
  from: { x: number; y: number },
  to: { x: number; y: number },
  laneSign: number,
) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.hypot(dx, dy) || 1;
  const mx = (from.x + to.x) / 2;
  const my = (from.y + to.y) / 2;
  const nx = (-dy / len) * laneSign * 3.8;
  const ny = (dx / len) * laneSign * 3.8;
  const lift = -len * 0.12;
  const cx = mx + nx;
  const cy = my + lift + ny * 0.25;
  return `M ${from.x} ${from.y} Q ${cx} ${cy} ${to.x} ${to.y}`;
}

function MapArcLayer({ d, dim = false }: { d: string; dim?: boolean }) {
  const alpha = dim ? 0.72 : 1;
  return (
    <g opacity={alpha}>
      <path d={d} fill="none" stroke="rgba(210,166,87,0.14)" strokeWidth="0.52" strokeLinecap="round" />
      <path d={d} fill="none" stroke="rgba(210,166,87,0.26)" strokeWidth="0.36" strokeLinecap="round" />
      <path d={d} fill="none" stroke="#D2A657" strokeWidth="0.26" strokeLinecap="round" opacity="0.92" />
    </g>
  );
}

function MapArcTraffic({ d, duration, delay = 0 }: { d: string; duration: number; delay?: number }) {
  return (
    <>
      <circle r="0.45" fill="#FFF6E4" opacity="0.95">
        <animateMotion dur={`${duration}s`} begin={`${delay}s`} repeatCount="indefinite" path={d} calcMode="linear" />
      </circle>
      <circle r="0.75" fill="#D2A657" opacity="0.35">
        <animateMotion dur={`${duration}s`} begin={`${delay}s`} repeatCount="indefinite" path={d} calcMode="linear" />
      </circle>
    </>
  );
}

function MapCorridorArcs({ allPins }: { allPins: MapPin[] }) {
  const reduceMotion = useReducedMotion();
  const hubs = corridorHubPoints(allPins);
  const usa = hubs.usa;
  if (!usa) return null;

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
    >
      {usaCorridorHubs.map((destId, i) => {
        const dest = hubs[destId];
        if (!dest) return null;
        const outPath = mapArcPath(usa, dest, 1);
        const inPath = mapArcPath(dest, usa, -1);
        const dur = 4.8 + i * 0.35;
        return (
          <g key={destId}>
            <MapArcLayer d={outPath} />
            <MapArcLayer d={inPath} dim />
            {!reduceMotion ? (
              <>
                <MapArcTraffic d={outPath} duration={dur} delay={i * 0.4} />
                <MapArcTraffic d={inPath} duration={dur + 0.6} delay={0.55 + i * 0.4} />
              </>
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}

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

function Support247Value({ className }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, inViewOptions);
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <span className={className} aria-label="24/7">
        24/7
      </span>
    );
  }

  return (
    <motion.span
      ref={ref}
      className={className}
      aria-label="24/7"
      initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
      animate={
        inView
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, y: 14, filter: "blur(6px)" }
      }
      transition={{ duration: 0.75, ease: easeLux }}
    >
      24
      <motion.span
        className="global-figures__slash"
        aria-hidden
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        /
      </motion.span>
      7
    </motion.span>
  );
}

function GlobalFigureValue({
  value,
  className,
  delay,
}: {
  value: string;
  className?: string;
  delay: number;
}) {
  if (value === "24/7") {
    return <Support247Value className={className} />;
  }
  return <CountUp value={value} className={className} delay={delay} duration={2.1} />;
}

function GlobalFigureCell({
  value,
  label,
  index,
  liveLabel,
}: {
  value: string;
  label: string;
  index: number;
  liveLabel?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, inViewOptions);
  const reduceMotion = useReducedMotion();
  const countDelay = 0.12 + index * 0.14;

  return (
    <motion.div
      ref={ref}
      className={`global-figures__cell`}
      initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.96 }}
      animate={reduceMotion || inView ? { opacity: 1, y: 0, scale: 1 } : undefined}
      transition={{ duration: 0.65, delay: index * 0.08, ease: easeLux }}
    >
      <GlobalFigureValue
        value={value}
        className="global-figures__value"
        delay={countDelay}
      />
      {liveLabel ? (
        <div className="global-figures__label global-figures__label--live">
          <span className="global-figures__live-dot" aria-hidden />
          {label}
        </div>
      ) : (
        <motion.div
          className="global-figures__label"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={reduceMotion || inView ? { opacity: 1 } : undefined}
          transition={{ duration: 0.5, delay: countDelay + 0.35, ease: easeLux }}
        >
          {label}
        </motion.div>
      )}
    </motion.div>
  );
}

function GlobalPresenceFigures() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="global-figures panel group rounded-xs border border-border"
      aria-label="Global presence figures"
    >
      <div className="global-figures__overlay" aria-hidden>
        <div className="global-figures__sheen" />
        <div className="global-figures__top-flow">
          <span className="global-figures__top-track" />
          <span className="global-figures__top-shine" />
          {!reduceMotion ? <span className="global-figures__top-dot" /> : null}
        </div>
      </div>
      {globalContent.figures.map((f, i) => (
        <GlobalFigureCell
          key={f.label}
          value={f.value}
          label={f.label}
          index={i}
          liveLabel={f.value === "24/7"}
        />
      ))}
    </section>
  );
}

export function GlobalPresence() {
  return (
    <section
      id="global"
      className="site-section scroll-mt-[var(--site-nav-h)] border-b border-border bg-navy"
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
              <MapCorridorArcs allPins={pins} />
              <MapPins />
            </div>
          </Reveal>

          <Reveal delay={120} variant="slideLeft">
            <div className="panel rounded-xs p-6">
              <h3 className="font-display text-lg text-gold">{globalContent.regionsTitle}</h3>
              <RevealStagger className="mt-5 space-y-3" stagger={0.06}>
                {keyRegions.map((r) => (
                  <RevealItem key={r.label}>
                    <div className="flex w-full items-center justify-between rounded-xs border border-border bg-navy-deep/60 px-4 py-3 text-left text-[13px] text-foreground">
                      <span className="flex min-w-0 items-center gap-3">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                        <span className="truncate">{r.label}</span>
                        <RegionFlagStrip codes={r.flagCodes} className="shrink-0" />
                      </span>
                      <ChevronRight size={15} className="shrink-0 text-muted-foreground opacity-60" />
                    </div>
                  </RevealItem>
                ))}
              </RevealStagger>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-16 pt-4" variant="rise">
          <GlobalPresenceFigures />
        </Reveal>
      </PageWrap>
    </section>
  );
}
