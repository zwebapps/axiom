"use client";

import { useLayoutEffect } from "react";

import { useSiteContent } from "@/context/SiteContentProvider";

function upsertMeta(
  attribute: "name" | "property",
  key: string,
  content: string,
) {
  const selector = `meta[${attribute}="${key}"]`;
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attribute, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

function upsertJsonLd(id: string, data: Record<string, unknown>) {
  let el = document.head.querySelector<HTMLScriptElement>(`script[data-seo-id="${id}"]`);
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.dataset.seoId = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

export function SiteSeo() {
  const { content } = useSiteContent();
  const seo = content.seo;

  useLayoutEffect(() => {
    const origin =
      typeof window !== "undefined" ? window.location.origin : "https://axiomvertexgroup.com";
    const url = `${origin}/`;
    const ogImage = seo.ogImage.startsWith("http") ? seo.ogImage : `${origin}${seo.ogImage}`;

    document.title = seo.title;

    upsertMeta("name", "description", seo.description);
    upsertMeta("name", "keywords", seo.keywords);
    upsertMeta("name", "robots", "index, follow");
    upsertMeta("name", "author", content.brand.name);

    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:site_name", seo.siteName);
    upsertMeta("property", "og:title", seo.title);
    upsertMeta("property", "og:description", seo.description);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:image", ogImage);
    upsertMeta("property", "og:locale", "en_US");

    upsertMeta("name", "twitter:card", seo.twitterCard);
    upsertMeta("name", "twitter:title", seo.title);
    upsertMeta("name", "twitter:description", seo.description);
    upsertMeta("name", "twitter:image", ogImage);

    upsertLink("canonical", url);

    upsertJsonLd("organization", {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: content.brand.name,
      description: seo.description,
      url,
      logo: ogImage,
      email: content.contact.email,
      telephone: content.contact.phoneTel,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Austin",
        addressRegion: "TX",
        addressCountry: "US",
      },
      sameAs: [],
    });

    upsertJsonLd("website", {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: content.brand.name,
      url,
      description: seo.description,
      publisher: {
        "@type": "Organization",
        name: content.brand.name,
      },
    });
  }, [content.brand.name, content.contact.email, content.contact.phoneTel, seo]);

  return null;
}
