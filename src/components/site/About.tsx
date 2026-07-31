"use client";

import { ArrowRight, Check, Play } from "lucide-react";
import boardroom from "@/assets/boardroom.jpg";
import { about } from "@/content/site";
import { CountUp } from "./CountUp";
import { MotionLink } from "./MotionCTA";
import { PageWrap } from "./PageWrap";
import { Reveal, RevealItem, RevealStagger } from "./Reveal";
import { SectionIntro } from "./SectionIntro";

export function About() {
  return (
    <section
      id="about"
      className="scroll-mt-[var(--site-nav-h)] border-b border-border bg-navy py-16 md:py-24"
    >
      <PageWrap className="grid gap-16 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionIntro eyebrow={about.eyebrow} title={about.title} description={about.body} />
          <ul className="mt-8 space-y-4">
            {about.points.map((p, i) => (
              <Reveal as="li" key={p} delay={i * 80} variant="slideRight">
                <span className="flex items-center gap-3 text-sm text-foreground">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full border border-gold/50 text-gold">
                    <Check size={11} strokeWidth={3} />
                  </span>
                  {p}
                </span>
              </Reveal>
            ))}
          </ul>
          <RevealStagger className="mt-12 grid grid-cols-3 gap-6" stagger={0.12}>
            {about.figures.map((f) => (
              <RevealItem key={f.label} variant="scale">
                <CountUp
                  value={f.value}
                  className="block font-display text-3xl text-gold tabular-nums"
                />
                <div className="mt-1 text-xs text-muted-foreground">{f.label}</div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>

        <Reveal delay={140} variant="slideLeft">
          <div className="relative">
            <div className="group relative overflow-hidden rounded-xs border border-border">
              <img
                src={boardroom}
                alt="Executive boardroom overlooking a city skyline at night"
                loading="lazy"
                width={1200}
                height={800}
                className="h-[420px] w-full object-cover transition-transform duration-[1400ms] ease-[var(--ease-lux)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-navy-deep/35" />
              <button
                type="button"
                aria-label="Play company video"
                className="pulse-gold absolute top-1/2 left-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gold text-navy-deep transition-transform duration-300 hover:scale-110"
              >
                <Play size={20} fill="currentColor" />
              </button>
            </div>

            <div className="float-slow panel absolute right-4 -bottom-10 left-6 rounded-xs p-6 backdrop-blur-md sm:left-auto sm:max-w-xs">
              <h3 className="font-display text-lg text-gold">{about.missionTitle}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                {about.missionBody}
              </p>
            </div>
          </div>
        </Reveal>
      </PageWrap>

      <PageWrap className="mt-16">
        <Reveal variant="fade">
          <MotionLink
            href="#services"
            className="group inline-flex items-center gap-2 text-[13px] text-gold"
          >
            {about.link}
            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1.5"
            />
          </MotionLink>
        </Reveal>
      </PageWrap>
    </section>
  );
}
