/**
 * Site copy — aligned to approved Axiom Vertex mockups (hero, markets, advisory,
 * industries, services, testimonials, contact, footer).
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
  heroEyebrow: "Business Consultancy & International Trade",
  heroHeadline: {
    line1: "Bridging Markets,",
    line2: "BUILDING GROWTH",
    line3: "Across Continents",
  },
  heroDescription:
    "Founded in Texas, we accelerate sustainable growth through strategy, execution and trusted partnerships across North America, the Middle East, and South Asia.",
  ctaPrimary: "Book a Strategy Call",
  ctaSecondary: "Explore Our Services",
  navCta: "Book a Call",
  heroContact: {
    phone: "+1 (214) 940-6338",
    phoneTel: "+12149406338",
    location: "Austin, Texas",
  },
} as const;

export const navigation = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Industries", href: "#industries" },
  { label: "About Us", href: "#about" },
  { label: "Insights", href: "#insights" },
  { label: "Contact", href: "#contact" },
] as const;

export const heroCorridorRegions = [
  { label: "Texas (USA)", dotColor: "#F8FAFC" },
  { label: "Dubai (UAE)", dotColor: "#63B3ED" },
  { label: "Pakistan", dotColor: "#94A3B8" },
  { label: "GCC Region", dotColor: "#22C55E" },
  { label: "South Asia", dotColor: "#F97316" },
] as const;

export const keyRegions = [
  { label: "North America", flagCodes: ["us"] as const },
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

/** Strategic client & partner ecosystem (display names). */
export const heroClientLogos = [
  "vertex-corp",
  "amana-petroleum",
  "indus-foundry",
  "meridian-capital",
  "arabian-trade",
  "pacific-freight",
] as const;

export const heroStats = [
  { value: "15+", label: "Years\nExperience" },
  { value: "$2B+", label: "Deals\nFacilitated" },
  { value: "40+", label: "Markets\nEntered" },
] as const;

export const trustedMarkets = {
  eyebrow: "Bilateral Growth Networks",
  subtitle: "Expanding horizons with high-integrity execution",
  title: "Trusted Across Strategic Markets",
  body: "We establish robust, institutional-grade commercial bridges between the world's most dynamic trading corridors.",
  stats: [
    {
      value: "15+",
      label: "Years",
      title: "Enterprise Experience",
      text: "Proven track record in high-stakes corporate execution.",
    },
    {
      value: "$2B+",
      label: "",
      title: "Deals Facilitated",
      text: "Accelerating value across multinational procurement streams.",
    },
    {
      value: "40+",
      label: "",
      title: "Markets Successfully Entered",
      text: "Seamless navigation of distinct jurisdictional mandates.",
    },
  ],
} as const;

export const whoWeAre = {
  eyebrow: "Executive Advisory",
  title: "Founded in Texas,\nOperating Globally",
  body: "Axiom Vertex Group accelerates commercial growth and simplifies international complexity. We provide corporate strategy, transactional security, and direct physical trade execution for companies intent on scaling across continents.",
  bodySecondary:
    "Our presence in Austin, Dubai, and key South Asian centers allows our clients to deploy capital with confidence, utilizing trusted direct networks rather than untested intermediaries.",
} as const;

export const executiveFeatures = [
  {
    title: "Texas Based",
    text: "Anchored in Austin, capturing Western capital discipline and strategic investment resources.",
  },
  {
    title: "Cross-border Growth",
    text: "Active corridors across North America, Middle East, and South Asian trade networks.",
  },
  {
    title: "Trusted Partnerships",
    text: "Vetted sovereign, institutional, and private distribution connections globally.",
  },
  {
    title: "Market Expansion",
    text: "Strategic execution blueprints that bypass common friction and local barrier points.",
  },
] as const;

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
  eyebrow: "Our Services & Mandates",
  title: "Dual-Engine Execution\nfor Global Scale",
  description:
    "Dual-engine execution combining institutional business strategy with high-volume physical distribution management.",
  cta: "Schedule Consult",
  ctaBanner: {
    title: "Ready to explore international expansion?",
    body: "Connect with our corporate advisors in Austin or Dubai.",
  },
  mandates: [
    {
      title: "Business Consultancy",
      text: "High-touch corporate strategy, strategic alliances, and organizational redesign focused on multi-market development.",
      bullets: [
        "Business Strategy",
        "Market Entry Advisory",
        "Growth Strategy",
        "Distribution Development",
        "Channel Transformation",
        "Commercial Excellence",
        "Strategic Partnerships",
        "Supply Chain Advisory",
        "Go-To-Market Execution",
        "Fractional Commercial Leadership",
      ],
    },
    {
      title: "International Trade",
      text: "Structured wholesale supply path management, cross-continental sourcing partnerships, and strict trade compliance frameworks.",
      bullets: [
        "International Procurement",
        "Import & Export Advisory",
        "Global Sourcing Networks",
        "Wholesale Distribution Routes",
      ],
    },
  ],
  items: [
    {
      title: "Business Consultancy",
      text: "High-touch corporate strategy, strategic alliances, and organizational redesign focused on multi-market development.",
    },
    {
      title: "International Trade",
      text: "Structured wholesale supply path management, cross-continental sourcing partnerships, and strict trade compliance frameworks.",
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
  eyebrow: "Targeted Jurisdictions",
  title: "Industries We Serve",
  description:
    "Delivering hyper-focused consultancy and structured international sourcing across core industrial segments.",
  cta: "View All Industries",
  items: [
    {
      title: "Healthcare",
      text: "Strategic cross-border medical supply chains & institutional trade consultancy.",
    },
    {
      title: "Energy",
      text: "Facilitating sustainable transition assets & traditional resource logistics.",
    },
    {
      title: "Manufacturing",
      text: "Direct channel optimization and industrial machinery sourcing routes.",
    },
    {
      title: "Technology",
      text: "North American market expansion paths for enterprise hardware & software.",
    },
    {
      title: "Retail",
      text: "Wholesale network design and high-volume distribution strategies.",
    },
    {
      title: "Government",
      text: "Bilateral trade advisory and sovereign infrastructure execution frameworks.",
    },
    {
      title: "Consumer Goods",
      text: "Connecting fast-moving product brands to global distribution channels.",
    },
    {
      title: "Industrial",
      text: "Heavy industry components procurement & supply chain optimization.",
    },
  ],
} as const;

export const whyChoose = {
  eyebrow: "Uncompromising Excellence",
  subtitle: "Designed for scale, engineered for absolute execution",
  title: "Why Leading Enterprises Choose Axiom",
  body: "We merge rigorous corporate strategy with physical trade execution, establishing trusted distribution channels across global borders.",
  items: [
    {
      title: "Cross-border expertise",
      text: "Decades of navigating jurisdictional trade compliance, bilateral treaties, and multi-market financial regulations.",
    },
    {
      title: "Texas headquarters",
      text: "Anchored in Austin's high-growth capital ecosystem, bridging Western market discipline with international networks.",
    },
    {
      title: "Middle East specialization",
      text: "Direct sovereign execution corridors and deep strategic alliances throughout the GCC region.",
    },
    {
      title: "End-to-end execution",
      text: "We don't just advise; we handle complex transactions, logistics infrastructure, and secure trade verification.",
    },
    {
      title: "Strategic partnerships",
      text: "Direct connectivity to institutional investors, national developers, and private family offices.",
    },
    {
      title: "International network",
      text: "Active commercial bridges across North America, the Middle East, and key South Asian centers.",
    },
    {
      title: "Market intelligence",
      text: "Deploying proprietary supply-chain data, local customs insights, and granular regulatory intelligence.",
    },
    {
      title: "Long-term growth focus",
      text: "Structuring durable asset portfolios and business distribution routes to survive shifting cycles.",
    },
  ],
} as const;

export const insights = {
  eyebrow: "Enterprise Success",
  subtitle: "Validated through institutional performance",
  title: "Trusted by Strategic Operators",
  posts: [
    {
      tag: "Meridian Capital",
      title: "Marcus Vance, VP of Operations",
      excerpt:
        "Axiom's deep strategic alignment and direct corridors through Dubai allowed us to bypass common regulatory friction completely.",
      locale: "USA",
    },
    {
      tag: "Arabian Trade",
      title: "Tariq Al-Mansoori, Director of Sourcing",
      excerpt:
        "The dual-engine strategy of business consultancy paired with active logistical procurement simplified our entire expansion blueprint.",
      locale: "UAE",
    },
    {
      tag: "Indus Foundry",
      title: "Sanjay Gupta, Chief Executive",
      excerpt:
        "Establishing our manufacturing lines in South Asia required institutional trust. Axiom delivered with high-integrity execution.",
      locale: "Pakistan",
    },
  ],
} as const;

export const contact = {
  eyebrow: "Secure Strategic Advisory",
  title: "Ready to Expand\nBeyond Borders?",
  description:
    "Partner with Axiom Vertex Group to unlock strategic growth, navigate regulatory complexity, and establish trusted physical trade corridors across North America, the GCC, and South Asia.",
  email: "info@axiomvertexgroup.com",
  phone: "+1 (214) 940-6338",
  phoneTel: "+12149406338",
  phoneGlobalTrade: "+1 (469) 347-7739",
  phoneGlobalTradeTel: "+14693477739",
  hq: "Austin, Texas, USA",
  channels: [
    {
      icon: "phone" as const,
      label: "Advisory",
      value: "+1 (214) 940-6338",
      href: "tel:+12149406338",
    },
    {
      icon: "phone" as const,
      label: "Global trade",
      value: "+1 (469) 347-7739",
      href: "tel:+14693477739",
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
      title: "Cross-border Expertise",
      text: "Jurisdictional trade compliance and multi-market financial regulations.",
    },
    {
      title: "End-to-End Execution",
      text: "Complex transactions, logistics infrastructure, and secure trade verification.",
    },
    {
      title: "Strategic Partnerships",
      text: "Institutional investors, national developers, and private family offices.",
    },
    {
      title: "Market Intelligence",
      text: "Supply-chain data, customs insights, and regulatory intelligence.",
    },
  ],
  blurb:
    "Strategic business consultancy & international trade execution corridors. Delivering cross-border bilateral growth.",
  columns: [
    {
      title: "Company",
      links: ["About", "Services", "Industries", "Insights", "Contact"],
    },
    {
      title: "Business Consultancy",
      links: [
        "Business Strategy",
        "Growth Strategy",
        "Go-To-Market",
        "Executive Advisory",
      ],
    },
    {
      title: "International Trade",
      links: ["Import & Export", "Global Sourcing", "Distribution", "Wholesale Trade"],
    },
    {
      title: "Contact",
      links: [
        "Austin, Texas, USA",
        "Advisory: +1 (214) 940-6338",
        "Global Trade: +1 (469) 347-7739",
      ],
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
