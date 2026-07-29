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
          className="ken-burns h-full w-full object-cover object-center opacity-90"
        />
        <div className="absolute inset-0 bg-linear-to-r from-navy-deep via-navy-deep/85 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-navy-deep via-transparent to-navy-deep/60" />
      </div>

      <div className="relative mx-auto max-w-[1360px] px-6 pt-44 pb-20 lg:pt-52 lg:pb-28">
        <div className="max-w-2xl">
          <Reveal>
            <p className="eyebrow">
              Strategic Business Consultancy &amp; International Trade
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-6 font-display text-[clamp(2.6rem,6vw,4.6rem)] leading-[1.06] font-light">
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
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 rounded-xs bg-linear-to-r from-gold-deep via-gold-soft to-gold-deep px-7 py-4 text-[13px] font-medium text-navy-deep transition-shadow duration-300 hover:shadow-[var(--shadow-gold)]"
              >
                Book Strategy Session
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
              <a
                href="#about"
                className="group inline-flex items-center gap-3 rounded-xs border border-hairline px-7 py-4 text-[13px] text-foreground transition-colors duration-300 hover:border-gold hover:text-gold"
              >
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

      <div className="relative border-y border-border bg-navy-deep/70 backdrop-blur-sm">
        <div className="mx-auto grid max-w-[1360px] grid-cols-2 px-6 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal
              key={s.value + i}
              delay={i * 110}
              className={`flex items-center gap-4 py-8 ${
                i % 2 !== 0 ? "hairline-x pl-6" : ""
              } lg:pl-6 ${i !== 0 ? "lg:hairline-x" : ""}`}
            >
              <s.icon size={26} strokeWidth={1.2} className="text-gold" />
              <div>
                <div className="font-display text-3xl text-foreground">
                  {s.value}
                </div>
                <div className="text-xs leading-tight whitespace-pre-line text-muted-foreground">
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="relative border-b border-border bg-navy-deep">
        <div className="mx-auto max-w-[1360px] overflow-hidden px-6 py-8">
          <p className="eyebrow">Trusted by Leading Organizations</p>
          <div className="mt-5 flex flex-wrap items-center gap-x-12 gap-y-5">
            {logos.map((l, i) => (
              <span
                key={l + i}
                className="font-display text-xl tracking-wide text-muted-foreground/70 transition-colors duration-300 hover:text-gold"
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
