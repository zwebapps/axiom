"use client";

import { Play } from "lucide-react";
import { motion, useInView, useReducedMotion, type Variants } from "motion/react";
import { useRef } from "react";

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
  },
  {
    src: ship,
    alt: "Container ship carrying cargo across international waters",
    offsetClass: "lg:-mt-14",
  },
  {
    src: handshake,
    alt: "Two executives shaking hands after an agreement",
    offsetClass: "lg:mt-10",
  },
] as const;

/** Seconds between each card starting its wipe. */
const STAGGER = 0.26;
const LEAD_IN = 0.1;

/** Curtain wipe: the frame uncovers the image from the bottom up. */
const galleryCard: Variants = {
  hidden: { opacity: 0, y: 52, clipPath: "inset(100% 0% 0% 0%)" },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0% 0% 0% 0%)",
  },
  hovered: {
    scale: 1.03,
    transition: { type: "spring", stiffness: 320, damping: 26 },
  },
};

/**
 * The image settles out of an overscale while the curtain lifts, so the reveal
 * reads as a camera pull rather than a box appearing. Runs slightly longer than
 * the wipe so it's still moving when the frame finishes.
 */
const galleryImage: Variants = {
  hidden: { scale: 1.32 },
  visible: { scale: 1 },
  hovered: { scale: 1.07, transition: { duration: 0.7, ease: easeLux } },
};

function GalleryCard({
  shot,
  animate,
  index,
  show,
}: {
  shot: (typeof shots)[number];
  animate: boolean;
  index?: number;
  show?: boolean;
}) {
  const frameClass =
    "group relative overflow-hidden rounded-xs border border-border shadow-[var(--shadow-panel)]";
  const boxClass =
    "relative aspect-[3/4] min-h-[240px] w-full overflow-hidden sm:min-h-[280px] md:min-h-[360px] lg:min-h-[420px]";
  const imgClass = "absolute inset-0 h-full w-full object-cover";

  if (!animate) {
    return (
      <div className={shot.offsetClass}>
        <div className={frameClass}>
          <div className={boxClass}>
            <img
              src={shot.src}
              alt={shot.alt}
              loading="lazy"
              width={700}
              height={1000}
              className={imgClass}
            />
            <div className="absolute inset-0 bg-linear-to-t from-navy-deep/75 via-navy-deep/15 to-transparent" />
          </div>
        </div>
      </div>
    );
  }

  // Each card drives its own tween off the shared `show` flag with an
  // index-derived delay. Explicit beats relying on `staggerChildren`, which
  // doesn't propagate down to these children through the wrapper element.
  const state = show ? "visible" : "hidden";
  const delay = LEAD_IN + (index ?? 0) * STAGGER;

  return (
    <div className={shot.offsetClass}>
      {/* `whileHover` passes the label down, so the frame and the image can
          each respond to the same hover with their own scale. */}
      <motion.div
        className={`${frameClass} will-change-[clip-path,transform]`}
        variants={galleryCard}
        initial="hidden"
        animate={state}
        whileHover="hovered"
        transition={{ duration: 1.1, ease: easeLux, delay }}
      >
        <div className={boxClass}>
          <motion.img
            src={shot.src}
            alt={shot.alt}
            loading="lazy"
            width={700}
            height={1000}
            className={`${imgClass} will-change-transform`}
            variants={galleryImage}
            initial="hidden"
            animate={state}
            transition={{ duration: 1.5, ease: easeLux, delay }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-navy-deep/75 via-navy-deep/15 to-transparent" />
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

  const gridClass = "grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-3 md:gap-6";

  return (
    <section className="border-b border-border bg-navy-deep py-16 md:py-28 lg:py-36">
      <PageWrap className="grid gap-10 md:grid-cols-[0.88fr_1.12fr] md:items-center md:gap-14 lg:gap-20">
        <div className="md:pr-4">
          <RevealStagger className="max-w-xl" stagger={0.14} delayChildren={0.04}>
            <RevealItem variant="slideRight">
              <p className="eyebrow text-[0.72rem] tracking-[0.24em]">{whoWeAre.eyebrow}</p>
            </RevealItem>
            <RevealItem variant="slideRight">
              <h2 className="mt-6 font-display text-[clamp(2.35rem,4.8vw,3.85rem)] leading-[1.08] font-light whitespace-pre-line">
                {whoWeAre.title}
              </h2>
            </RevealItem>
            <RevealItem variant="slideRight">
              <p className="mt-8 max-w-xl text-[clamp(15px,1.05vw,17px)] leading-[1.8] text-muted-foreground">
                {whoWeAre.body}
              </p>
            </RevealItem>
          </RevealStagger>

          <Reveal delay={220} variant="slideRight">
            <button type="button" className="group mt-12 flex items-center gap-5">
              <span className="pulse-gold flex h-14 w-14 items-center justify-center rounded-full border border-gold/60 text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-navy-deep">
                <Play size={18} fill="currentColor" />
              </span>
              <span className="text-[15px] tracking-wide text-foreground">{whoWeAre.cta}</span>
            </button>
          </Reveal>
        </div>

        {/* One observer for the whole gallery, so the cards always reveal in
            source order rather than racing their own thresholds. */}
        <div ref={galleryRef} className={gridClass}>
          {shots.map((s, i) => (
            <GalleryCard key={s.alt} shot={s} animate={animate} index={i} show={inView} />
          ))}
        </div>
      </PageWrap>
    </section>
  );
}
