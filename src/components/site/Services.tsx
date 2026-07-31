import {
  ArrowRight,
  Briefcase,
  Globe,
  Scale,
  Truck,
  TrendingUp,
  Landmark,
} from "lucide-react";
import { services as servicesContent } from "@/content/site";
import { PageWrap } from "./PageWrap";
import { Reveal } from "./Reveal";

const icons = [Briefcase, Globe, Scale, Truck, TrendingUp, Landmark];

export function Services() {
  return (
      <section id="services" className="scroll-mt-[var(--site-nav-h)] border-b border-border bg-navy-deep py-16 md:py-24">
      <PageWrap>
        <Reveal>
          <p className="eyebrow">{servicesContent.eyebrow}</p>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mt-5 max-w-xl font-display text-[clamp(2rem,3.4vw,2.9rem)] leading-[1.14] font-light whitespace-pre-line">
            {servicesContent.title}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {servicesContent.items.map((s, i) => {
            const Icon = icons[i] ?? Briefcase;
            return (
              <Reveal key={s.title} delay={i * 90}>
                <article className="panel group relative h-full overflow-hidden rounded-xs p-7 transition-all duration-500 ease-[var(--ease-lux)] hover:-translate-y-1.5 hover:border-gold/50">
                  <span className="absolute inset-x-0 top-0 h-px scale-x-0 bg-linear-to-r from-transparent via-gold to-transparent transition-transform duration-700 group-hover:scale-x-100" />
                  <span className="flex h-11 w-11 items-center justify-center rounded-xs border border-gold/40 text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-navy-deep">
                    <Icon size={19} strokeWidth={1.4} />
                  </span>
                  <h3 className="mt-5 font-sans text-[15px] font-semibold tracking-wide text-gold uppercase">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">{s.text}</p>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={120} className="mt-12 flex justify-center">
          <a href="#contact" className="btn-gold group">
            {servicesContent.cta}
            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </Reveal>
      </PageWrap>
    </section>
  );
}
