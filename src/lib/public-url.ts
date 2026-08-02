/** Public folder URLs that respect Vite `base` (e.g. `./` on static hosting). */
export function publicUrl(path: string): string {
  const clean = path.replace(/^\//, "");
  const base = import.meta.env.BASE_URL ?? "/";
  return `${base}${clean}`;
}
