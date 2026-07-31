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
import { motion, useReducedMotion } from "motion/react";

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

export function Industries() {
  const reduceMotion = useReducedMotion();
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
      className="scroll-mt-[var(--site-nav-h)] border-b border-border bg-navy-deep py-16 md:hidden"
    >
      <PageWrap>
        <SectionIntro
          align="center"
          eyebrow={industriesContent.eyebrow}
          title={industriesContent.title}
          titleClassName="mt-4 font-display text-[clamp(1.75rem,7vw,2.25rem)] font-light leading-tight"
        />

        <div className="relative mx-auto mt-10 aspect-square w-full max-w-[min(100%,340px)]">
          <motion.span
            aria-hidden
            className="absolute inset-[18%] rounded-full border border-dashed border-border"
            {...ring(58, 1)}
          />
          <motion.span
            aria-hidden
            className="absolute inset-[6%] rounded-full border border-border/60"
            {...ring(84, -1)}
          />

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
                  <motion.div
                    className="group flex flex-col items-center gap-2"
                    whileHover={reduceMotion ? undefined : { scale: 1.12 }}
                    whileTap={reduceMotion ? undefined : { scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 22 }}
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-navy text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-navy-deep">
                      <ind.icon size={18} strokeWidth={1.4} />
                    </span>
                    <span className="max-w-[4.5rem] text-center text-[9px] leading-tight text-muted-foreground">
                      {ind.label}
                    </span>
                  </motion.div>
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
