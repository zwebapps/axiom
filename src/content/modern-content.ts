/** New content + styling: mockup copy with `theme-modern`. */
import type { SiteContent } from "./site-content.types";
import { buildSeo } from "./site-seo";
import {
  about,
  brand,
  contact,
  footer,
  globalPresence,
  heroClientLogos,
  heroCorridorRegions,
  heroStats,
  industries,
  insights,
  keyRegions,
  navigation,
  services,
  trustedMarkets,
  whoWeAre,
} from "./modern-site";

export const modernContent: SiteContent = {
  version: "modern",
  themeRootClass: "theme-modern",
  seo: buildSeo({
    title: "Axiom Vertex Group | Bridging Markets, Building Growth",
    description:
      "Founded in Texas, Axiom Vertex Group delivers strategic consultancy and international trade across North America, the Middle East, and South Asia — strategy, execution, and trusted partnerships.",
    keywords:
      "Axiom Vertex Group, business consultancy, international trade, Texas, GCC, South Asia, market entry, global sourcing, strategic partnerships",
  }),
  brand: {
    name: brand.name,
    tagline: brand.tagline,
    heroEyebrow: brand.heroEyebrow,
    heroHeadline: {
      line1: brand.heroHeadline.line1,
      line2: brand.heroHeadline.line2,
      line3: brand.heroHeadline.line3,
      line3Accent: true,
    },
    heroDescription: brand.heroDescription,
    ctaPrimary: brand.ctaPrimary,
    ctaSecondary: brand.ctaSecondary,
    ctaSecondaryHref: "#services",
    navCta: brand.navCta,
    heroEyebrowBadge: true,
  },
  navigation,
  heroCorridorRegions,
  keyRegions,
  heroClientLogos,
  heroStats,
  heroStatsColumns: 3,
  whoWeAre,
  about,
  services: {
    eyebrow: services.eyebrow,
    title: services.title,
    description: services.description,
    cta: services.cta,
    items: services.items,
  },
  globalIntro: {
    eyebrow: trustedMarkets.eyebrow,
    title: trustedMarkets.title,
    description: trustedMarkets.body,
  },
  globalPresence,
  industries: {
    eyebrow: industries.eyebrow,
    title: industries.title,
    description: industries.description,
    cta: industries.cta,
    items: industries.items,
  },
  insights: {
    eyebrow: insights.eyebrow,
    subtitle: insights.subtitle,
    title: insights.title,
    posts: insights.posts,
  },
  contact,
  footer: {
    pillars: footer.pillars,
    blurb: footer.blurb,
    columns: footer.columns,
    regionsInlineAfricaEurope: false,
    gridColumns: 4,
  },
};
