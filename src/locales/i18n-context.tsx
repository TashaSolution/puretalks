"use client";

import React, { createContext, useContext } from "react";
import { enTranslations } from "./en";
import { Translations } from "@/types/i18n";

interface LanguageContextType {
  language: "en";
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  t: enTranslations,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  return (
    <LanguageContext.Provider
      value={{
        language: "en",
        t: enTranslations,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
