import Link from "next/link";
import { SITE } from "@/config";
import { HeaderLogo } from "./HeaderLogo";

export function Header() {
  const newsletter = SITE.socials.newsletter;

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link
          href="/"
          className="site-header__logo"
          aria-label={`${SITE.showShortTitle} home`}
        >
          <HeaderLogo fallback={SITE.showShortTitle} />
        </Link>
        <nav className="site-header__nav" aria-label="Primary">
          <Link href="/episodes">Episodes</Link>
          {newsletter && (
            <a href={newsletter} target="_blank" rel="noopener noreferrer">
              Newsletter
            </a>
          )}
        </nav>
      </div>
    </header>
  );
}
