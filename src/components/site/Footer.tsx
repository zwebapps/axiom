"use client";

import { Globe2, Handshake, ShieldCheck, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { brand, footer as footerContent } from "@/content/site";
import { springSnappy } from "@/lib/motion-presets";
import { PageWrap } from "./PageWrap";
import { Logo } from "./Logo";
import { Reveal, RevealItem, RevealStagger } from "./Reveal";

const pillarIcons = [Globe2, Handshake, ShieldCheck, Sparkles];

export function Footer() {
  const reduceMotion = useReducedMotion();

  return (
    <footer className="bg-navy">
      <div className="border-b border-border">
        <PageWrap>
          <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
            {footerContent.pillars.map((p, i) => {
              const Icon = pillarIcons[i] ?? Globe2;
              return (
                <RevealItem
                  key={p.title}
                  className={`group flex items-start gap-4 py-8 lg:px-6 ${i > 0 ? "lg:hairline-x" : ""}`}
                  variant="rise"
                >
                  <motion.span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-navy-deep"
                    whileHover={reduceMotion ? undefined : { scale: 1.1, rotate: 6 }}
                    transition={springSnappy}
                  >
                    <Icon size={18} strokeWidth={1.4} />
                  </motion.span>
                  <div>
                    <h3 className="font-display text-base text-gold">{p.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{p.text}</p>
                  </div>
                </RevealItem>
              );
            })}
          </RevealStagger>
        </PageWrap>
      </div>

      <PageWrap className="grid gap-12 py-16 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
        <Reveal variant="slideRight">
          <Logo lockup animate={false} />
          <p className="mt-6 max-w-xs text-[13px] leading-relaxed text-muted-foreground">
            {footerContent.blurb}
          </p>
        </Reveal>
        {footerContent.columns.map((c, i) => (
          <Reveal key={c.title} delay={100 + i * 90} variant="fade">
            <h4 className="eyebrow">{c.title}</h4>
            <ul className="mt-5 space-y-3">
              {c.links.map((l) => (
                <li key={l}>
                  <motion.a
                    href="#home"
                    className="inline-block text-[13px] text-muted-foreground transition-colors duration-300 hover:text-gold"
                    whileHover={reduceMotion ? undefined : { x: 5 }}
                    transition={springSnappy}
                  >
                    {l}
                  </motion.a>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </PageWrap>

      <div className="border-t border-border">
        <PageWrap className="flex flex-wrap items-center justify-between gap-3 py-6 text-xs text-muted-foreground">
          <span>
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </span>
          <span>Privacy Policy · Terms of Service</span>
        </PageWrap>
      </div>
    </footer>
  );
}
