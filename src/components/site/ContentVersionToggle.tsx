"use client";

import { CONTENT_VERSION_META } from "@/content/content-version-meta";
import type { ContentVersion } from "@/content/site-content.types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSiteContent } from "@/context/SiteContentProvider";

const DOT_CLASS: Record<ContentVersion, string> = {
  modern: "bg-accent-sky",
  modernClassic: "bg-gold",
  legacy: "bg-muted-foreground",
};

export function ContentVersionToggle() {
  const { version, toggleVersion } = useSiteContent();
  const active = CONTENT_VERSION_META[version];

  return (
    <TooltipProvider delayDuration={200}>
      <div
        className="pointer-events-none fixed right-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-[100] sm:right-5 sm:bottom-[max(1rem,env(safe-area-inset-bottom))]"
        aria-live="polite"
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={toggleVersion}
              title={active.tooltip}
              className="pointer-events-auto inline-flex h-8 min-h-[44px] min-w-[44px] items-center justify-center gap-1.5 rounded-full border border-border/90 bg-navy-deep/95 px-2.5 text-[10px] font-medium tracking-wide text-foreground shadow-[0_8px_28px_-8px_oklch(0.05_0_0/75%)] backdrop-blur-md transition-colors duration-300 hover:border-gold/45 hover:text-gold focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:outline-none sm:h-7 sm:min-h-0 sm:min-w-0 sm:px-2.5 sm:text-[10px]"
              aria-label={`Preview: ${active.label}. ${active.content}. ${active.styling}. Activate to switch.`}
            >
              <span
                className={`h-1.5 w-1.5 shrink-0 rounded-full ${DOT_CLASS[version]}`}
                aria-hidden
              />
              <span className="truncate">{active.shortName}</span>
            </button>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            align="end"
            sideOffset={8}
            className="z-[110] max-w-[min(16rem,calc(100vw-2rem))] border border-border bg-navy-deep px-2.5 py-2 text-[11px] leading-snug font-normal text-foreground shadow-lg"
          >
            <p className="font-medium text-gold">{active.label}</p>
            <p className="mt-1 text-muted-foreground">
              {active.content} · {active.styling}
            </p>
            <p className="mt-1.5 text-[10px] text-muted-foreground/90">Click to cycle preview</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
