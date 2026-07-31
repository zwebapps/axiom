"use client";

import { ChevronRight, MapPin } from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

import { globalPresence as globalContent } from "@/content/site";
import { inViewOptions } from "@/lib/motion-presets";

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

function MapPins() {
  const reduceMotion = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, inViewOptions);

  return (
    <div ref={ref} className="contents">
      {pins.map((p, i) => (
        <motion.span
          key={i}
          className="absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-gold"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          initial={reduceMotion ? false : { opacity: 0, scale: 0 }}
          animate={reduceMotion || inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={
            reduceMotion
              ? undefined
              : {
                  type: "spring",
                  stiffness: 480,
                  damping: 22,
                  delay: 0.15 + i * 0.08,
                }
          }
        >
          <span
            className="pulse-gold absolute h-2 w-2 rounded-full bg-gold"
            style={reduceMotion ? undefined : { animation: `float-y ${5 + i}s ease-in-out infinite` }}
          />
          <MapPin size={16} className="relative opacity-80" />
        </motion.span>
      ))}
    </div>
  );
}

export function GlobalPresence() {
  return (
    <section id="global" className="scroll-mt-[var(--site-nav-h)] border-b border-border bg-navy py-16 md:py-24">
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

        <RevealStagger className="mt-10 grid grid-cols-2 rounded-xs border border-border lg:grid-cols-4" stagger={0.1}>
          {globalContent.figures.map((f, i) => (
            <RevealItem
              key={f.label}
              className={`px-6 py-7 text-center ${i > 0 ? "lg:hairline-x" : ""}`}
              variant="scale"
            >
              <div className="font-display text-3xl text-foreground">{f.value}</div>
              <div className="mt-1 text-xs text-muted-foreground">{f.label}</div>
            </RevealItem>
          ))}
        </RevealStagger>
      </PageWrap>
    </section>
  );
}
