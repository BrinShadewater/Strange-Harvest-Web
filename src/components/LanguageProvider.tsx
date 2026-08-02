"use client";

import { createContext, useContext } from "react";
import { getSitecopy, type Sitecopy, type SiteLanguage } from "./sitecopy";

export const LanguageContext = createContext<SiteLanguage>("en");

export function LanguageProvider({
  lang,
  children,
}: {
  lang: SiteLanguage;
  children: React.ReactNode;
}) {
  return <LanguageContext.Provider value={lang}>{children}</LanguageContext.Provider>;
}

export function useLanguageContext(): SiteLanguage {
  return useContext(LanguageContext);
}

/**
 * The one way components read copy.
 *
 * The route owns the language: (en)/page.tsx and (es)/es/page.tsx pass `lang`
 * into <ClientPage>, which feeds this context. Because the value is present
 * during server rendering, /es emits Spanish HTML on the first byte instead of
 * English-then-hydrate.
 *
 * Never import `sitecopy` as a module-scope constant again — that is what made
 * /es serve English to crawlers.
 */
export function useSitecopy(): Sitecopy {
  return getSitecopy(useContext(LanguageContext));
}
