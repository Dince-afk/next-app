"use client";

import { createContext, use } from "react";

const LocaleContext = createContext<string | null>(null);

export function LocaleProvider({
  locale,
  children,
}: {
  locale: string;
  children: React.ReactNode;
}) {
  return (
    <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): string {
  const locale = use(LocaleContext);
  if (!locale) {
    throw new Error("useLocale must be used within a <LocaleProvider>");
  }
  return locale;
}
