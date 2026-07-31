import { Play } from "lucide-react";
import city from "@/assets/city.jpg";
import ship from "@/assets/ship.jpg";
import handshake from "@/assets/handshake.jpg";
import { whoWeAre } from "@/content/site";
import { PageWrap } from "./PageWrap";
import { Reveal } from "./Reveal";

const shots = [
  { src: city, alt: "Illuminated skyline of a global financial hub at night", offset: "lg:mt-0" },
  { src: ship, alt: "Container ship carrying cargo across international waters", offset: "lg:-mt-10" },
  { src: handshake, alt: "Two executives shaking hands after an agreement", offset: "lg:mt-6" },
];

export function WhoWeAre() {
  return (
    <section className="border-b border-border bg-navy-deep py-24">
      <PageWrap className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <Reveal>
            <p className="eyebrow">{whoWeAre.eyebrow}</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-5 font-display text-[clamp(2rem,3.6vw,3rem)] leading-[1.12] font-light whitespace-pre-line">
              {whoWeAre.title}
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-7 max-w-sm text-[15px] leading-relaxed text-muted-foreground">
              {whoWeAre.body}
            </p>
          </Reveal>
          <Reveal delay={300}>
            <button type="button" className="group mt-10 flex items-center gap-4">
              <span className="pulse-gold flex h-12 w-12 items-center justify-center rounded-full border border-gold/60 text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-navy-deep">
                <Play size={15} fill="currentColor" />
              </span>
              <span className="text-[13px] text-foreground">{whoWeAre.cta}</span>
            </button>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-3">
          {shots.map((s, i) => (
            <Reveal key={s.alt} delay={i * 140} className={s.offset}>
              <div className="group relative overflow-hidden rounded-xs border border-border">
                <img
                  src={s.src}
                  alt={s.alt}
                  loading="lazy"
                  width={700}
                  height={1000}
                  className="h-[300px] w-full object-cover transition-transform duration-[1200ms] ease-[var(--ease-lux)] group-hover:scale-110 lg:h-[380px]"
                />
                <div className="absolute inset-0 bg-linear-to-t from-navy-deep/70 to-transparent" />
              </div>
            </Reveal>
          ))}
        </div>
      </PageWrap>
    </section>
  );
}
