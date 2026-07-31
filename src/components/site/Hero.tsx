"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";

import { heroClientLogos, heroCorridors } from "@/content/site";
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
  const reduceMotion = useReducedMotion();
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
        <span className="eyebrow">Global business. Limitless opportunities.</span>
        <h1>
          <span>Building Businesses.</span>
          <span>Creating Value.</span>
          <span className="accent">Across Continents.</span>
        </h1>
        <p className="lede">
          Axiom Vertex Group partners with ambitious organizations to transform opportunities into
          sustainable growth across global markets.
        </p>
        <div className="hero__cta">
          <a className="btn btn--gold" href="#contact">
            Book Strategy Session
            <ArrowIcon />
          </a>
          <a className="btn btn--outline hero__cta-secondary" href="#global">
            Explore Global Presence
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
      <motion.span className="eyebrow" variants={line}>
        Global business. Limitless opportunities.
      </motion.span>
      <motion.h1>
        <motion.span variants={line}>Building Businesses.</motion.span>
        <motion.span variants={line}>Creating Value.</motion.span>
        <motion.span className="accent" variants={line}>
          Across Continents.
        </motion.span>
      </motion.h1>
      <motion.p className="lede" variants={line}>
        Axiom Vertex Group partners with ambitious organizations to transform opportunities into
        sustainable growth across global markets.
      </motion.p>
      <motion.div className="hero__cta" variants={line}>
        <MotionLink className="btn btn--gold" href="#contact">
          Book Strategy Session
          <ArrowIcon />
        </MotionLink>
        <MotionLink className="btn btn--outline hero__cta-secondary" href="#global">
          Explore Global Presence
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

export function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);

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
      script.src = "/hero/globe-engine.js";
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
          <img src="/hero/earth-fallback.png" alt="" width={1024} height={1024} decoding="async" />
        </div>
        <div className="hero__scrim" aria-hidden="true" />

        <HeroCopy />

        <div className="hero__bottom">
          <div className="hint">
            <svg className="hint__ring" viewBox="0 0 30 38" fill="none" aria-hidden="true">
              <rect
                x=".6"
                y=".6"
                width="28.8"
                height="36.8"
                rx="14.4"
                stroke="rgba(210,166,87,.4)"
              />
              <path d="M15 9v7" stroke="var(--gold)" strokeWidth="1.3" />
              <circle cx="15" cy="22" r="1.6" fill="var(--gold)" />
              <path
                d="M15 27.5l1.2 2.3 2.3 1.2-2.3 1.2-1.2 2.3-1.2-2.3-2.3-1.2 2.3-1.2z"
                fill="rgba(210,166,87,.5)"
              />
            </svg>
            <span className="hint__txt">
              Drag to rotate
              <br />
              Scroll to explore
            </span>
          </div>

          <div className="corridors">
            <div className="corridors__title">Active global corridors</div>
            <div className="corridors__list" id="corrList">
              {heroCorridors.map((route, i) => (
                <motion.button
                  key={`${route.from}-${route.to}`}
                  className="corr"
                  type="button"
                  data-i={i}
                  whileHover={{ y: -2, scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 420, damping: 26 }}
                >
                  <span
                    className="corr__dot"
                    style={{ background: route.dotColor, color: route.dotColor }}
                  />
                  {route.from} <span className="corr__swap">⇄</span> {route.to}
                </motion.button>
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
            Live corridors run from the United States to the United Kingdom, Germany, the United
            Arab Emirates, Saudi Arabia, Qatar, Oman and Pakistan.
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
          {heroClientLogos.map((id) => (
            <RevealItem key={id}>
              <HeroClientLogo id={id} />
            </RevealItem>
          ))}
        </RevealStagger>
      </section>

      <RevealStagger className="stats" aria-label="Key figures" stagger={0.12} as="section">
        <RevealItem className="stat" variant="scale">
          <svg
            className="stat__ico"
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="15" cy="12" r="7" stroke="currentColor" strokeWidth="1.2" />
            <path
              d="M15 8.4l1.1 2.3 2.5.4-1.8 1.8.4 2.5-2.2-1.2-2.2 1.2.4-2.5-1.8-1.8 2.5-.4z"
              fill="currentColor"
              opacity=".65"
            />
            <path d="M11 18.5 9 28l6-3 6 3-2-9.5" stroke="currentColor" strokeWidth="1.2" />
          </svg>
          <div>
            <CountUp value="15+" className="stat__num" />
            <div className="stat__lbl">Years of Excellence</div>
          </div>
        </RevealItem>
        <RevealItem className="stat" variant="scale">
          <svg
            className="stat__ico"
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            aria-hidden="true"
          >
            <rect
              x="2.6"
              y="4"
              width="24.8"
              height="22"
              rx="3"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <path d="M7.5 20.5l4.5-5 3.6 3 6.4-8" stroke="currentColor" strokeWidth="1.4" />
            <circle cx="22" cy="10.5" r="1.6" fill="currentColor" />
          </svg>
          <div>
            <CountUp value="£2B+" className="stat__num" />
            <div className="stat__lbl">Value Delivered</div>
          </div>
        </RevealItem>
        <RevealItem className="stat" variant="scale">
          <svg
            className="stat__ico"
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="15" cy="15" r="12" stroke="currentColor" strokeWidth="1.2" />
            <ellipse cx="15" cy="15" rx="5" ry="12" stroke="currentColor" strokeWidth="1.2" />
            <path d="M3.4 11h23.2M3.4 19h23.2" stroke="currentColor" strokeWidth="1.2" />
          </svg>
          <div>
            <CountUp value="40+" className="stat__num" />
            <div className="stat__lbl">Markets Served</div>
          </div>
        </RevealItem>
        <RevealItem className="stat" variant="scale">
          <svg
            className="stat__ico"
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="11" cy="10.5" r="4.4" stroke="currentColor" strokeWidth="1.2" />
            <circle
              cx="21.5"
              cy="12"
              r="3.4"
              stroke="currentColor"
              strokeWidth="1.2"
              opacity=".7"
            />
            <path d="M3 25c0-4.4 3.6-7.4 8-7.4s8 3 8 7.4" stroke="currentColor" strokeWidth="1.2" />
            <path
              d="M20 18.2c4 .3 7 3.2 7 6.8"
              stroke="currentColor"
              strokeWidth="1.2"
              opacity=".7"
            />
          </svg>
          <div>
            <CountUp value="100+" className="stat__num" />
            <div className="stat__lbl">Global Partners</div>
          </div>
        </RevealItem>
      </RevealStagger>
    </div>
  );
}
