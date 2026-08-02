"use client";

import {
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  type ReactNode,
} from "react";

import { modernClassicContent } from "@/content/site";
import type { ContentVersion, SiteContent } from "@/content/site-content.types";

/** Production site: classic styling + updated copy only (no theme switcher). */
export const ACTIVE_CONTENT_VERSION: ContentVersion = "modernClassic";

type SiteContentContextValue = {
  version: ContentVersion;
  content: SiteContent;
};

const SiteContentContext = createContext<SiteContentContextValue | null>(null);

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const content = modernClassicContent;
  const version = ACTIVE_CONTENT_VERSION;

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.classList.remove("theme-modern", "theme-legacy");
    root.classList.add(content.themeRootClass);
  }, [content.themeRootClass]);

  const value = useMemo(() => ({ version, content }), [content, version]);

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent() {
  const ctx = useContext(SiteContentContext);
  if (!ctx) {
    throw new Error("useSiteContent must be used within SiteContentProvider");
  }
  return ctx;
}
