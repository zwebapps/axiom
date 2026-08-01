"use client";

import { motion, useInView, useReducedMotion, type Variants } from "motion/react";
import { useCallback, useRef, useState } from "react";

import city from "@/assets/city.jpg";
import ship from "@/assets/ship.jpg";
import handshake from "@/assets/handshake.jpg";
import { whoWeAre } from "@/content/site";
import { easeLux, inViewOptions } from "@/lib/motion-presets";

import { PageWrap } from "./PageWrap";
import { Reveal, RevealItem, RevealStagger } from "./Reveal";

const shots = [
  {
    src: city,
    alt: "Illuminated skyline of a global financial hub at night",
    offsetClass: "lg:mt-0",
    skewPeer: "skew-y-2",
  },
  {
    src: ship,
    alt: "Container ship carrying cargo across international waters",
    offsetClass: "lg:-mt-14",
    skewPeer: "-skew-y-2",
  },
  {
    src: handshake,
    alt: "Two executives shaking hands after an agreement",
    offsetClass: "lg:mt-10",
    skewPeer: "skew-y-1.5",
  },
] as const;

/** Seconds between each card starting its wipe. */
const STAGGER = 0.26;
const LEAD_IN = 0.1;

const galleryCard: Variants = {
  hidden: { opacity: 0, y: 52, clipPath: "inset(100% 0% 0% 0%)" },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0% 0% 0% 0%)",
  },
};

const galleryImage: Variants = {
  hidden: { scale: 1.32 },
  visible: { scale: 1 },
};

function GalleryCard({
  shot,
  animate,
  index,
  show,
  isFocused,
  isDimmed,
  onFocus,
  onToggle,
}: {
  shot: (typeof shots)[number];
  animate: boolean;
  index: number;
  show: boolean;
  isFocused: boolean;
  isDimmed: boolean;
  onFocus: () => void;
  onToggle: () => void;
}) {
  const frameClass =
    "relative cursor-pointer overflow-hidden rounded-xs border border-border shadow-[var(--shadow-panel)] outline-none focus-visible:ring-2 focus-visible:ring-gold/50";
  const boxClass =
    "relative aspect-[3/4] min-h-[240px] w-full overflow-hidden sm:min-h-[280px] md:min-h-[360px] lg:min-h-[420px]";
  const imgClass = "absolute inset-0 h-full w-full object-cover";

  const state = show ? "visible" : "hidden";
  const delay = LEAD_IN + index * STAGGER;

  const peerSkew = animate && isDimmed ? shot.skewPeer : "";

  return (
    <div
      className={`${shot.offsetClass} transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform sm:duration-[0.55s] ${peerSkew} ${
        isFocused ? "relative z-30" : isDimmed ? "relative z-0 opacity-[0.72]" : "relative z-10"
      }`}
    >
      <motion.div
        role="button"
        tabIndex={0}
        aria-pressed={isFocused}
        aria-label={shot.alt}
        className={`${frameClass} group origin-center transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${
          isFocused
            ? "scale-[1.08] border-gold/45 shadow-[0_28px_70px_-18px_oklch(0.05_0_0/75%)] sm:scale-[1.14] md:scale-[1.18]"
            : isDimmed
              ? "scale-[0.9] sm:scale-[0.86]"
              : "scale-100 hover:scale-[1.03]"
        }`}
        variants={animate ? galleryCard : undefined}
        initial={animate ? "hidden" : false}
        animate={animate ? state : undefined}
        transition={animate ? { duration: 1.1, ease: easeLux, delay } : undefined}
        onMouseEnter={onFocus}
        onFocus={onFocus}
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggle();
          }
        }}
        whileTap={animate && !isFocused ? { scale: 0.98 } : undefined}
      >
        <div className={boxClass}>
          <motion.img
            src={shot.src}
            alt={shot.alt}
            loading="lazy"
            width={700}
            height={1000}
            className={`${imgClass} will-change-transform transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isFocused ? "scale-110" : "scale-100 group-hover:scale-105"
            }`}
            variants={animate ? galleryImage : undefined}
            initial={animate ? "hidden" : false}
            animate={animate ? state : undefined}
            transition={animate ? { duration: 1.5, ease: easeLux, delay } : undefined}
          />
          <div
            className={`absolute inset-0 bg-linear-to-t from-navy-deep/75 via-navy-deep/15 to-transparent transition-opacity duration-500 ${
              isFocused ? "opacity-60" : ""
            }`}
          />
        </div>
      </motion.div>
    </div>
  );
}

export function WhoWeAre() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(galleryRef, inViewOptions);
  const animate = !reduceMotion;

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const focusedIndex = hoveredIndex ?? activeIndex;
  const hasFocus = focusedIndex !== null;

  const handleToggle = useCallback((index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  }, []);

  const gridClass =
    "grid grid-cols-1 gap-4 overflow-visible sm:grid-cols-3 sm:gap-3 md:gap-5 lg:gap-6";

  return (
    <section className="site-section border-b border-border bg-navy-deep">
      <PageWrap className="grid gap-10 md:grid-cols-[0.88fr_1.12fr] md:items-start md:gap-14 lg:gap-20">
        <div className="md:-mt-2 md:pr-4 lg:-mt-4">
          <RevealStagger className="max-w-xl" stagger={0.14} delayChildren={0.04}>
            <RevealItem variant="slideRight">
              <p className="eyebrow text-[0.72rem] tracking-[0.24em]">{whoWeAre.eyebrow}</p>
            </RevealItem>
            <RevealItem variant="slideRight">
              <h2 className="mt-5 font-display text-[clamp(2.35rem,4.8vw,3.85rem)] leading-[1.08] font-light whitespace-pre-line">
                {whoWeAre.title}
              </h2>
            </RevealItem>
            <RevealItem variant="slideRight">
              <p className="mt-6 max-w-xl text-[clamp(15px,1.05vw,17px)] leading-[1.8] text-muted-foreground">
                {whoWeAre.body}
              </p>
            </RevealItem>
          </RevealStagger>
        </div>

        <div
          ref={galleryRef}
          className={gridClass}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {shots.map((s, i) => (
            <GalleryCard
              key={s.alt}
              shot={s}
              index={i}
              animate={animate}
              show={inView}
              isFocused={focusedIndex === i}
              isDimmed={hasFocus && focusedIndex !== i}
              onFocus={() => setHoveredIndex(i)}
              onToggle={() => handleToggle(i)}
            />
          ))}
        </div>
      </PageWrap>
    </section>
  );
}
