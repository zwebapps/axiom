import { ArrowRight, Check, Play } from "lucide-react";
import boardroom from "@/assets/boardroom.jpg";
import { Reveal } from "./Reveal";

const points = [
  "Global Expertise",
  "Client-Centric Approach",
  "Integrity & Confidentiality",
  "Results Driven",
];

const figures = [
  { value: "15+", label: "Years of Excellence" },
  { value: "40+", label: "Markets Worldwide" },
  { value: "$2B+", label: "Deals Facilitated" },
];

export function About() {
  return (
    <section id="about" className="border-b border-border bg-navy py-24">
      <div className="mx-auto grid max-w-[1360px] gap-16 px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <Reveal>
            <p className="eyebrow">About Us</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-5 font-display text-[clamp(2rem,3.4vw,2.9rem)] leading-[1.14] font-light">
              Connecting Opportunities.
              <br />
              Delivering Results.
            </h2>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
              With decades of combined experience, we operate at the
              intersection of business strategy, international trade and
              investment advisory.
            </p>
          </Reveal>
          <ul className="mt-8 space-y-4">
            {points.map((p, i) => (
              <Reveal as="li" key={p} delay={240 + i * 90}>
                <span className="flex items-center gap-3 text-sm text-foreground">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full border border-gold/50 text-gold">
                    <Check size={11} strokeWidth={3} />
                  </span>
                  {p}
                </span>
              </Reveal>
            ))}
          </ul>
          <div className="mt-12 grid grid-cols-3 gap-6">
            {figures.map((f, i) => (
              <Reveal key={f.label} delay={i * 120}>
                <div className="font-display text-3xl text-gold">{f.value}</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {f.label}
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={160}>
          <div className="relative">
            <div className="group relative overflow-hidden rounded-xs border border-border">
              <img
                src={boardroom}
                alt="Executive boardroom overlooking a city skyline at night"
                loading="lazy"
                width={1200}
                height={800}
                className="h-[420px] w-full object-cover transition-transform duration-[1400ms] ease-[var(--ease-lux)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-navy-deep/35" />
              <button
                aria-label="Play company video"
                className="pulse-gold absolute top-1/2 left-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gold text-navy-deep transition-transform duration-300 hover:scale-110"
              >
                <Play size={20} fill="currentColor" />
              </button>
            </div>

            <div className="float-slow panel absolute right-4 -bottom-10 left-6 rounded-xs p-6 backdrop-blur-md sm:left-auto sm:max-w-xs">
              <h3 className="font-display text-lg text-gold">Our Mission</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                To unlock business potential and create sustainable prosperity
                across global markets.
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal className="mx-auto mt-16 max-w-[1360px] px-6">
        <a
          href="#services"
          className="group inline-flex items-center gap-2 text-[13px] text-gold"
        >
          Learn more about us
          <ArrowRight
            size={15}
            className="transition-transform duration-300 group-hover:translate-x-1.5"
          />
        </a>
      </Reveal>
    </section>
  );
}
