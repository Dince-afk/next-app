"use client";

import NextLink from "next/link";
import { type ComponentProps } from "react";

import { useLocale } from "./locale-provider";

type LocalizedLinkProps = ComponentProps<typeof NextLink>;

/**
 * Drop-in replacement for next/link that auto-prefixes the current locale.
 * Skips prefixing for external URLs, hash-only links, and already-localized paths.
 */
export default function LocalizedLink({ href, ...props }: LocalizedLinkProps) {
  const locale = useLocale();

  const localizedHref = localizeHref(href, locale);

  return <NextLink href={localizedHref} {...props} />;
}

function localizeHref(
  href: ComponentProps<typeof NextLink>["href"],
  locale: string,
): ComponentProps<typeof NextLink>["href"] {
  // UrlObject — prefix pathname if present
  if (typeof href === "object") {
    return {
      ...href,
      pathname: href.pathname ? `/${locale}${href.pathname}` : href.pathname,
    };
  }

  // External, hash-only, or protocol-relative links — pass through
  if (href.startsWith("http") || href.startsWith("#") || href.startsWith("//"))
    return href;

  // Already prefixed — pass through
  if (href.startsWith(`/${locale}/`) || href === `/${locale}`) return href;

  // Ensure leading slash, then prefix
  const path = href.startsWith("/") ? href : `/${href}`;
  return `/${locale}${path}`;
}
