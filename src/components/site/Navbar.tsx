"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { useSiteContent } from "@/context/SiteContentProvider";
import { useActiveSection } from "@/hooks/use-active-section";
import { easeLux, springSnappy } from "@/lib/motion-presets";

import { Logo } from "./Logo";
import { MotionLink } from "./MotionCTA";

/** Two 2px bars that morph into an X. */
function MenuIcon({ open }: { open: boolean }) {
  const reduceMotion = useReducedMotion();
  const transition = reduceMotion ? { duration: 0 } : springSnappy;

  return (
    <span className="relative block h-4 w-5" aria-hidden>
      <motion.span
        className="absolute left-0 block h-[1.5px] w-5 rounded-full bg-current"
        animate={open ? { top: 7, rotate: 45 } : { top: 3, rotate: 0 }}
        transition={transition}
      />
      <motion.span
        className="absolute left-0 block h-[1.5px] w-5 rounded-full bg-current"
        animate={open ? { top: 7, rotate: -45 } : { top: 11, rotate: 0 }}
        transition={transition}
      />
    </span>
  );
}

export function Navbar() {
  const { content } = useSiteContent();
  const { brand, navigation } = content;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  const sectionIds = useMemo(() => navigation.map((l) => l.href.replace("#", "")), []);
  const active = useActiveSection(sectionIds, "home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Don't leave the drawer open behind a resize into the desktop layout.
  useEffect(() => {
    if (!open) return;
    const mq = window.matchMedia("(min-width: 1024px)");
    const close = () => mq.matches && setOpen(false);
    mq.addEventListener("change", close);
    return () => mq.removeEventListener("change", close);
  }, [open]);

  // Escape closes the mobile drawer.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Transition only the scroll-state properties. `transition-all` would also
  // intercept the opacity/transform Motion drives, leaving the two to fight
  // over the same values.
  const chrome = scrolled
    ? "border-b border-border bg-navy-deep/92 py-2.5 backdrop-blur-xl md:py-3"
    : "border-b-0 py-2.5 md:py-3";

  return (
    <motion.header
      initial={reduceMotion ? false : { y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.7, ease: easeLux, delay: 0.1 }}
      className={`fixed inset-x-0 top-0 z-[60] transition-[background-color,border-color,padding,backdrop-filter] duration-500 ${chrome}`}
    >
      {/* At rest the hero's globe runs full-bleed behind this bar, so the links
          need a scrim to stay legible over the bright parts of the earth. It's a
          child that overhangs the header rather than the header's own
          background: a semi-transparent gradient ending exactly on the header's
          compositing boundary leaves a visible hairline along that edge. Letting
          it fade out well below the bar removes the seam entirely. */}
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 top-0 -z-10 h-[280%] bg-linear-to-b from-navy-deep via-navy-deep/75 to-transparent transition-opacity duration-500 ${
          scrolled ? "opacity-0" : "opacity-100"
        }`}
      />

      <div className="flex w-full items-center gap-3 px-[var(--page-x)] md:gap-4">
        <a
          href="#home"
          aria-label={`${brand.name} home`}
          className="isolate min-w-0 shrink-0 rounded-xs focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:outline-none"
        >
          <Logo lockup animate={false} />
        </a>

        <div className="ml-auto hidden items-center gap-8 lg:flex">
          <nav className="flex items-center gap-7" aria-label="Primary">
            {navigation.map((l) => {
              const id = l.href.replace("#", "");
              const isActive = active === id;
              return (
                <a
                  key={l.label}
                  href={l.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`group relative shrink-0 rounded-xs text-[13px] tracking-wide transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:outline-none ${
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {l.label}
                  {/* Hover underline — grows from the left. */}
                  <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold/50 transition-all duration-300 group-hover:w-full" />
                  {/* Active underline — slides between links via layoutId. */}
                  {isActive ? (
                    <motion.span
                      layoutId={reduceMotion ? undefined : "nav-active"}
                      className="absolute -bottom-1.5 left-0 h-px w-full bg-gold"
                      transition={reduceMotion ? { duration: 0 } : springSnappy}
                    />
                  ) : null}
                </a>
              );
            })}
          </nav>
          <MotionLink href="#contact" className="btn-gold shrink-0 whitespace-nowrap">
            {brand.navCta}
          </MotionLink>
        </div>

        <div className="ml-auto flex items-center gap-2 md:gap-3 lg:hidden">
          <MotionLink
            href="#contact"
            className="btn-gold hidden min-[420px]:inline-flex min-[420px]:px-4 min-[420px]:py-3 min-[420px]:text-[0.75rem]"
          >
            {brand.navCta}
          </MotionLink>
          <motion.button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            whileTap={reduceMotion ? undefined : { scale: 0.9 }}
            className="flex h-10 w-10 items-center justify-center rounded-xs text-gold focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:outline-none"
          >
            <MenuIcon open={open} />
          </motion.button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id="mobile-nav"
            key="mobile-nav"
            initial={reduceMotion ? { height: "auto" } : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduceMotion ? { height: "auto" } : { height: 0, opacity: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.42, ease: easeLux }}
            className="overflow-hidden border-t border-border bg-navy/95 backdrop-blur-xl lg:hidden"
          >
            <motion.nav
              className="flex flex-col px-[var(--page-x)] py-2"
              aria-label="Primary mobile"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.045, delayChildren: 0.08 } },
              }}
            >
              {navigation.map((l) => {
                const id = l.href.replace("#", "");
                return (
                  <motion.a
                    key={l.label}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    aria-current={active === id ? "true" : undefined}
                    variants={
                      reduceMotion
                        ? undefined
                        : {
                            hidden: { opacity: 0, x: -14 },
                            visible: { opacity: 1, x: 0 },
                          }
                    }
                    className={`flex items-center gap-3 border-b border-border/60 py-3 text-sm transition-colors ${
                      active === id ? "text-gold" : "text-muted-foreground hover:text-gold"
                    }`}
                  >
                    <span
                      className={`h-1 w-1 shrink-0 rounded-full transition-colors ${
                        active === id ? "bg-gold" : "bg-transparent"
                      }`}
                    />
                    {l.label}
                  </motion.a>
                );
              })}
              <motion.a
                href="#contact"
                onClick={() => setOpen(false)}
                variants={
                  reduceMotion
                    ? undefined
                    : { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }
                }
                className="btn-gold mt-4 justify-center max-[419px]:flex min-[420px]:hidden"
              >
                {brand.navCta}
              </motion.a>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
