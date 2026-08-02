# Static site deploy (shared hosting)

Upload **everything inside this folder** to your host document root (e.g. `public_html`).

## Build from the project root

```bash
npm run build:static
```

That produces this folder: HTML, `assets/`, and copies of `public/` (brand, hero, favicon, etc.).

## Requirements

- **Document root** deployment (site at `https://yourdomain.com/`).
- **HTTPS** recommended (contact form uses `mailto:`).
- PHP not required.

## Apache

`.htaccess` is included for optional fallback routing. If rewrite causes 500 errors, remove `.htaccess` — this site is a single page with in-page `#` links.

## Subfolder deploy

If the site lives at `https://yourdomain.com/subfolder/`, rebuild with:

```bash
STATIC_BASE=/subfolder/ npm run build:static
```

(Then upload the contents of `static-html/` into that subfolder.)

## Theme toggle

The bottom-right preview toggle works in the browser via `localStorage` (no server).
