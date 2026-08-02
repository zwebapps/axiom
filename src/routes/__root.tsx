import { HeadContent, Link, Outlet, Scripts, createRootRoute } from "@tanstack/react-router";

import { defaultSiteSeo } from "@/content/site-seo";
import appCss from "../styles.css?url";

const seo = defaultSiteSeo;

function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-navy px-6 text-center text-foreground">
      <p className="eyebrow text-gold">404</p>
      <h1 className="mt-4 font-display text-3xl font-light">Page not found</h1>
      <p className="mt-3 max-w-md text-sm text-muted-foreground">
        This site is a single page. Use the link below to return to the homepage.
      </p>
      <Link to="/" className="btn-gold mt-8 inline-flex">
        Back to home
      </Link>
    </main>
  );
}

export const Route = createRootRoute({
  notFoundComponent: NotFound,
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
