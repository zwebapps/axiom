"use client";

import { Play } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

import city from "@/assets/city.jpg";
import ship from "@/assets/ship.jpg";
import handshake from "@/assets/handshake.jpg";
import { whoWeAre } from "@/content/site";

import { PageWrap } from "./PageWrap";
import { Reveal, RevealItem, RevealStagger } from "./Reveal";
import { SectionIntro } from "./SectionIntro";

const shots = [
  {
    src: city,
    alt: "Illuminated skyline of a global financial hub at night",
    offsetClass: "lg:mt-0",
    parallax: [80, -56] as const,
  },
  {
    src: ship,
    alt: "Container ship carrying cargo across international waters",
    offsetClass: "lg:-mt-14",
    parallax: [96, -40] as const,
  },
  {
    src: handshake,
    alt: "Two executives shaking hands after an agreement",
    offsetClass: "lg:mt-10",
    parallax: [48, -88] as const,
  },
] as const;

function GalleryCard({
  shot,
  progress,
  parallaxOn,
}: {
  shot: (typeof shots)[number];
  progress: MotionValue<number>;
  parallaxOn: boolean;
}) {
  const y = useTransform(progress, [0, 1], [...shot.parallax]);

  return (
    <motion.div
      className={`${shot.offsetClass} will-change-transform`}
      style={parallaxOn ? { y } : undefined}
    >
      <motion.div
        className="group relative overflow-hidden rounded-xs border border-border shadow-[var(--shadow-panel)]"
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
      >
        <div className="relative aspect-[3/4] w-full min-h-[240px] overflow-hidden sm:min-h-[280px] md:min-h-[360px] lg:min-h-[420px]">
          <img
            src={shot.src}
            alt={shot.alt}
            loading="lazy"
            width={700}
            height={1000}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-[var(--ease-lux)] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-navy-deep/75 via-navy-deep/15 to-transparent" />
        </div>
      </motion.div>
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
  const parallaxOn = !reduceMotion;

  return (
    <section
      ref={sectionRef}
      className="border-b border-border bg-navy-deep py-16 md:py-28 lg:py-36"
    >
      <PageWrap className="grid gap-10 md:grid-cols-[0.88fr_1.12fr] md:items-center md:gap-14 lg:gap-20">
        <div className="md:pr-4">
          <SectionIntro
            eyebrow={whoWeAre.eyebrow}
            title={whoWeAre.title}
            description={whoWeAre.body}
            titleClassName="mt-6 font-display text-[clamp(2.35rem,4.8vw,3.85rem)] leading-[1.08] font-light whitespace-pre-line"
            descriptionClassName="mt-8 max-w-xl text-[clamp(15px,1.05vw,17px)] leading-[1.8] text-muted-foreground"
          />
          <Reveal delay={280} variant="rise">
            <button type="button" className="group mt-12 flex items-center gap-5">
              <span className="pulse-gold flex h-14 w-14 items-center justify-center rounded-full border border-gold/60 text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-navy-deep">
                <Play size={18} fill="currentColor" />
              </span>
              <span className="text-[15px] tracking-wide text-foreground">{whoWeAre.cta}</span>
            </button>
          </Reveal>
        </div>

        <RevealStagger
          className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-3 md:gap-6"
          stagger={0.16}
          delayChildren={0.08}
        >
          {shots.map((s) => (
            <RevealItem key={s.alt} variant="scale">
              <GalleryCard shot={s} progress={scrollYProgress} parallaxOn={parallaxOn} />
            </RevealItem>
          ))}
        </RevealStagger>
      </PageWrap>
    </section>
  );
}
