import Link from "next/link";
import type { Episode } from "@/lib/feed";

export function EpisodeList({ episodes }: { episodes: Episode[] }) {
  if (episodes.length === 0) {
    return <p className="empty-state">No episodes yet.</p>;
  }

  const groups = groupByYear(episodes);

  return (
    <div className="episode-list">
      {groups.map(([year, eps]) => (
        <section key={year}>
          <h3 className="episode-list__year">{year}</h3>
          <ul>
            {eps.map((ep) => (
              <li key={ep.guid}>
                <Link href={`/episodes/${ep.slug}`} className="episode-row">
                  <span className="episode-row__inner">
                    <span className="episode-row__title">{ep.title}</span>
                    <time
                      className="episode-row__date"
                      dateTime={ep.pubDate.toISOString()}
                    >
                      {formatDateShort(ep.pubDate)}
                    </time>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function groupByYear(eps: Episode[]): Array<[number, Episode[]]> {
  const byYear = new Map<number, Episode[]>();
  for (const ep of eps) {
    const y = ep.pubDate.getFullYear();
    const bucket = byYear.get(y);
    if (bucket) bucket.push(ep);
    else byYear.set(y, [ep]);
  }
  return Array.from(byYear.entries()).sort((a, b) => b[0] - a[0]);
}

function formatDateShort(d: Date): string {
  return d.toLocaleString("en-US", { month: "short", day: "numeric" });
}
