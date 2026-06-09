import type { Metadata } from "next";
import { getEpisodes } from "@/lib/feed";
import { EpisodeList } from "@/components/EpisodeList";
import { SITE } from "@/config";

export const metadata: Metadata = {
  title: `Episodes — ${SITE.showFullTitle}`,
};

export default async function EpisodesPage() {
  const episodes = await getEpisodes();
  return (
    <div className="container episodes-page">
      <h1 className="episodes-page__title">Episodes</h1>
      <EpisodeList episodes={episodes} />
    </div>
  );
}
