import type { SiteSeo } from "./site-content.types";

const SITE_NAME = "Axiom Vertex Group";
const DEFAULT_OG_IMAGE = "/brand/axiom-logo-full.png";

type SeoInput = {
  title: string;
  description: string;
  keywords: string;
  ogImage?: string;
};

export function buildSeo(input: SeoInput): SiteSeo {
  return {
    title: input.title,
    description: input.description,
    keywords: input.keywords,
    siteName: SITE_NAME,
    ogImage: input.ogImage ?? DEFAULT_OG_IMAGE,
    twitterCard: "summary_large_image",
  };
}

export const defaultSiteSeo = buildSeo({
  title: "Axiom Vertex Group | Strategic Consultancy & International Trade",
  description:
    "Axiom Vertex Group partners with ambitious organizations for sustainable growth across global markets — strategy, trade execution, and trusted partnerships.",
  keywords:
    "Axiom Vertex Group, business consultancy, international trade, global markets, strategy, market entry",
});
