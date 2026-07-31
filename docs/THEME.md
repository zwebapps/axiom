# Axiom Vertex Group — Brand theme

Luxury corporate dark theme aligned with the Axiom Vertex design system.

## Color palette

| Token | Role |
|-------|------|
| `--navy-deep` | Page background (deep navy / charcoal) |
| `--navy` | Alternate section background |
| `--surface` | Cards and panels |
| `--gold` / `--gold-soft` / `--gold-deep` | Champagne gold accents, CTAs, icons |
| `--foreground` | Primary body text (crisp white) |
| `--muted-foreground` | Secondary copy |

## Typography

| Use | Font | Tailwind |
|-----|------|----------|
| Headlines (H1–H4), display stats | **Playfair Display** | `font-display` |
| Body, nav, labels, UI, service titles | **Inter** | `font-sans` (default) |
| Eyebrows / overlines | **Inter** (uppercase, tracked) | `.eyebrow` |

Fonts load in `src/routes/__root.tsx` via Google Fonts.
