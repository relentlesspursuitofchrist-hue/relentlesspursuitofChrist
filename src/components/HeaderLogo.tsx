"use client";

import { useState } from "react";

/**
 * The header's logo. Shows public/logo.png by default.
 * If the image fails to load, falls back to the short title text.
 */
export function HeaderLogo({ fallback }: { fallback: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <span className="site-header__logo-fallback">{fallback}</span>;
  }
  return (
    <img
      src="/logo-banner.png"
      alt={fallback}
      onError={() => setFailed(true)}
    />
  );
}
