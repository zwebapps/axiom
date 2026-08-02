# Axiom Vertex Group (Demo Theme)

Corporate marketing site built with **TanStack Start**, **React 19**, **TypeScript**, and **Tailwind CSS v4**. Brand colors and typography: [docs/THEME.md](docs/THEME.md). Figma copy source: [docs/FIGMA.md](docs/FIGMA.md) · content bundles in [`src/content/`](src/content/).

## Getting started

```bash
npm install
npm run dev
```

Open the URL printed in the terminal (default [http://localhost:3000](http://localhost:3000)).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server (TanStack Start) |
| `npm run build` | Production build (Cloudflare / TanStack Start) |
| `npm run build:static` | **Static HTML** for shared hosting → `static-html/` |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |

## Static HTML (shared hosting)

Use this when you deploy on **cPanel, Apache, or any static host** (no Node.js).

### Step 1 — Build

From the project root:

```bash
npm run build:static
```

This creates the **`static-html/`** folder with:

- `index.html` — single-page app (relative `./assets/` paths)
- `assets/` — bundled JS, CSS, and images
- `brand/`, `hero/`, `favicon.png`, `robots.txt`, `sitemap.xml`, etc. (from `public/`)
- `.htaccess` — optional Apache rules
- `README.md` — short deploy notes (copy of [`static-hosting/README.md`](static-hosting/README.md))

`static-html/` is gitignored; run the build before each upload.

### Step 2 — Test locally (do not double-click index.html)

Browsers block the app when you open `index.html` from disk (`file://`). Use:

```bash
npm run preview:static
```

Then open the URL shown (e.g. `http://localhost:4173`).

### Step 3 — Upload

Upload **everything inside `static-html/`** to your host document root (e.g. `public_html`).

**Important:** Deploy **`static-html/index.html`** plus the **`assets/`** folder and all of `public/` (brand, hero, etc.). Do **not** upload `static-hosting/index.html` alone — that file is only a build template.

### Step 4 — Apache (optional)

If `.htaccess` causes a **500 error**, delete it on the server. This site is one page with `#` section links and does not need rewrites.

### Subfolder deploy

If the site lives at `https://yourdomain.com/subfolder/`:

```bash
STATIC_BASE=/subfolder/ npm run build:static
```

Then upload the contents of `static-html/` into that subfolder.

### Theme

The live site uses **classic styling with updated copy** only. The preview toggle has been removed.

### Source for static build

| Path | Role |
|------|------|
| [`static-hosting/index.html`](static-hosting/index.html) | HTML shell + meta tags |
| [`src/static/main.tsx`](src/static/main.tsx) | Client entry (no SSR) |
| [`vite.static.config.ts`](vite.static.config.ts) | Vite config for `build:static` |

## Project structure

```text
DemoTheme/
├── public/                 # Static assets (favicon, brand, hero, robots.txt)
├── static-hosting/         # Static build template (index.html, .htaccess)
├── static-html/            # Generated deploy folder (after npm run build:static)
├── scripts/
│   └── finish-static-html.mjs
├── src/
│   ├── assets/             # Image imports for Vite
│   ├── components/
│   │   ├── site/           # Page sections (Hero, Navbar, …)
│   │   └── ui/             # shadcn-style UI primitives
│   ├── content/            # Copy bundles (modern / legacy / modernClassic)
│   ├── static/             # Static SPA entry (shared hosting)
│   ├── hooks/
│   ├── lib/
│   ├── routes/             # TanStack file routes (__root, index)
│   ├── router.tsx
│   ├── routeTree.gen.ts    # Generated route tree
│   ├── server.ts           # SSR entry wrapper
│   ├── start.ts            # TanStack Start middleware
│   └── styles.css          # Tailwind + design tokens
├── vite.config.ts
├── vite.static.config.ts
├── package.json
└── tsconfig.json
```

## Notes

- Use `@/` imports for anything under `src/`.
- After adding routes under `src/routes/`, the router plugin regenerates `routeTree.gen.ts` on dev/build.
