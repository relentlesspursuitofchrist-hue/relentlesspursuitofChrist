import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getEpisodes, getEpisodeBySlug } from "@/lib/feed";
import { AudioPlayer } from "@/components/AudioPlayer";
import { SITE } from "@/config";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const eps = await getEpisodes();
  return eps.map((ep) => ({ slug: ep.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const episode = await getEpisodeBySlug(slug);
  if (!episode) return {};
  return {
    title: `${episode.title} — ${SITE.showFullTitle}`,
  };
}

export default async function EpisodePage({ params }: { params: Params }) {
  const { slug } = await params;
  const episode = await getEpisodeBySlug(slug);
  if (!episode) notFound();

  const dateLong = episode.pubDate.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const durationLabel = formatDurationLabel(episode.durationSec);
  const epLabel =
    episode.episodeNumber != null ? `Episode ${episode.episodeNumber}` : null;
  const metaParts = [epLabel, dateLong, durationLabel].filter(
    Boolean,
  ) as string[];

  return (
    <div className="container episode-page">
      <Link href="/episodes" className="episode-page__back">
        ← All episodes
      </Link>

      <h1 className="episode-page__title">{episode.title}</h1>
      <p className="episode-page__meta">{metaParts.join(" · ")}</p>

      <AudioPlayer src={episode.audioUrl} />

      <h2 className="episode-page__transcript-heading">Transcript</h2>
      <div
        className="transcript-body"
        dangerouslySetInnerHTML={{ __html: episode.descriptionHtml }}
      />
    </div>
  );
}

function formatDurationLabel(sec: number | null): string | null {
  if (sec == null || sec <= 0) return null;
  if (sec < 60) return `${sec} sec`;
  const mins = Math.round(sec / 60);
  if (mins < 60) return `${mins} min`;
  const hrs = Math.floor(mins / 60);
  const rem = mins % 60;
  return rem ? `${hrs} hr ${rem} min` : `${hrs} hr`;
}
