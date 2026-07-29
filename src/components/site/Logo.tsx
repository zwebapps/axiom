export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <svg
        viewBox="0 0 48 44"
        aria-hidden="true"
        className="h-9 w-10 shrink-0"
        fill="none"
      >
        <defs>
          <linearGradient id="axiom-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.66 0.12 74)" />
            <stop offset="50%" stopColor="oklch(0.9 0.08 86)" />
            <stop offset="100%" stopColor="oklch(0.66 0.12 74)" />
          </linearGradient>
        </defs>
        <path d="M24 2 46 42H34L24 20 14 42H2L24 2Z" fill="url(#axiom-gold)" />
        <path d="M24 24 32 42H16L24 24Z" fill="oklch(0.16 0.032 258)" />
      </svg>
      <div className="leading-none">
        <div className="font-display text-xl tracking-[0.14em] text-foreground">
          AXIOM <span className="text-gold">VERTEX</span>
        </div>
        {!compact && (
          <div className="mt-1 text-[9px] tracking-[0.55em] text-muted-foreground">
            GROUP
          </div>
        )}
      </div>
    </div>
  );
}
