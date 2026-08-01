"use client";

import { Globe2, Handshake, ShieldCheck, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { useSiteContent } from "@/context/SiteContentProvider";
import { footerLinkHref } from "@/lib/footer-links";
import { springSnappy } from "@/lib/motion-presets";
import { PageWrap } from "./PageWrap";
import { Logo } from "./Logo";
import { Reveal, RevealItem, RevealStagger } from "./Reveal";

const pillarIcons = [Globe2, Handshake, ShieldCheck, Sparkles];

function FooterColumnLinks({
  title,
  links,
  regionsInlineAfricaEurope,
}: {
  title: string;
  links: readonly string[];
  regionsInlineAfricaEurope?: boolean;
}) {
  const reduceMotion = useReducedMotion();

  if (title === "Regions" && regionsInlineAfricaEurope) {
    const rest = links.filter((l) => l !== "Africa" && l !== "Europe");
    const hasAfricaEurope = links.includes("Africa") && links.includes("Europe");

    return (
      <ul className="mt-5 space-y-3">
        {rest.map((l) => {
          const href = footerLinkHref(title, l);
          if (!href) {
            return (
              <li key={l}>
                <span className="text-[13px] text-muted-foreground">{l}</span>
              </li>
            );
          }
          return (
            <li key={l}>
              <motion.a
                href={href}
                className="inline-block text-[13px] text-muted-foreground transition-colors duration-300 hover:text-gold"
                whileHover={reduceMotion ? undefined : { x: 5 }}
                transition={springSnappy}
              >
                {l}
              </motion.a>
            </li>
          );
        })}
        {hasAfricaEurope ? (
          <li>
            <span className="text-[13px] text-muted-foreground">Africa · Europe</span>
          </li>
        ) : null}
      </ul>
    );
  }

  return (
    <ul className="mt-5 space-y-3">
      {links.map((l) => {
        const href = footerLinkHref(title, l);
        if (!href) {
          return (
            <li key={l}>
              <span className="text-[13px] text-muted-foreground">{l}</span>
            </li>
          );
        }
        return (
          <li key={l}>
            <motion.a
              href={href}
              className="inline-block text-[13px] text-muted-foreground transition-colors duration-300 hover:text-gold"
              whileHover={reduceMotion ? undefined : { x: 5 }}
              transition={springSnappy}
            >
              {l}
            </motion.a>
          </li>
        );
      })}
    </ul>
  );
}

export function Footer() {
  const reduceMotion = useReducedMotion();
  const { content } = useSiteContent();
  const { brand, footer: footerContent } = content;
  const linkCols = footerContent.gridColumns;
  const mainGridClass =
    linkCols === 4
      ? "grid gap-12 pt-12 pb-6 md:pt-14 md:pb-8 lg:grid-cols-[1.35fr_repeat(4,1fr)] lg:gap-8 lg:pt-16 lg:pb-8"
      : "grid gap-12 pt-12 pb-6 md:pt-14 md:pb-8 lg:grid-cols-[1.35fr_repeat(3,1fr)] lg:gap-8 lg:pt-16 lg:pb-8";

  return (
    <footer className="bg-navy">
      <div className="border-y border-border">
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

      <PageWrap className={mainGridClass}>
        <Reveal variant="slideRight" className="-mt-4 flex flex-col md:-mt-6 lg:-mt-10">
          <a
            href="#home"
            className="isolate inline-block leading-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:outline-none"
            aria-label={`${brand.name} home`}
          >
            <Logo lockup footer animate={false} />
          </a>
          <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-muted-foreground">
            {footerContent.blurb}
          </p>
        </Reveal>
        {footerContent.columns.map((c, i) => (
          <Reveal key={c.title} delay={100 + i * 90} variant="fade">
            <h4 className="eyebrow">{c.title}</h4>
            <FooterColumnLinks
              title={c.title}
              links={c.links}
              regionsInlineAfricaEurope={footerContent.regionsInlineAfricaEurope}
            />
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
