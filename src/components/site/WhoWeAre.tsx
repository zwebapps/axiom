"use client";

import { Play } from "lucide-react";
import { motion } from "motion/react";

import city from "@/assets/city.jpg";
import ship from "@/assets/ship.jpg";
import handshake from "@/assets/handshake.jpg";
import { whoWeAre } from "@/content/site";

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

function GalleryCard({ shot }: { shot: (typeof shots)[number] }) {
  return (
    <div className={shot.offsetClass}>
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
    </div>
  );
}

export function WhoWeAre() {
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

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-3 md:gap-6">
          {shots.map((s, i) => (
            <Reveal key={s.alt} variant="slideLeft" delay={i * 480}>
              <GalleryCard shot={s} />
            </Reveal>
          ))}
        </div>
      </PageWrap>
    </section>
  );
}
