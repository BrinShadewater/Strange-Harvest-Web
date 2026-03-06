"use client";

import { createContext, useContext } from "react";
import type { SiteLanguage } from "./sitecopy";

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
