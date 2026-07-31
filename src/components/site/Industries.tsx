import { ArrowRight, Building2, Cpu, Factory, HeartPulse, Landmark, ShoppingBag, Zap } from "lucide-react";
import { industries as industriesContent, brand, logos } from "@/content/site";
import { PageWrap } from "./PageWrap";
import { Reveal } from "./Reveal";

const industryIcons: Record<string, typeof HeartPulse> = {
  Healthcare: HeartPulse,
  Energy: Zap,
  Manufacturing: Factory,
  Infrastructure: Building2,
  Government: Landmark,
  "Consumer Goods": ShoppingBag,
  Technology: Cpu,
};

export function Industries() {
  const items = industriesContent.items.map((label) => ({
    label,
    icon: industryIcons[label] ?? Building2,
  }));

  return (
    <section id="industries" className="border-b border-border bg-navy-deep py-24">
      <PageWrap>
        <div className="mx-auto max-w-xl text-center lg:max-w-none lg:text-left">
          <Reveal>
            <p className="eyebrow">{industriesContent.eyebrow}</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-5 font-display text-[clamp(2rem,3.4vw,2.9rem)] font-light">
              {industriesContent.title}
            </h2>
          </Reveal>
        </div>

        <div className="relative mx-auto mt-16 aspect-square w-full max-w-[min(100%,520px)] min-[480px]:max-w-[520px]">
          <span className="absolute inset-[18%] rounded-full border border-border" />
          <span className="absolute inset-[6%] rounded-full border border-border/60" />

          <Reveal className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <span className="pulse-gold flex h-[5.5rem] w-[5.5rem] items-center justify-center rounded-full border border-gold/50 bg-navy p-3 sm:h-28 sm:w-28 sm:p-3.5">
              <img
                src={logos.hub}
                alt={`${brand.name} mark`}
                width={120}
                height={120}
                className="h-full w-full object-contain"
                decoding="async"
              />
            </span>
          </Reveal>

          {items.map((ind, i) => {
            const angle = (i / items.length) * Math.PI * 2 - Math.PI / 2;
            const left = 50 + Math.cos(angle) * 42;
            const top = 50 + Math.sin(angle) * 42;
            return (
              <Reveal
                key={ind.label}
                delay={i * 90}
                className="absolute"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="group flex flex-col items-center gap-2">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-navy text-gold transition-all duration-500 group-hover:scale-110 group-hover:bg-gold group-hover:text-navy-deep">
                    <ind.icon size={18} strokeWidth={1.4} />
                  </span>
                  <span className="text-[11px] whitespace-nowrap text-muted-foreground">
                    {ind.label}
                  </span>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={120} className="mt-14 flex justify-center">
          <a href="#contact" className="btn-outline group">
            {industriesContent.cta}
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
