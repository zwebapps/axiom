import type { ContentVersion } from "./site-content.types";

/** Human-readable meaning of each preview mode (content bundle × visual theme). */
export const CONTENT_VERSION_META: Record<
  ContentVersion,
  {
    shortName: string;
    label: string;
    subtitle: string;
    content: string;
    styling: string;
    tooltip: string;
  }
> = {
  modern: {
    shortName: "New",
    label: "New content + styling",
    subtitle: "Updated copy · mockup look",
    content: "New (mockup) content",
    styling: "New styling (sky accents, partner strip)",
    tooltip:
      "New content + styling — updated mockup copy with the new sky-accent theme. Tap to switch preview.",
  },
  modernClassic: {
    shortName: "Classic",
    label: "Classic style + new content",
    subtitle: "Updated copy · original gold look",
    content: "New (mockup) content",
    styling: "Classic styling (gold theme, enterprise logos)",
    tooltip:
      "Classic style + new content — updated mockup copy with the original gold theme and enterprise logos. Tap to switch preview.",
  },
  legacy: {
    shortName: "Original",
    label: "Original + older content",
    subtitle: "Previous copy · classic look",
    content: "Older (original) content",
    styling: "Classic styling (gold theme, enterprise logos)",
    tooltip:
      "Original + older content — previous site copy with classic styling. Tap to switch preview.",
  },
};

export const CONTENT_VERSION_ORDER: ContentVersion[] = ["modern", "modernClassic", "legacy"];
