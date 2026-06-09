# Relentless Pursuit of Christ — Podcast Site

The podcast website. Built with Next.js, deployed on Netlify, episodes pulled from Substack RSS.

---

## The one file you probably want to edit

**`src/config.ts`** — all the editable text and links live here:
- Brand text (eyebrow, hero heading, lede, signature)
- Newsletter URL
- Social URLs (Spotify, Apple Podcasts, YouTube, Facebook)
- Copyright year

**Empty social URLs (`""`) hide their footer link automatically.** Paste the real URL between the quotes when you have it; the link appears on next build.

## Where things live

```
src/
  config.ts                      ← edit text/links here
  app/
    layout.tsx                   ← page shell (header + footer)
    page.tsx                     ← homepage
    episodes/page.tsx            ← all-episodes list
    episodes/[slug]/page.tsx     ← individual episode page
    globals.css                  ← all styling (colors, fonts, spacing)
    icon.png                     ← favicon (copied from public/logo.png)
  components/                    ← Header, Footer, EpisodeList, etc.
  lib/feed.ts                    ← fetches + parses the RSS feed
  lib/slug.ts                    ← title → URL slug
public/logo.png                  ← the wordmark used in the header
```

## How new episodes appear on the site

You don't need to do anything. The site fetches the Substack RSS feed every hour (Next.js ISR). Publish on Substack, wait up to ~60 minutes, refresh the live site — new episode shows up.

If you want it immediately, redeploy on Netlify (Deploys → Trigger deploy).

## Running it locally

```bash
npm run dev
```

Open http://localhost:3000. The first time the page loads, you'll see a `[RPOC] Parsed RSS feed` log in your terminal — that's the parse-verification log, helpful for confirming the feed parsed correctly. You can remove it later from `src/lib/feed.ts`.

## Deploying to Netlify

1. Create a GitHub repo and push this project to it (`git push -u origin main`).
2. On netlify.com → Add new site → Import from Git → pick the repo.
3. Netlify auto-detects Next.js and builds it. No manual config needed (the included `netlify.toml` is enough).
4. Within a few minutes the live URL is up.

## Changing colors or fonts

All design tokens are at the top of `src/app/globals.css`:
- `--bg` — page background color
- `--text` — main text color
- `--text-muted` — secondary text (dates, nav, meta)
- `--text-soft` — italic signature line color

Fonts are loaded in `src/app/layout.tsx` via `next/font/google`. To change them, swap `Archivo` (sans) or `Newsreader` (serif) for any other Google Font.
