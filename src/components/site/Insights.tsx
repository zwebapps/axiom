"use client";

import { ArrowRight } from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

import type { SiteContent } from "@/content/site-content.types";
import { useSiteContent } from "@/context/SiteContentProvider";
import { easeLux, inViewOptions } from "@/lib/motion-presets";

import { PageWrap } from "./PageWrap";
import { SectionIntro } from "./SectionIntro";
import { TiltCard } from "./TiltCard";

type Post = SiteContent["insights"]["posts"][number];

/** Seconds before the first card moves, and between each card after it. */
const LEAD_IN = 0.1;
const CARD_STAGGER = 0.2;
/** Gap before a card's own text starts arriving, then between each line. */
const TEXT_OFFSET = 0.2;
const TEXT_STAGGER = 0.09;

const cardClass =
  "panel group relative flex h-full flex-col overflow-hidden rounded-xs p-7 transition-colors duration-500 hover:border-gold/45";
const tagClass = "text-[11px] tracking-[0.18em] text-gold uppercase";
const titleClass = "mt-4 font-display text-xl text-foreground";
const excerptClass = "mt-3 flex-1 text-[13px] leading-relaxed text-muted-foreground";
const linkClass = "mt-6 inline-flex items-center gap-2 text-[13px] text-gold";

function ReadLink() {
  return (
    <>
      Read insight
      <ArrowRight
        size={14}
        className="transition-transform duration-300 group-hover:translate-x-1"
      />
    </>
  );
}

function InsightCard({
  post,
  index,
  show,
  animate,
}: {
  post: Post;
  index: number;
  show: boolean;
  animate: boolean;
}) {
  if (!animate) {
    return (
      <div className="h-full">
        <TiltCard intensity={4}>
          <article className={cardClass}>
            <p className={tagClass}>{post.tag}</p>
            <h3 className={titleClass}>{post.title}</h3>
            <p className={excerptClass}>{post.excerpt}</p>
            <span className={linkClass}>
              <ReadLink />
            </span>
          </article>
        </TiltCard>
      </div>
    );
  }

  const cardDelay = LEAD_IN + index * CARD_STAGGER;

  // Plain objects rather than variant labels: Motion only propagates labels to
  // children, and TiltCard sits between this element and the text.
  const line = (row: number) => ({
    initial: { opacity: 0, y: 14 },
    animate: show ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
    transition: {
      duration: 0.6,
      ease: easeLux,
      delay: cardDelay + TEXT_OFFSET + row * TEXT_STAGGER,
    },
  });

  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 44, scale: 0.97 }}
      animate={show ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 44, scale: 0.97 }}
      transition={{ duration: 0.85, ease: easeLux, delay: cardDelay }}
    >
      <TiltCard intensity={4}>
        <article className={cardClass}>
          {/* Gold hairline that draws itself across the top as the card lands. */}
          <motion.span
            aria-hidden
            className="absolute inset-x-0 top-0 h-px origin-left bg-linear-to-r from-transparent via-gold to-transparent"
            initial={{ scaleX: 0 }}
            animate={show ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.9, ease: easeLux, delay: cardDelay + 0.12 }}
          />
          <motion.p className={tagClass} {...line(0)}>
            {post.tag}
          </motion.p>
          <motion.h3 className={titleClass} {...line(1)}>
            {post.title}
          </motion.h3>
          <motion.p className={excerptClass} {...line(2)}>
            {post.excerpt}
          </motion.p>
          <motion.span className={linkClass} {...line(3)}>
            <ReadLink />
          </motion.span>
        </article>
      </TiltCard>
    </motion.div>
  );
}

export function Insights() {
  const { content } = useSiteContent();
  const insightsContent = content.insights;
  const gridRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(gridRef, inViewOptions);

  return (
    <section
      id="insights"
      className="site-section scroll-mt-[var(--site-nav-h)] border-b border-border bg-navy-deep"
    >
      <PageWrap>
        <SectionIntro
          eyebrow={insightsContent.eyebrow}
          title={insightsContent.title}
          description={insightsContent.subtitle}
        />

        {/* One observer for the row, so the cards always arrive left to right
            instead of racing their own thresholds. */}
        <div ref={gridRef} className="mt-14 grid gap-5 md:grid-cols-3">
          {insightsContent.posts.map((post, i) => (
            <InsightCard
              key={post.title}
              post={post}
              index={i}
              show={inView}
              animate={!reduceMotion}
            />
          ))}
        </div>
      </PageWrap>
    </section>
  );
}
