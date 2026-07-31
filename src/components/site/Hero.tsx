import { ArrowRight, Download, Award, DollarSign, Globe2, Users } from "lucide-react";
import heroGlobe from "@/assets/hero-globe.jpg";
import { Reveal } from "./Reveal";

const stats = [
  { icon: Award, value: "15+", label: "Years of\nExcellence" },
  { icon: DollarSign, value: "$2B+", label: "Deals\nFacilitated" },
  { icon: Globe2, value: "40+", label: "Markets\nWorldwide" },
  { icon: Users, value: "100+", label: "Strategic\nPartners" },
];

const logos = [
  "SIEMENS",
  "EMAAR",
  "DP WORLD",
  "Standard Chartered",
  "OSG",
  "SIEMENS",
  "EMAAR",
  "DP WORLD",
];

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-navy-deep">
      <div className="absolute inset-0">
        <img
          src={heroGlobe}
          alt="Global network of illuminated cities connected across continents"
          width={1400}
          height={1000}
          className="ken-burns h-full w-full object-cover object-[72%_center] opacity-95 lg:object-right"
        />
        <div className="absolute inset-0 bg-linear-to-r from-navy-deep from-25% via-navy-deep/88 to-navy-deep/15 lg:from-30% lg:via-navy-deep/75 lg:to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-navy-deep via-transparent to-navy-deep/50" />
      </div>

      <div className="relative mx-auto flex min-h-[min(780px,92vh)] max-w-[1360px] flex-col justify-end px-6 pt-36 pb-0 lg:min-h-[min(880px,100vh)] lg:pt-44">
        <div className="max-w-2xl pb-16 lg:pb-24">
          <Reveal>
            <p className="eyebrow">
              Strategic Business Consultancy &amp; International Trade
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-6 font-display text-[clamp(2.5rem,5.5vw,4.75rem)] leading-[1.05] font-light">
              Building Businesses.
              <br />
              Creating Value.
              <br />
              <span className="text-gold-gradient">Across Continents.</span>
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-8 max-w-md text-[15px] leading-relaxed text-muted-foreground">
              We partner with organizations and governments to unlock
              opportunities, drive growth and create sustainable value across
              global markets.
            </p>
          </Reveal>
          <Reveal delay={360}>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#contact" className="btn-gold group">
                Book Strategy Session
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
              <a href="#about" className="btn-outline group">
                Download Company Profile
                <Download
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-y-0.5"
                />
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="relative border-y border-border/80 bg-navy-deep/80 backdrop-blur-md">
        <div className="mx-auto grid max-w-[1360px] grid-cols-2 px-6 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal
              key={s.value + i}
              delay={i * 110}
              className={`flex items-center gap-4 py-8 ${
                i % 2 !== 0 ? "hairline-x pl-6" : ""
              } lg:pl-6 ${i !== 0 ? "lg:hairline-x" : ""}`}
            >
              <s.icon size={26} strokeWidth={1.2} className="shrink-0 text-gold" />
              <div>
                <div className="font-display text-3xl text-foreground">{s.value}</div>
                <div className="text-xs leading-tight whitespace-pre-line text-muted-foreground">
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="relative border-b border-border bg-navy-deep py-8">
        <div className="mx-auto max-w-[1360px] px-6">
          <p className="eyebrow text-center lg:text-left">Trusted by Leading Organizations</p>
        </div>
        <div className="logo-marquee mt-5 mask-fade-x">
          <div className="logo-marquee-track">
            {[...logos, ...logos].map((l, i) => (
              <span
                key={`${l}-${i}`}
                className="font-sans text-sm font-medium tracking-[0.2em] text-muted-foreground/70 uppercase sm:text-base"
              >
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
