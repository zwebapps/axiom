import { Globe2, Handshake, ShieldCheck, Sparkles } from "lucide-react";
import { brand, footer as footerContent } from "@/content/site";
import { Logo } from "./Logo";
import { Reveal } from "./Reveal";

const pillarIcons = [Globe2, Handshake, ShieldCheck, Sparkles];

export function Footer() {
  return (
    <footer id="contact" className="bg-navy">
      <div className="border-b border-border">
        <div className="mx-auto grid max-w-[1360px] grid-cols-1 px-6 sm:grid-cols-2 lg:grid-cols-4">
          {footerContent.pillars.map((p, i) => {
            const Icon = pillarIcons[i] ?? Globe2;
            return (
              <Reveal
                key={p.title}
                delay={i * 100}
                className={`flex items-start gap-4 py-8 lg:px-6 ${i > 0 ? "lg:hairline-x" : ""}`}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold">
                  <Icon size={18} strokeWidth={1.4} />
                </span>
                <div>
                  <h3 className="font-display text-base text-gold">{p.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{p.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      <div className="mx-auto grid max-w-[1360px] gap-12 px-6 py-16 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
        <Reveal>
          <Logo animate={false} />
          <p className="mt-6 max-w-xs text-[13px] leading-relaxed text-muted-foreground">
            {footerContent.blurb}
          </p>
        </Reveal>
        {footerContent.columns.map((c, i) => (
          <Reveal key={c.title} delay={100 + i * 90}>
            <h4 className="eyebrow">{c.title}</h4>
            <ul className="mt-5 space-y-3">
              {c.links.map((l) => (
                <li key={l}>
                  <a
                    href="#home"
                    className="text-[13px] text-muted-foreground transition-colors duration-300 hover:text-gold"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-[1360px] flex-wrap items-center justify-between gap-3 px-6 py-6 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} {brand.name}. All rights reserved.</span>
          <span>Privacy Policy · Terms of Service</span>
        </div>
      </div>
    </footer>
  );
}
