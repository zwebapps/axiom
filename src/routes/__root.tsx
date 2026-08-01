import { HeadContent, Outlet, Scripts, createRootRoute } from "@tanstack/react-router";

import { defaultSiteSeo } from "@/content/site-seo";
import appCss from "../styles.css?url";

const seo = defaultSiteSeo;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "description", content: seo.description },
      { name: "keywords", content: seo.keywords },
      { name: "robots", content: "index, follow" },
      { name: "theme-color", content: "#0a1628" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: seo.siteName },
      { property: "og:title", content: seo.title },
      { property: "og:description", content: seo.description },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: seo.twitterCard },
      { name: "twitter:title", content: seo.title },
      { name: "twitter:description", content: seo.description },
      { title: seo.title },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "canonical", href: "https://axiomvertexgroup.com/" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&display=swap",
      },
    ],
  }),
  component: RootDocument,
});

function RootDocument() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}
