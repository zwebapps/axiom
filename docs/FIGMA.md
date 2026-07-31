# Figma content source

Design reference for **Axiom Vertex Group** marketing site.

## Prototype

- **File:** Vertex group — Tech Miracle  
- **Prototype:** [Open in Figma](https://www.figma.com/proto/ZsNnKg31gMuWGz8nzQZg6F/Vertex-group---Tech-Miracle?node-id=2010-1223&t=cnplIhGZerPmyfGG-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1)  
- **Frame node:** `2010-1223`

Figma prototypes require a logged-in session; site copy is maintained in code at [`src/content/site.ts`](../src/content/site.ts) and should be updated when the Figma file changes.

## Brand logos

| Asset | Path |
|-------|------|
| Full lockup (nav / footer) | `public/brand/axiom-logo-full.png` |
| Icon mark only | `public/brand/axiom-logo-mark.png` |
| Alternate full lockup | `public/brand/axiom-logo-full-alt.png` |
| Favicon | `public/favicon.png` (mark) |

## Hero (3D globe)

Interactive hero from [`axiom-vertex-hero.html`](/public/hero/axiom-vertex-hero.reference.html):

- React markup: `src/components/site/Hero.tsx`
- Styles: `src/styles/axiom-hero.css`
- WebGL + corridor engine: `public/hero/globe-engine.js` (auto-rotating globe, drag to rotate)
