"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";

import { useSiteContent } from "@/context/SiteContentProvider";
import { publicUrl } from "@/lib/public-url";
import { easeLux } from "@/lib/motion-presets";
import { CountUp } from "./CountUp";
import { HeroClientLogo } from "./HeroClientLogo";
import { MotionLink } from "./MotionCTA";
import { Reveal, RevealItem, RevealStagger } from "./Reveal";

import "@/styles/axiom-hero.css";

declare global {
  interface Window {
    initAxiomGlobe?: (root: HTMLElement) => void;
  }
}

const DESKTOP_HERO_MQ = "(min-width: 768px)";

function HeroCopy() {
  const { content } = useSiteContent();
  const brand = content.brand;
  const reduceMotion = useReducedMotion();
  const eyebrowClass = brand.heroEyebrowBadge ? "eyebrow eyebrow--badge" : "eyebrow";
  const line1Class = brand.heroEyebrowBadge
    ? "hero__line hero__line--serif"
    : "hero__line";
  const line2Class = brand.heroEyebrowBadge ? "hero__line hero__line--caps" : "hero__line";
  const line3Class = brand.heroHeadline.line3Accent
    ? "accent hero__line"
    : "hero__line";
  const line = reduceMotion
    ? undefined
    : {
        hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
        show: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.85, ease: easeLux },
        },
      };

  const container = reduceMotion
    ? undefined
    : {
        hidden: {},
        show: { transition: { staggerChildren: 0.11, delayChildren: 0.2 } },
      };

  if (reduceMotion) {
    return (
      <div className="hero__copy">
        <span className={eyebrowClass}>{brand.heroEyebrow}</span>
        <h1>
          <span className={line1Class}>{brand.heroHeadline.line1}</span>
          <span className={line2Class}>{brand.heroHeadline.line2}</span>
          <span className={line3Class}>{brand.heroHeadline.line3}</span>
        </h1>
        <p className="lede">{brand.heroDescription}</p>
        <div className="hero__cta">
          <a className="btn btn--gold" href="#contact">
            {brand.ctaPrimary}
            <ArrowIcon />
          </a>
          <a className="btn btn--outline hero__cta-secondary" href={brand.ctaSecondaryHref}>
            {brand.ctaSecondary}
            <span className="play" aria-hidden="true">
              <svg width="7" height="8" viewBox="0 0 7 8">
                <path d="M0 0l7 4-7 4z" fill="currentColor" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <motion.div className="hero__copy" variants={container} initial="hidden" animate="show">
      <motion.span className={eyebrowClass} variants={line}>
        {brand.heroEyebrow}
      </motion.span>
      <motion.h1>
        <motion.span className={line1Class} variants={line}>
          {brand.heroHeadline.line1}
        </motion.span>
        <motion.span className={line2Class} variants={line}>
          {brand.heroHeadline.line2}
        </motion.span>
        <motion.span className={line3Class} variants={line}>
          {brand.heroHeadline.line3}
        </motion.span>
      </motion.h1>
      <motion.p className="lede" variants={line}>
        {brand.heroDescription}
      </motion.p>
      <motion.div className="hero__cta" variants={line}>
        <MotionLink className="btn btn--gold" href="#contact">
          {brand.ctaPrimary}
          <ArrowIcon />
        </MotionLink>
        <MotionLink className="btn btn--outline hero__cta-secondary" href={brand.ctaSecondaryHref}>
          {brand.ctaSecondary}
          <span className="play" aria-hidden="true">
            <svg width="7" height="8" viewBox="0 0 7 8">
              <path d="M0 0l7 4-7 4z" fill="currentColor" />
            </svg>
          </span>
        </MotionLink>
      </motion.div>
    </motion.div>
  );
}

function ArrowIcon() {
  return (
    <svg
      className="btn__arrow"
      width="15"
      height="9"
      viewBox="0 0 15 9"
      fill="none"
      aria-hidden="true"
    >
      <path d="M0 4.5h13M9.4 1l3.6 3.5-3.6 3.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function HeroStat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <RevealItem className="stat" variant="scale">
      <div>
        <CountUp value={value} className="stat__num" />
        <div className="stat__lbl">{label}</div>
      </div>
    </RevealItem>
  );
}

export function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { content } = useSiteContent();
  const statsClass =
    content.heroStatsColumns === 3
      ? "stats stats-has-top-flow group stats--three"
      : "stats stats-has-top-flow group";

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const mq = window.matchMedia(DESKTOP_HERO_MQ);
    const run = () => {
      if (!mq.matches) return;
      const init = () => {
        if (root.dataset.globeReady === "1") return;
        window.initAxiomGlobe?.(root);
        root.dataset.globeReady = "1";
      };
      if (window.initAxiomGlobe) {
        init();
        return;
      }
      const existing = document.querySelector('script[data-axiom-globe="1"]');
      if (existing) {
        existing.addEventListener("load", init, { once: true });
        return;
      }
      const script = document.createElement("script");
      script.src = publicUrl("hero/globe-engine.js");
      script.async = true;
      script.dataset.axiomGlobe = "1";
      script.onload = init;
      document.body.appendChild(script);
    };

    run();
    mq.addEventListener("change", run);
    return () => mq.removeEventListener("change", run);
  }, []);

  return (
    <div ref={rootRef} className="axiom-hero" id="home">
      <section className="hero">
        <div className="hero__bg" />
        <div className="hero__grid" />
        <div className="hero__globe-mobile" aria-hidden="true">
          <img src={publicUrl("hero/earth-fallback.png")} alt="" width={1024} height={1024} decoding="async" />
        </div>
        <div className="hero__scrim" aria-hidden="true" />

        <HeroCopy />

        <div className="hero__bottom hero__bottom--corridors-only">
          <div className="corridors">
            <div className="corridors__title">Active global corridors</div>
            <div className="corridors__list" id="corrList">
              {content.heroCorridorRegions.map((region) => (
                <span key={region.label} className="corr corr--region">
                  <span
                    className="corr__dot"
                    style={{ background: region.dotColor, color: region.dotColor }}
                  />
                  {region.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="globe" id="globe">
          <canvas className="globe__earth" id="glc" aria-hidden="true" />
          <canvas
            className="globe__canvas"
            id="gc"
            aria-label="Axiom Vertex Group trade corridors drawn over a night view of Earth"
            role="img"
          />
          <p className="sr">
            Live corridors connect the United States with Europe, the GCC, South Asia, and Africa.
          </p>
          <div
            className="globe__hit"
            id="ghit"
            tabIndex={0}
            role="application"
            aria-label="Drag to rotate the globe, or use the arrow keys"
          />
          <div className="markers" id="markers" aria-hidden="true" />
        </div>

        <div className="globe__tools">
          <button
            className="tool"
            id="tPause"
            type="button"
            aria-label="Pause globe rotation"
            aria-pressed="false"
          >
            <svg width="11" height="12" viewBox="0 0 11 12" aria-hidden="true">
              <rect x="0" y="0" width="3.4" height="12" fill="currentColor" />
              <rect x="7.6" y="0" width="3.4" height="12" fill="currentColor" />
            </svg>
          </button>
          <button className="tool" id="tZoomIn" type="button" aria-label="Zoom in on globe">
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
              <path
                d="M6 1.2v9.6M1.2 6h9.6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <button className="tool" id="tZoomOut" type="button" aria-label="Zoom out on globe">
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
              <path d="M1.2 6h9.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </section>

      <section className="clients clients--desktop">
        <Reveal variant="blur">
          <span className="eyebrow">Trusted by forward-thinking organizations</span>
        </Reveal>
        <RevealStagger className="clients__row" stagger={0.07} id="clients">
          {content.heroClientLogos.map((id) => (
            <RevealItem key={id}>
              <HeroClientLogo id={id} />
            </RevealItem>
          ))}
        </RevealStagger>
      </section>

      <RevealStagger
        className={statsClass}
        aria-label="Key figures"
        stagger={0.12}
        as="section"
      >
        <div className="stats__top-flow" aria-hidden>
          <span className="stats__top-track" />
          <span className="stats__top-shine" />
          <span className="stats__top-dot" />
        </div>
        {content.heroStats.map((stat) => (
          <HeroStat
            key={stat.value}
            value={stat.value}
            label={stat.label.replace("\n", " ")}
          />
        ))}
      </RevealStagger>
    </div>
  );
}
