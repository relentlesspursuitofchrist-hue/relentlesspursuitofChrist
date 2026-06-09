/**
 * Make a URL-safe slug from an episode title.
 * - Lowercases
 * - Drops anything that isn't a-z, 0-9, space, or hyphen
 * - Collapses whitespace into hyphens
 * - Caps length at 80 chars so URLs don't get absurd
 */
export function makeSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "") // strip diacritics
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80)
    .replace(/-+$/, "");
}
