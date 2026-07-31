import {
  ArrowRight,
  Briefcase,
  Globe,
  Scale,
  Truck,
  TrendingUp,
  Landmark,
} from "lucide-react";
import { Reveal } from "./Reveal";

const services = [
  {
    icon: Briefcase,
    title: "Business Consultancy",
    text: "Strategic guidance to optimize performance and drive sustainable growth.",
  },
  {
    icon: Globe,
    title: "International Trade",
    text: "End-to-end trade facilitation services across global markets.",
  },
  {
    icon: Scale,
    title: "Market Entry",
    text: "Helping businesses enter new markets with confidence and clarity.",
  },
  {
    icon: Truck,
    title: "Supply Chain Solutions",
    text: "Streamline operations and enhance supply chain resilience.",
  },
  {
    icon: TrendingUp,
    title: "Investment Advisory",
    text: "Identifying and structuring high-impact investment opportunities.",
  },
  {
    icon: Landmark,
    title: "Government & Institutional",
    text: "Advisory for governments and institutions on economic development.",
  },
];

export function Services() {
  return (
    <section id="services" className="border-b border-border bg-navy-deep py-24">
      <div className="mx-auto max-w-[1360px] px-6">
        <Reveal>
          <p className="eyebrow">Our Services</p>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mt-5 max-w-xl font-display text-[clamp(2rem,3.4vw,2.9rem)] leading-[1.14] font-light">
            Comprehensive Solutions
            <br />
            for Your Growth
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 90}>
              <article className="panel group relative h-full overflow-hidden rounded-xs p-7 transition-all duration-500 ease-[var(--ease-lux)] hover:-translate-y-1.5 hover:border-gold/50">
                <span className="absolute inset-x-0 top-0 h-px scale-x-0 bg-linear-to-r from-transparent via-gold to-transparent transition-transform duration-700 group-hover:scale-x-100" />
                <span className="flex h-11 w-11 items-center justify-center rounded-xs border border-gold/40 text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-navy-deep">
                  <s.icon size={19} strokeWidth={1.4} />
                </span>
                <h3 className="mt-5 font-sans text-[15px] font-semibold tracking-wide text-gold uppercase">
                  {s.title}
                </h3>
                <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
                  {s.text}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mt-12 flex justify-center">
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 rounded-full bg-linear-to-r from-gold-deep via-gold-soft to-gold-deep px-7 py-3.5 text-[13px] font-medium text-navy-deep transition-shadow duration-300 hover:shadow-[var(--shadow-gold)]"
          >
            Explore All Services
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
