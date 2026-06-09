import { SITE, SOCIAL_LABELS } from "@/config";

export function Footer() {
  const links = SOCIAL_LABELS
    .map(([key, label]) => ({ key, label, url: SITE.socials[key] }))
    .filter((l) => Boolean(l.url));

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        {links.length > 0 && (
          <div className="site-footer__links">
            {links.map((l) => (
              <a
                key={l.key}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {l.label}
              </a>
            ))}
          </div>
        )}
        <p className="site-footer__copyright">
          © {SITE.copyrightYear} {SITE.showFullTitle}
        </p>
      </div>
    </footer>
  );
}
