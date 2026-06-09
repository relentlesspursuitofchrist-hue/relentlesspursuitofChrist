/**
 * RPOC site config — the one file you edit.
 *
 * Anything that needs to change for the site (social links, brand text, feed URL)
 * lives here. Don't edit anywhere else for these values.
 *
 * Rules:
 * - An empty string ("") for a social link hides that link in the footer.
 * - Strings can contain em dashes (—), apostrophes, and unicode safely.
 */

export const SITE = {
  /** Substack RSS feed for the podcast. */
  feedUrl: "https://api.substack.com/feed/podcast/9445393.rss",

  /* ---------------- Brand text ---------------- */

  /** Wordmark text used as image alt and as logo fallback. */
  showShortTitle: "RPOC.",

  /** Long-form name used in the hero eyebrow and metadata. */
  showFullTitle: "Relentless Pursuit of Christ",

  /** Modest heading under the eyebrow on the homepage. */
  heroHeading: "Becoming like Christ, recorded out loud.",

  /** Lede paragraph (serif) on the homepage. */
  heroLede:
    "Unscripted reflections on what it actually looks like to pursue Jesus — the real efforts, the failures, and the changes along the way. Recorded whenever the thought strikes, and shared in case it helps someone chasing the same thing.",

  /** Italic serif signature line, just below the lede. */
  heroSignature:
    "If Christ is in relentless pursuit of us, then we ought to be in relentless pursuit of Him.",

  /* ---------------- Social links ----------------
   * Empty string => link is hidden in the footer.
   * Paste your real URLs in the empty slots when you have them.
   */
  socials: {
    spotify:       "",  // ← Spotify show URL
    applePodcasts: "",  // ← Apple Podcasts show URL
    youtube:       "",  // ← YouTube channel/playlist URL
    facebook:      "",  // ← Facebook page URL
    newsletter:    "https://relentlesspursuitofchrist.substack.com",
  },

  /** Year shown in the footer copyright line. */
  copyrightYear: 2026,
};

/** Display labels for each social key, in the order they appear in the footer. */
export const SOCIAL_LABELS: Array<[keyof typeof SITE.socials, string]> = [
  ["spotify",       "Spotify"],
  ["applePodcasts", "Apple Podcasts"],
  ["youtube",       "YouTube"],
  ["facebook",      "Facebook"],
  ["newsletter",    "Newsletter"],
];
