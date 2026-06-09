import Link from "next/link";
import { getEpisodes } from "@/lib/feed";
import { EpisodeList } from "@/components/EpisodeList";
import { SITE } from "@/config";

export default async function HomePage() {
  const episodes = await getEpisodes();
  const latest = episodes.slice(0, 10);

  return (
    <div className="container">
      <section className="hero">
        <p className="hero__eyebrow">{SITE.showFullTitle}</p>
        <h1 className="hero__heading">{SITE.heroHeading}</h1>
        <p className="hero__lede">{SITE.heroLede}</p>
        <p className="hero__signature">{SITE.heroSignature}</p>
      </section>

      <section className="section-heading" aria-label="Latest episodes">
        <h2>Latest episodes</h2>
        <Link href="/episodes">All episodes →</Link>
      </section>

      <EpisodeList episodes={latest} />
    </div>
  );
}
