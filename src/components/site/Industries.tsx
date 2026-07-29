import {
  ArrowRight,
  Building2,
  Cpu,
  Factory,
  HeartPulse,
  Landmark,
  ShoppingBag,
  Zap,
} from "lucide-react";
import { Reveal } from "./Reveal";

const industries = [
  { icon: HeartPulse, label: "Healthcare" },
  { icon: Zap, label: "Energy" },
  { icon: Factory, label: "Manufacturing" },
  { icon: Building2, label: "Infrastructure" },
  { icon: Landmark, label: "Government" },
  { icon: ShoppingBag, label: "Consumer Goods" },
  { icon: Cpu, label: "Technology" },
];

export function Industries() {
  return (
    <section
      id="industries"
      className="border-b border-border bg-navy-deep py-24"
    >
      <div className="mx-auto max-w-[1360px] px-6 text-center">
        <Reveal>
          <p className="eyebrow">Our Industries</p>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mt-5 font-display text-[clamp(2rem,3.4vw,2.9rem)] font-light">
            Industries We Serve
          </h2>
        </Reveal>

        <div className="relative mx-auto mt-16 aspect-square w-full max-w-[520px]">
          <span className="absolute inset-[18%] rounded-full border border-border" />
          <span className="absolute inset-[6%] rounded-full border border-border/60" />

          <Reveal className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <span className="pulse-gold flex h-24 w-24 items-center justify-center rounded-full border border-gold/50 bg-navy">
              <svg viewBox="0 0 48 44" className="h-10 w-11" fill="none">
                <path
                  d="M24 2 46 42H34L24 20 14 42H2L24 2Z"
                  fill="oklch(0.79 0.115 82)"
                />
                <path d="M24 24 32 42H16L24 24Z" fill="oklch(0.2 0.035 258)" />
              </svg>
            </span>
          </Reveal>

          {industries.map((ind, i) => {
            const angle = (i / industries.length) * Math.PI * 2 - Math.PI / 2;
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
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 rounded-xs border border-hairline px-7 py-3.5 text-[13px] text-foreground transition-colors duration-300 hover:border-gold hover:text-gold"
          >
            View All Industries
            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
