/** Resolve in-page anchors for footer labels (avoids dead `#home` fallbacks). */

const LABEL_HREF: Record<string, string> = {
  About: "#about",
  "About Us": "#about",
  Services: "#services",
  Industries: "#industries",
  Insights: "#insights",
  Contact: "#contact",
  Careers: "#contact",
  America: "#global",
  "GCC Region": "#global",
  "South Asia": "#global",
  Africa: "#global",
  Europe: "#global",
  "North America": "#global",
  Consultancy: "#services",
  "International Trade": "#services",
  "Market Entry": "#services",
  Advisory: "#services",
};

const SERVICE_COLUMN_TITLES = new Set([
  "Services",
  "Business Consultancy",
  "International Trade",
]);

export function footerLinkHref(columnTitle: string, label: string): string | undefined {
  if (columnTitle === "Contact") return undefined;

  const mapped = LABEL_HREF[label];
  if (mapped) return mapped;

  if (SERVICE_COLUMN_TITLES.has(columnTitle)) return "#services";

  if (columnTitle === "Regions") return "#global";

  return undefined;
}
