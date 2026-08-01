"use client";

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { legacyContent, modernClassicContent, modernContent } from "@/content/site";
import type { ContentVersion, SiteContent } from "@/content/site-content.types";

const STORAGE_KEY = "axiom-content-version";

type SiteContentContextValue = {
  version: ContentVersion;
  content: SiteContent;
  setVersion: (version: ContentVersion) => void;
  toggleVersion: () => void;
};

const SiteContentContext = createContext<SiteContentContextValue | null>(null);

function readStoredVersion(): ContentVersion {
  if (typeof window === "undefined") return "modern";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "legacy" || stored === "modernClassic") return stored;
  return "modern";
}

function bundleFor(version: ContentVersion): SiteContent {
  if (version === "legacy") return legacyContent;
  if (version === "modernClassic") return modernClassicContent;
  return modernContent;
}

import { CONTENT_VERSION_ORDER } from "@/content/content-version-meta";

const VERSION_CYCLE = CONTENT_VERSION_ORDER;

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [version, setVersionState] = useState<ContentVersion>("modern");

  useLayoutEffect(() => {
    setVersionState(readStoredVersion());
  }, []);

  const setVersion = useCallback((next: ContentVersion) => {
    setVersionState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const toggleVersion = useCallback(() => {
    setVersionState((prev) => {
      const i = VERSION_CYCLE.indexOf(prev);
      const next = VERSION_CYCLE[(i + 1) % VERSION_CYCLE.length] ?? "modern";
      window.localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  const content = useMemo(() => bundleFor(version), [version]);

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.classList.remove("theme-modern", "theme-legacy");
    root.classList.add(content.themeRootClass);
  }, [content.themeRootClass]);

  const value = useMemo(
    () => ({ version, content, setVersion, toggleVersion }),
    [version, content, setVersion, toggleVersion],
  );

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent() {
  const ctx = useContext(SiteContentContext);
  if (!ctx) {
    throw new Error("useSiteContent must be used within SiteContentProvider");
  }
  return ctx;
}
