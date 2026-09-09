/**
 * Asset path helper. BASE mirrors next.config.ts basePath: empty when served at
 * a domain root (rickywrapsllc.com), or "/one-stop-customs" when served from a
 * GitHub Pages project page. Driven by NEXT_PUBLIC_BASE_PATH so both work with
 * no code change.
 */
export const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function asset(path: string): string {
  if (!path) return path;
  if (/^https?:\/\//.test(path)) return path;
  if (BASE && path.startsWith(BASE)) return path;
  if (path.startsWith("/")) return `${BASE}${path}`;
  return path;
}
