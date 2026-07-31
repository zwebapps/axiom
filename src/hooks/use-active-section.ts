import { useEffect, useState } from "react";

/**
 * Tracks which section id is currently dominant in the viewport so the nav
 * can highlight it. Uses IntersectionObserver rather than a scroll handler
 * so it costs nothing on the main thread while idle.
 *
 * Ids that don't exist in the DOM (e.g. a section rendered only at one
 * breakpoint) are simply never reported as active.
 */
export function useActiveSection(ids: readonly string[], fallback = "") {
  const [active, setActive] = useState(fallback);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    // Track ratios for every observed section and pick the largest, so
    // passing a boundary doesn't flicker between two neighbours.
    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }

        let bestId = "";
        let bestRatio = 0;
        for (const [id, ratio] of ratios) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }

        if (bestId) setActive(bestId);
      },
      {
        // Discount the fixed navbar so a section counts as active only once
        // it's genuinely in the readable area.
        rootMargin: "-20% 0px -35% 0px",
        threshold: [0, 0.15, 0.3, 0.5, 0.75, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
