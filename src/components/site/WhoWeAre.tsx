"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";

import city from "@/assets/city.jpg";
import ship from "@/assets/ship.jpg";
import handshake from "@/assets/handshake.jpg";
import { whoWeAre } from "@/content/site";
import { easeLux, viewportEnter } from "@/lib/motion-presets";

import { PageWrap } from "./PageWrap";
import { RevealItem, RevealStagger } from "./Reveal";

function useMaxPhone() {
  const [match, setMatch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setMatch(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return match;
}

const shots = [
  {
    src: city,
    alt: "Illuminated skyline of a global financial hub at night",
    offsetClass: "lg:mt-0",
    parallax: [100, -72] as const,
  },
  {
    src: ship,
    alt: "Container ship carrying cargo across international waters",
    offsetClass: "lg:-mt-14",
    parallax: [130, -48] as const,
  },
  {
    src: handshake,
    alt: "Two executives shaking hands after an agreement",
    offsetClass: "lg:mt-10",
    parallax: [64, -110] as const,
  },
] as const;

function GalleryTile({
  shot,
  progress,
  reduceMotion,
  staticLayout,
}: {
  shot: (typeof shots)[number];
  progress: MotionValue<number>;
  reduceMotion: boolean | null;
  staticLayout: boolean;
}) {
  const y = useTransform(progress, [0, 1], [...shot.parallax]);
  const scale = useTransform(progress, [0, 0.45, 1], [0.92, 1, 0.98]);
  const imgScale = useTransform(progress, [0, 0.5, 1], [1.1, 1.02, 1.12]);
  const motionOff = reduceMotion || staticLayout;

  return (
    <motion.div
      className={`${shot.offsetClass} will-change-transform`}
      style={motionOff ? undefined : { y, scale }}
    >
      <motion.div
        className="group relative overflow-hidden rounded-xs border border-border shadow-[var(--shadow-panel)]"
        whileHover={motionOff ? undefined : { scale: 1.03 }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
      >
        <div className="relative aspect-[3/4] w-full min-h-[240px] overflow-hidden sm:min-h-[280px] md:min-h-[360px] lg:min-h-[420px]">
          <motion.img
            src={shot.src}
            alt={shot.alt}
            loading="lazy"
            width={700}
            height={1000}
            className="absolute inset-0 h-full w-full object-cover"
            style={motionOff ? undefined : { scale: imgScale }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-navy-deep/75 via-navy-deep/15 to-transparent" />
        </div>
      </motion.div>
    </motion.div>
  );
}

function StaticGalleryTile({ shot }: { shot: (typeof shots)[number] }) {
  return (
    <div className={shot.offsetClass}>
      <div className="group relative overflow-hidden rounded-xs border border-border shadow-[var(--shadow-panel)]">
        <div className="relative aspect-[3/4] w-full min-h-[240px] overflow-hidden sm:min-h-[280px]">
          <img
            src={shot.src}
            alt={shot.alt}
            loading="lazy"
            width={700}
            height={1000}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-navy-deep/75 via-navy-deep/15 to-transparent" />
        </div>
      </div>
    </div>
  );
}

function WhoWeAreGallery({
  progress,
  reduceMotion,
  staticLayout,
}: {
  progress: MotionValue<number>;
  reduceMotion: boolean | null;
  staticLayout: boolean;
}) {
  if (staticLayout || reduceMotion) {
    return (
      <RevealStagger
        className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-3 md:gap-6"
        stagger={0.14}
      >
        {shots.map((s) => (
          <RevealItem key={s.alt} variant="scale">
            <StaticGalleryTile shot={s} />
          </RevealItem>
        ))}
      </RevealStagger>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-3 md:gap-6">
      {shots.map((s) => (
        <GalleryTile
          key={s.alt}
          shot={s}
          progress={progress}
          reduceMotion={reduceMotion}
          staticLayout={staticLayout}
        />
      ))}
    </div>
  );
}

function CopyBlock({
  progress,
  reduceMotion,
  staticLayout,
}: {
  progress: MotionValue<number>;
  reduceMotion: boolean | null;
  staticLayout: boolean;
}) {
  const y = useTransform(progress, [0, 1], [40, -40]);
  const motionOff = reduceMotion || staticLayout;

  return (
    <motion.div className="md:pr-4" style={motionOff ? undefined : { y }}>
      <motion.p
        className="eyebrow text-[0.72rem] tracking-[0.24em]"
        initial={reduceMotion ? false : { opacity: 0, y: 32, filter: "blur(8px)" }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ ...viewportEnter, amount: 0.35 }}
        transition={{ duration: 0.75, ease: easeLux }}
      >
        {whoWeAre.eyebrow}
      </motion.p>
      <motion.h2
        className="mt-6 font-display text-[clamp(2.35rem,4.8vw,3.85rem)] leading-[1.08] font-light whitespace-pre-line"
        initial={reduceMotion ? false : { opacity: 0, y: 40, filter: "blur(10px)" }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ ...viewportEnter, amount: 0.3 }}
        transition={{ duration: 0.85, ease: easeLux, delay: 0.08 }}
      >
        {whoWeAre.title}
      </motion.h2>
      <motion.p
        className="mt-8 max-w-xl text-[clamp(15px,1.05vw,17px)] leading-[1.8] text-muted-foreground"
        initial={reduceMotion ? false : { opacity: 0, y: 28 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ ...viewportEnter, amount: 0.3 }}
        transition={{ duration: 0.8, ease: easeLux, delay: 0.14 }}
      >
        {whoWeAre.body}
      </motion.p>
      <motion.button
        type="button"
        className="group mt-12 flex items-center gap-5"
        initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.96 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
        viewport={{ ...viewportEnter, amount: 0.3 }}
        transition={{ type: "spring", stiffness: 380, damping: 28, delay: 0.2 }}
        whileHover={reduceMotion ? undefined : { x: 6 }}
      >
        <span className="pulse-gold flex h-14 w-14 items-center justify-center rounded-full border border-gold/60 text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-navy-deep">
          <Play size={18} fill="currentColor" />
        </span>
        <span className="text-[15px] tracking-wide text-foreground">{whoWeAre.cta}</span>
      </motion.button>
    </motion.div>
  );
}

export function WhoWeAre() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const staticLayout = useMaxPhone();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={sectionRef}
      className="border-b border-border bg-navy-deep py-16 md:py-28 lg:py-36"
    >
      <PageWrap className="grid gap-10 md:grid-cols-[0.88fr_1.12fr] md:items-center md:gap-14 lg:gap-20">
        <CopyBlock progress={scrollYProgress} reduceMotion={reduceMotion} staticLayout={staticLayout} />
        <WhoWeAreGallery
          progress={scrollYProgress}
          reduceMotion={reduceMotion}
          staticLayout={staticLayout}
        />
      </PageWrap>
    </section>
  );
}
