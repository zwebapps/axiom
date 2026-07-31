"use client";

import { useRef } from "react";
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

import { PageWrap } from "./PageWrap";

const easeLux = [0.22, 1, 0.36, 1] as const;

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
}: {
  shot: (typeof shots)[number];
  progress: MotionValue<number>;
  reduceMotion: boolean | null;
}) {
  const y = useTransform(progress, [0, 1], [...shot.parallax]);
  const scale = useTransform(progress, [0, 0.45, 1], [0.94, 1, 0.96]);
  const opacity = useTransform(progress, [0, 0.1, 0.9, 1], [0.45, 1, 1, 0.45]);
  const imgScale = useTransform(progress, [0, 0.5, 1], [1.1, 1.02, 1.12]);

  return (
    <motion.div
      className={`${shot.offsetClass} will-change-transform`}
      style={reduceMotion ? undefined : { y, scale, opacity }}
    >
      <motion.div
        className="group relative overflow-hidden rounded-xs border border-border shadow-[var(--shadow-panel)]"
        whileHover={reduceMotion ? undefined : { scale: 1.03 }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
      >
        <div className="relative aspect-[3/4] w-full min-h-[320px] overflow-hidden sm:min-h-[360px] lg:min-h-[420px] xl:min-h-[480px]">
          <motion.img
            src={shot.src}
            alt={shot.alt}
            loading="lazy"
            width={700}
            height={1000}
            className="absolute inset-0 h-full w-full object-cover"
            style={reduceMotion ? undefined : { scale: imgScale }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-navy-deep/75 via-navy-deep/15 to-transparent" />
        </div>
      </motion.div>
    </motion.div>
  );
}

function WhoWeAreGallery({
  progress,
  reduceMotion,
}: {
  progress: MotionValue<number>;
  reduceMotion: boolean | null;
}) {
  return (
    <div className="grid grid-cols-1 gap-5 min-[480px]:grid-cols-3 min-[480px]:gap-4 lg:gap-6">
      {shots.map((s) => (
        <GalleryTile key={s.alt} shot={s} progress={progress} reduceMotion={reduceMotion} />
      ))}
    </div>
  );
}

function CopyBlock({
  progress,
  reduceMotion,
}: {
  progress: MotionValue<number>;
  reduceMotion: boolean | null;
}) {
  const x = useTransform(progress, [0, 0.5, 1], [-32, 0, 32]);
  const blockOpacity = useTransform(progress, [0, 0.15, 0.85, 1], [0.5, 1, 1, 0.5]);

  return (
    <motion.div
      className="lg:pr-4"
      style={reduceMotion ? undefined : { x, opacity: blockOpacity }}
    >
      <motion.p
        className="eyebrow text-[0.72rem] tracking-[0.24em]"
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.6 }}
        transition={{ duration: 0.65, ease: easeLux }}
      >
        {whoWeAre.eyebrow}
      </motion.p>
      <motion.h2
        className="mt-6 font-display text-[clamp(2.35rem,4.8vw,3.85rem)] leading-[1.08] font-light whitespace-pre-line"
        initial={reduceMotion ? false : { opacity: 0, y: 28 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.55 }}
        transition={{ duration: 0.75, ease: easeLux, delay: 0.06 }}
      >
        {whoWeAre.title}
      </motion.h2>
      <motion.p
        className="mt-8 max-w-xl text-[clamp(15px,1.05vw,17px)] leading-[1.8] text-muted-foreground"
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.55 }}
        transition={{ duration: 0.75, ease: easeLux, delay: 0.12 }}
      >
        {whoWeAre.body}
      </motion.p>
      <motion.button
        type="button"
        className="group mt-12 flex items-center gap-5"
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.55 }}
        transition={{ duration: 0.7, ease: easeLux, delay: 0.18 }}
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

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={sectionRef}
      className="border-b border-border bg-navy-deep py-28 lg:py-36"
    >
      <PageWrap className="grid gap-14 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:gap-20">
        <CopyBlock progress={scrollYProgress} reduceMotion={reduceMotion} />
        <WhoWeAreGallery progress={scrollYProgress} reduceMotion={reduceMotion} />
      </PageWrap>
    </section>
  );
}
