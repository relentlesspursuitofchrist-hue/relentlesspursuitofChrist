import Link from "next/link";
import { SITE } from "@/config";
import { HeaderLogo } from "./HeaderLogo";

export function Header() {
  const newsletter = SITE.socials.newsletter;

  return (
    <header className="site-header">
      <div className="container site-header__inner">
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
          <a href="https://the-forge-rpoc.netlify.app/" target="_blank" rel="noopener noreferrer">
            The Forge
          </a>
        </nav>
      </div>
    </header>
  );
}
