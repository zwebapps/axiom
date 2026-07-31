import { ArrowRight } from "lucide-react";
import { insights as insightsContent } from "@/content/site";
import { Reveal } from "./Reveal";

export function Insights() {
  return (
    <section id="insights" className="border-b border-border bg-navy-deep py-24">
      <div className="mx-auto max-w-[1360px] px-6">
        <Reveal>
          <p className="eyebrow">{insightsContent.eyebrow}</p>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mt-5 max-w-xl font-display text-[clamp(2rem,3.4vw,2.9rem)] leading-[1.14] font-light whitespace-pre-line">
            {insightsContent.title}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {insightsContent.posts.map((post, i) => (
            <Reveal key={post.title} delay={i * 100}>
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
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
