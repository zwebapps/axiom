# Static site deploy (shared hosting)

Upload **everything inside this folder** to your host document root (e.g. `public_html`).

## Build from the project root

```bash
npm run build:static
```

Output folder: **`static-html/`** (not `static-hosting/`).

| Folder / file | Use |
|---------------|-----|
| **`static-html/`** | ✅ Upload this entire folder to your host |
| **`static-hosting/`** | ❌ Source template only — will look empty if opened or uploaded as-is |

## Test before upload

Do **not** double-click `index.html` on your computer — browsers block the app on `file://`.

```bash
npm run preview:static
```

Open the HTTP URL printed in the terminal.

## Requirements

- **Document root** deployment (site at `https://yourdomain.com/`).
- Upload **`index.html`**, **`assets/`**, **`hero/`**, **`brand/`**, and other files together.
- **HTTPS** recommended (contact form uses `mailto:`).
- PHP not required.

## Apache

`.htaccess` is included for optional fallback routing. If rewrite causes 500 errors, remove `.htaccess` — this site is a single page with in-page `#` links.

## Subfolder deploy

If the site lives at `https://yourdomain.com/subfolder/`:

```bash
STATIC_BASE=/subfolder/ npm run build:static
```

Then upload the contents of `static-html/` into that subfolder.

## Theme toggle

The bottom-right preview toggle works in the browser via `localStorage` (no server).
