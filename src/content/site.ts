/**
 * Content source: Figma prototype "Vertex group - Tech Miracle"
 * @see https://www.figma.com/proto/ZsNnKg31gMuWGz8nzQZg6F/Vertex-group---Tech-Miracle?node-id=2010-1223
 *
 * Copy and structure aligned to frame node 2010-1223 and the approved brand mockup.
 */

export const figmaSource = {
  file: "Vertex-group---Tech-Miracle",
  fileKey: "ZsNnKg31gMuWGz8nzQZg6F",
  prototypeNodeId: "2010-1223",
  prototypeUrl:
    "https://www.figma.com/proto/ZsNnKg31gMuWGz8nzQZg6F/Vertex-group---Tech-Miracle?node-id=2010-1223",
} as const;

export const brand = {
  name: "Axiom Vertex Group",
  tagline: "Strategic Business Consultancy & International Trade",
  headline: "Building Businesses. Creating Value. Across Continents.",
  headlineAccent: "Across Continents.",
  heroEyebrow: "Global business. Limitless opportunities.",
  heroDescription:
    "Axiom Vertex Group partners with ambitious organizations to transform opportunities into sustainable growth across global markets.",
  ctaPrimary: "Book Strategy Session",
  ctaSecondary: "Explore Global Presence",
} as const;

export const navigation = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Industries", href: "#industries" },
  { label: "Global Presence", href: "#global" },
  { label: "Insights", href: "#insights" },
  { label: "Contact", href: "#contact" },
] as const;

/** Hero “Active global corridors” — regional hubs (colored dots). */
export const heroCorridorRegions = [
  { label: "USA", dotColor: "#3B82F6" },
  { label: "Europe", dotColor: "#EAB308" },
  { label: "GCC Region", dotColor: "#22C55E" },
  { label: "South Asia", dotColor: "#F97316" },
  { label: "Africa", dotColor: "#A855F7" },
] as const;

/** Key regions with flag codes (ISO 3166-1 alpha-2). */
export const keyRegions = [
  { label: "America", flagCodes: ["us"] as const },
  {
    label: "GCC Region",
    flagCodes: ["ae", "sa", "qa", "om"] as const,
  },
  { label: "South Asia", flagCodes: ["pk", "in"] as const },
  { label: "Africa", flagCodes: ["za", "ng", "eg"] as const },
  {
    label: "Europe",
    flagCodes: ["eu", "de", "fr", "es", "pt"] as const,
  },
] as const;

export const heroClientLogos = [
  "siemens",
  "dpworld",
  "standard-chartered",
  "aramco",
  "emaar",
  "ericsson",
  "unilever",
  "pepsico",
] as const;

export const heroStats = [
  { value: "15+", label: "Years of\nExcellence" },
  { value: "$2B+", label: "Deals\nFacilitated" },
  { value: "40+", label: "Markets\nWorldwide" },
  { value: "100+", label: "Strategic\nPartners" },
] as const;

export const trustLogos = [
  "SIEMENS",
  "EMAAR",
  "DP WORLD",
  "Standard Chartered",
  "OSG",
] as const;

export const whoWeAre = {
  eyebrow: "Who We Are",
  title: "Trusted Advisors.\nGlobal Impact.",
  body: "Axiom Vertex Group is a global advisory and trade facilitation firm helping organizations and governments navigate complex markets, enter new territories and achieve sustained competitive advantage.",
} as const;

export const about = {
  eyebrow: "About Us",
  title: "Connecting Opportunities.\nDelivering Results.",
  body: "With decades of combined experience, we operate at the intersection of business strategy, international trade and investment advisory.",
  points: [
    "Global Expertise",
    "Client-Centric Approach",
    "Integrity & Confidentiality",
    "Results Driven",
  ],
  figures: [
    { value: "15+", label: "Years of Excellence" },
    { value: "40+", label: "Markets Worldwide" },
    { value: "$2B+", label: "Deals Facilitated" },
  ],
  missionTitle: "Our Mission",
  missionBody:
    "To unlock business potential and create sustainable prosperity across global markets.",
  link: "Learn more about us",
} as const;

export const services = {
  eyebrow: "Our Services",
  title: "Comprehensive Solutions\nfor Your Growth",
  cta: "Explore All Services",
  items: [
    {
      title: "Business Consultancy",
      text: "Strategic guidance to optimize performance and drive sustainable growth.",
    },
    {
      title: "International Trade",
      text: "End-to-end trade facilitation services across global markets.",
    },
    {
      title: "Market Entry",
      text: "Helping businesses enter new markets with confidence and clarity.",
    },
    {
      title: "Supply Chain Solutions",
      text: "Streamline operations and enhance supply chain resilience.",
    },
    {
      title: "Investment Advisory",
      text: "Identifying and structuring high-impact investment opportunities.",
    },
    {
      title: "Government & Institutional",
      text: "Advisory for governments and institutions on economic development.",
    },
  ],
} as const;

export const globalPresence = {
  eyebrow: "Global Presence",
  title: "Operating in 40+ Markets\nWorldwide",
  regionsTitle: "Our Key Regions",
  regions: keyRegions.map((r) => r.label),
  figures: [
    { value: "40+", label: "Markets" },
    { value: "5", label: "Regions" },
    { value: "100+", label: "Partners" },
    { value: "24/7", label: "Global Support" },
  ],
} as const;

export const industries = {
  eyebrow: "Our Industries",
  title: "Industries We Serve",
  cta: "View All Industries",
  items: [
    "Healthcare",
    "Energy",
    "Manufacturing",
    "Infrastructure",
    "Government",
    "Consumer Goods",
    "Technology",
  ],
} as const;

export const insights = {
  eyebrow: "Insights",
  title: "Perspectives for\nGlobal Decision Makers",
  posts: [
    {
      tag: "Market Outlook",
      title: "GCC trade corridors in 2026",
      excerpt:
        "Where capital, logistics, and policy are aligning for cross-border growth.",
    },
    {
      tag: "Sector Brief",
      title: "Energy transition partnerships",
      excerpt:
        "Structuring joint ventures across infrastructure and export markets.",
    },
    {
      tag: "Advisory",
      title: "Entering regulated markets",
      excerpt:
        "A practical framework for compliance, partners, and local execution.",
    },
  ],
} as const;

export const contact = {
  eyebrow: "Get in touch",
  title: "Schedule a\nConsultation",
  description:
    "Empower your enterprise to expand, optimize trading routes, and secure cross-border partnerships with our dedicated executive advisors.",
  email: "info@axiomvertexgroup.com",
  phone: "+1 (214) 940-6338",
  phoneTel: "+12149406338",
  hq: "Austin, Texas, USA",
  channels: [
    {
      icon: "phone" as const,
      label: "Inquiries hotline",
      value: "+1 (214) 940-6338",
      href: "tel:+12149406338",
    },
    {
      icon: "mail" as const,
      label: "Corporate email",
      value: "info@axiomvertexgroup.com",
      href: "mailto:info@axiomvertexgroup.com",
    },
    {
      icon: "globe" as const,
      label: "Primary HQ office",
      value: "Austin, Texas, USA",
    },
  ],
  form: {
    title: "Request a Strategy Session",
    subtitle: "Direct route to our regional directors. No templates, no bots.",
  },
  footnote: "This opens your email app and sends to info@axiomvertexgroup.com.",
  labels: {
    name: "Your name",
    email: "Company email",
    message: "Primary goal",
  },
  placeholders: {
    name: "E.g., Alexander Mercer",
    email: "E.g., alex@enterprise.com",
    message: "E.g., International trade expansion",
  },
  submit: "Book a Consultation",
  successTitle: "Your email app should open",
  successBody:
    "If it did not open automatically, send your message directly to info@axiomvertexgroup.com.",
  errors: {
    name: "Please enter your name.",
    email: "Please enter a valid email address.",
    message: "Please describe your primary goal.",
  },
} as const;

export const footer = {
  pillars: [
    {
      title: "Global Network",
      text: "Extensive connections across key markets.",
    },
    {
      title: "Strategic Partnership",
      text: "Collaborative approach for mutual success.",
    },
    {
      title: "Proven Track Record",
      text: "Delivering measurable results for clients.",
    },
    {
      title: "Agile & Innovative",
      text: "Innovative solutions for dynamic markets.",
    },
  ],
  blurb:
    "Strategic business consultancy and international trade advisory building value across continents.",
  columns: [
    { title: "Company", links: ["About Us", "Insights", "Careers", "Contact"] },
    {
      title: "Services",
      links: ["Consultancy", "International Trade", "Market Entry", "Advisory"],
    },
    {
      title: "Regions",
      links: ["America", "GCC Region", "South Asia", "Africa", "Europe"],
    },
  ],
} as const;

export const logos = {
  mark: "/brand/axiom-logo-mark.png",
  hub: "/brand/axiom-logo-hub.png",
  full: "/brand/axiom-logo-full.png",
  fullAlt: "/brand/axiom-logo-full-alt.png",
  header: "/brand/axiom-logo-header.png",
} as const;
