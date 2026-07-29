# Axiom Vertex Group (Demo Theme)

Corporate marketing site built with **TanStack Start**, **React 19**, **TypeScript**, and **Tailwind CSS v4** (Lovable export).

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
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |

## Project structure

```text
DemoTheme/
├── public/                 # Static assets (favicon, robots.txt)
├── src/
│   ├── assets/             # Image imports for Vite
│   ├── components/
│   │   ├── site/           # Page sections (Hero, Navbar, …)
│   │   └── ui/             # shadcn-style UI primitives
│   ├── hooks/
│   ├── lib/
│   ├── routes/             # TanStack file routes (__root, index)
│   ├── router.tsx
│   ├── routeTree.gen.ts    # Generated route tree
│   ├── server.ts           # SSR entry wrapper
│   ├── start.ts            # TanStack Start middleware
│   └── styles.css          # Tailwind + design tokens
├── vite.config.ts
├── package.json
└── tsconfig.json
```

## Notes

- Use `@/` imports for anything under `src/`.
- After adding routes under `src/routes/`, the router plugin regenerates `routeTree.gen.ts` on dev/build.
# axiom
