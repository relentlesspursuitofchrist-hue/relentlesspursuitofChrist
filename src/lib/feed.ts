import { XMLParser } from "fast-xml-parser";
import sanitizeHtml from "sanitize-html";
import { SITE } from "@/config";
import { makeSlug } from "@/lib/slug";

export type Episode = {
  slug: string;
  title: string;
  pubDate: Date;
  episodeNumber: number | null;
  durationSec: number | null;
  descriptionHtml: string; // sanitized HTML; safe to dangerouslySetInnerHTML
  audioUrl: string;
  imageUrl: string;
  guid: string;
};

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  cdataPropName: "__cdata",
  textNodeName: "#text",
});

const SANITIZE_OPTS: sanitizeHtml.IOptions = {
  allowedTags: [
    "p", "br", "em", "strong", "a", "ul", "ol", "li",
    "blockquote", "code", "pre", "h2", "h3", "h4",
  ],
  allowedAttributes: {
    a: ["href", "target", "rel"],
  },
  transformTags: {
    a: sanitizeHtml.simpleTransform("a", { target: "_blank", rel: "noopener noreferrer" }),
  },
};

let _loggedOnce = false;

export async function getEpisodes(): Promise<Episode[]> {
  const res = await fetch(SITE.feedUrl, {
    next: { revalidate: 3600 },
    headers: {
      "User-Agent": "RPOC-Site/1.0 (+https://relentlesspursuitofchrist.substack.com)",
    },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch RSS: ${res.status} ${res.statusText}`);
  }
  const xml = await res.text();
  const parsed = parser.parse(xml);

  const channel = parsed?.rss?.channel;
  if (!channel) throw new Error("RSS feed missing <channel>");

  const channelImage: string =
    channel["itunes:image"]?.["@_href"] ??
    (typeof channel.image === "object" ? readText(channel.image.url) : "") ??
    "";

  const rawItems: unknown[] = Array.isArray(channel.item)
    ? channel.item
    : channel.item
      ? [channel.item]
      : [];

  const episodes = rawItems
    .map((item) => toEpisode(item as RawItem, channelImage))
    .sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  if (!_loggedOnce) {
    _loggedOnce = true;
    console.log("\n[RPOC] Parsed RSS feed — verification log:");
    console.log(
      JSON.stringify(
        episodes.map((e) => ({
          slug: e.slug,
          title: e.title,
          pubDate: e.pubDate.toISOString(),
          episodeNumber: e.episodeNumber,
          durationSec: e.durationSec,
          audioUrl: e.audioUrl,
          imageUrl: e.imageUrl,
          descriptionPreview:
            e.descriptionHtml.length > 200
              ? e.descriptionHtml.slice(0, 200) + "…"
              : e.descriptionHtml,
        })),
        null,
        2,
      ),
    );
    console.log(`[RPOC] Total episodes: ${episodes.length}\n`);
  }

  return episodes;
}

export async function getEpisodeBySlug(slug: string): Promise<Episode | undefined> {
  const eps = await getEpisodes();
  return eps.find((e) => e.slug === slug);
}

/* ---------------- internals ---------------- */

type RawItem = {
  title?: unknown;
  pubDate?: unknown;
  description?: unknown;
  guid?: unknown;
  enclosure?: { "@_url"?: string; "@_type"?: string; "@_length"?: string };
  "itunes:image"?: { "@_href"?: string };
  "itunes:episode"?: unknown;
  "itunes:duration"?: unknown;
};

function toEpisode(item: RawItem, channelImage: string): Episode {
  const title = readText(item.title).trim();
  const guid = readText(item.guid);
  const pubDate = new Date(readText(item.pubDate));
  const epNumRaw = item["itunes:episode"];
  const epNum = epNumRaw != null ? Number(readText(epNumRaw)) : NaN;
  const durationSec = parseDuration(readText(item["itunes:duration"]));
  const audioUrl = item.enclosure?.["@_url"] ?? "";
  const itemImage = item["itunes:image"]?.["@_href"];
  const imageUrl = itemImage || channelImage;
  const rawHtml = readText(item.description);
  const descriptionHtml = sanitizeHtml(rawHtml, SANITIZE_OPTS);

  return {
    slug: makeSlug(title) || guid.replace(/[^a-z0-9]/gi, "-").toLowerCase(),
    title,
    pubDate,
    episodeNumber: Number.isFinite(epNum) ? epNum : null,
    durationSec,
    descriptionHtml,
    audioUrl,
    imageUrl,
    guid,
  };
}

function readText(v: unknown): string {
  if (v == null) return "";
  if (typeof v === "string") return v;
  if (typeof v === "number") return String(v);
  if (typeof v === "object") {
    const o = v as Record<string, unknown>;
    if (typeof o.__cdata === "string") return o.__cdata;
    if (typeof o["#text"] === "string") return o["#text"];
  }
  return "";
}

function parseDuration(s: string): number | null {
  if (!s) return null;
  if (/^\d+$/.test(s)) return Number(s);
  const parts = s.split(":").map((p) => Number(p));
  if (parts.some((n) => Number.isNaN(n))) return null;
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  return null;
}
