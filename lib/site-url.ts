/**
 * Canonical site origin for metadata, sitemap, and robots.
 * In production set `NEXT_PUBLIC_SITE_URL` (e.g. `https://example.com`).
 */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw && /^https?:\/\//i.test(raw)) {
    return raw.replace(/\/$/, "");
  }

  return "http://localhost:3000";
}
