import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { brand, navigation } from "@/content/site";
import { useIsMobile } from "@/hooks/use-mobile";
import { Logo } from "./Logo";

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
      className={`fixed inset-x-0 top-0 z-[60] transition-all duration-500 ${
        scrolled
          ? "border-b border-border bg-navy-deep/92 py-3 backdrop-blur-xl"
          : "border-b border-transparent bg-linear-to-b from-navy-deep/85 via-navy-deep/45 to-transparent py-3 lg:py-4"
      }`}
    >
      <div className="flex w-full items-center gap-4 px-[var(--page-x)]">
        <a href="#home" aria-label={`${brand.name} home`} className="shrink-0">
          <Logo compact={isMobile} lockup animate={false} />
        </a>

        <div className="ml-auto hidden items-center gap-8 lg:flex">
          <nav className="flex items-center gap-7" aria-label="Primary">
            {navigation.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="group relative shrink-0 text-[13px] tracking-wide text-muted-foreground transition-colors duration-300 hover:text-foreground"
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>
          <a href="#contact" className="btn-gold shrink-0 whitespace-nowrap">
            {brand.ctaPrimary}
          </a>
        </div>

        <div className="ml-auto flex items-center gap-3 lg:hidden">
          <a href="#contact" className="btn-gold hidden min-[420px]:inline-flex">
            {brand.ctaPrimary}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="text-gold"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden border-border bg-navy/95 backdrop-blur-xl transition-[max-height] duration-500 lg:hidden ${
          open ? "mt-3 max-h-96 border-t" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col px-[var(--page-x)] py-2" aria-label="Primary mobile">
          {navigation.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-border/60 py-3 text-sm text-muted-foreground transition-colors hover:text-gold"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="btn-gold mt-4 justify-center min-[420px]:hidden"
          >
            {brand.ctaPrimary}
          </a>
        </nav>
      </div>
    </header>
  );
}
