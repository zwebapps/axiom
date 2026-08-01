/** Original + older content: pre-mockup copy with classic `theme-legacy`. */
import type { SiteContent } from "./site-content.types";
import * as raw from "./legacy-site.raw";
import { buildSeo } from "./site-seo";

const legacyIndustries: SiteContent["industries"]["items"] = raw.industries.items.map(
  (title) => ({
    title,
    text: "",
  }),
);

export const legacyContent: SiteContent = {
  version: "legacy",
  themeRootClass: "theme-legacy",
  seo: buildSeo({
    title: "Axiom Vertex Group | Building Businesses. Creating Value.",
    description:
      "Axiom Vertex Group partners with ambitious organizations to transform opportunities into sustainable growth across global markets — consultancy, trade, and advisory worldwide.",
    keywords:
      "Axiom Vertex Group, global business consultancy, international trade, market entry, supply chain, investment advisory, GCC, global presence",
  }),
  brand: {
    name: raw.brand.name,
    tagline: raw.brand.tagline,
    heroEyebrow: raw.brand.heroEyebrow,
    heroHeadline: {
      line1: "Building Businesses.",
      line2: "Creating Value.",
      line3: "Across Continents.",
      line3Accent: true,
    },
    heroDescription: raw.brand.heroDescription,
    ctaPrimary: raw.brand.ctaPrimary,
    ctaSecondary: raw.brand.ctaSecondary,
    ctaSecondaryHref: "#global",
    navCta: raw.brand.ctaPrimary,
    heroEyebrowBadge: false,
  },
  navigation: raw.navigation,
  heroCorridorRegions: raw.heroCorridorRegions,
  keyRegions: raw.keyRegions,
  heroClientLogos: raw.heroClientLogos,
  heroStats: raw.heroStats,
  heroStatsColumns: 4,
  whoWeAre: raw.whoWeAre,
  about: raw.about,
  services: {
    eyebrow: raw.services.eyebrow,
    title: raw.services.title,
    cta: raw.services.cta,
    items: raw.services.items,
  },
  globalIntro: {
    eyebrow: raw.globalPresence.eyebrow,
    title: raw.globalPresence.title,
  },
  globalPresence: raw.globalPresence,
  industries: {
    eyebrow: raw.industries.eyebrow,
    title: raw.industries.title,
    cta: raw.industries.cta,
    items: legacyIndustries,
  },
  insights: {
    eyebrow: raw.insights.eyebrow,
    title: raw.insights.title,
    posts: raw.insights.posts,
  },
  contact: raw.contact,
  footer: {
    pillars: raw.footer.pillars,
    blurb: raw.footer.blurb,
    columns: raw.footer.columns,
    regionsInlineAfricaEurope: true,
    gridColumns: 3,
  },
};
