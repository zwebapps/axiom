import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Logo } from "./Logo";

const links = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Industries", href: "#industries" },
  { label: "Global Presence", href: "#global" },
  { label: "Insights", href: "#insights" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-border bg-navy-deep/90 py-3 backdrop-blur-xl"
          : "border-b border-transparent bg-linear-to-b from-navy-deep/80 to-transparent py-5 lg:py-6"
      }`}
    >
      <div className="mx-auto grid max-w-[1360px] grid-cols-[1fr_auto] items-center gap-4 px-6 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
        <a href="#home" aria-label="Axiom Vertex Group home" className="justify-self-start">
          <Logo compact={isMobile} animate={false} />
        </a>

        <nav className="hidden items-center justify-center gap-7 lg:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="group relative text-[13px] tracking-wide text-muted-foreground transition-colors duration-300 hover:text-foreground"
            >
              {l.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-3">
          <a
            href="#contact"
            className="btn-gold hidden sm:inline-flex"
          >
            Book Strategy Session
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="text-gold lg:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden border-border bg-navy/95 backdrop-blur-xl transition-[max-height] duration-500 lg:hidden ${
          open ? "mt-4 max-h-96 border-t" : "max-h-0"
        }`}
      >
        <nav className="mx-auto flex max-w-[1360px] flex-col px-6 py-2">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-border/60 py-3 text-sm text-muted-foreground transition-colors hover:text-gold"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
