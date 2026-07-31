"use client";

import { ArrowRight } from "lucide-react";
import { insights as insightsContent } from "@/content/site";
import { PageWrap } from "./PageWrap";
import { Reveal, RevealItem, RevealStagger } from "./Reveal";

export function Insights() {
  return (
    <section id="insights" className="scroll-mt-[var(--site-nav-h)] border-b border-border bg-navy-deep py-16 md:py-24">
      <PageWrap>
        <Reveal variant="blur">
          <p className="eyebrow">{insightsContent.eyebrow}</p>
        </Reveal>
        <Reveal delay={90} variant="rise">
          <h2 className="mt-5 max-w-xl font-display text-[clamp(2rem,3.4vw,2.9rem)] leading-[1.14] font-light whitespace-pre-line">
            {insightsContent.title}
          </h2>
        </Reveal>

        <RevealStagger className="mt-14 grid gap-5 md:grid-cols-3" stagger={0.12}>
          {insightsContent.posts.map((post) => (
            <RevealItem key={post.title} variant="slideLeft">
              <article className="panel group flex h-full flex-col rounded-xs p-7 transition-all duration-500 hover:-translate-y-1 hover:border-gold/45">
                <p className="text-[11px] tracking-[0.18em] text-gold uppercase">{post.tag}</p>
                <h3 className="mt-4 font-display text-xl text-foreground">{post.title}</h3>
                <p className="mt-3 flex-1 text-[13px] leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-[13px] text-gold">
                  Read insight
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </article>
            </RevealItem>
          ))}
        </RevealStagger>
      </PageWrap>
    </section>
  );
}
