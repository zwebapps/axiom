import type { SiteContent } from "./site-content.types";
import * as legacyRaw from "./legacy-site.raw";
import { modernContent } from "./modern-content";
import { buildSeo } from "./site-seo";

const keyRegionsNoEurope = legacyRaw.keyRegions.filter((r) => r.label !== "Europe");
const heroCorridorRegionsNoEurope = legacyRaw.heroCorridorRegions.filter(
  (r) => r.label !== "Europe",
);

/**
 * Classic style + new content: mockup copy, `theme-legacy`, enterprise hero logos.
 */
export const modernClassicContent: SiteContent = {
  ...modernContent,
  version: "modernClassic",
  themeRootClass: "theme-legacy",
  brand: {
    ...modernContent.brand,
    heroEyebrowBadge: false,
  },
  heroCorridorRegions: heroCorridorRegionsNoEurope,
  keyRegions: keyRegionsNoEurope,
  globalPresence: {
    ...modernContent.globalPresence,
    regions: keyRegionsNoEurope.map((r) => r.label),
    figures: modernContent.globalPresence.figures.map((f) =>
      f.label === "Regions" ? { ...f, value: String(keyRegionsNoEurope.length) } : f,
    ),
  },
  heroClientLogos: legacyRaw.heroClientLogos,
  seo: buildSeo({
    title: "Axiom Vertex Group | Strategic Trade & Consultancy (Classic)",
    description:
      "Updated Axiom Vertex positioning with classic presentation: enterprise partnerships, cross-border trade corridors, and consultancy from Texas across the GCC, South Asia, and beyond.",
    keywords:
      "Axiom Vertex Group, Siemens, Aramco, international trade, business consultancy, enterprise partnerships, GCC corridors, Austin Texas",
  }),
};
