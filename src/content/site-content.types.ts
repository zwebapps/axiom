export type ContentVersion = "legacy" | "modern" | "modernClassic";

export type SiteSeo = {
  title: string;
  description: string;
  keywords: string;
  siteName: string;
  ogImage: string;
  twitterCard: "summary" | "summary_large_image";
};

export type HeroHeadline = {
  line1: string;
  line2: string;
  line3: string;
  line3Accent?: boolean;
};

export type IndustryItem = {
  title: string;
  text: string;
};

export type SiteContent = {
  version: ContentVersion;
  themeRootClass: "theme-legacy" | "theme-modern";
  seo: SiteSeo;
  brand: {
    name: string;
    tagline: string;
    heroEyebrow: string;
    heroHeadline: HeroHeadline;
    heroDescription: string;
    ctaPrimary: string;
    ctaSecondary: string;
    ctaSecondaryHref: string;
    navCta: string;
    heroEyebrowBadge: boolean;
  };
  navigation: readonly { label: string; href: string }[];
  heroCorridorRegions: readonly { label: string; dotColor: string }[];
  keyRegions: readonly {
    label: string;
    flagCodes: readonly string[];
  }[];
  heroClientLogos: readonly string[];
  heroStats: readonly { value: string; label: string }[];
  heroStatsColumns: 3 | 4;
  whoWeAre: {
    eyebrow: string;
    title: string;
    body: string;
    bodySecondary?: string;
  };
  about: {
    eyebrow: string;
    title: string;
    body: string;
    points: readonly string[];
    figures: readonly { value: string; label: string }[];
    missionTitle: string;
    missionBody: string;
    link: string;
  };
  services: {
    eyebrow: string;
    title: string;
    description?: string;
    cta: string;
    items: readonly { title: string; text: string }[];
  };
  globalIntro: {
    eyebrow: string;
    title: string;
    description?: string;
  };
  globalPresence: {
    eyebrow: string;
    title: string;
    regionsTitle: string;
    regions: readonly string[];
    figures: readonly { value: string; label: string }[];
  };
  industries: {
    eyebrow: string;
    title: string;
    description?: string;
    cta: string;
    items: readonly IndustryItem[];
  };
  insights: {
    eyebrow: string;
    subtitle?: string;
    title: string;
    posts: readonly {
      tag: string;
      title: string;
      excerpt: string;
      locale?: string;
    }[];
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    email: string;
    phone: string;
    phoneTel: string;
    phoneGlobalTrade?: string;
    phoneGlobalTradeTel?: string;
    hq: string;
    channels: readonly {
      icon: "phone" | "mail" | "globe";
      label: string;
      value: string;
      href?: string;
    }[];
    form: { title: string; subtitle: string };
    footnote: string;
    labels: { name: string; email: string; message: string };
    placeholders: { name: string; email: string; message: string };
    submit: string;
    successTitle: string;
    successBody: string;
    errors: { name: string; email: string; message: string };
  };
  footer: {
    pillars: readonly { title: string; text: string }[];
    blurb: string;
    columns: readonly { title: string; links: readonly string[] }[];
    regionsInlineAfricaEurope?: boolean;
    gridColumns: 3 | 4;
  };
};
