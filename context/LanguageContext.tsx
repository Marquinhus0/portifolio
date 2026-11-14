"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Locale = "pt" | "en";

interface LanguageContextValue {
  locale: Locale;
  setLocale: (next: Locale) => void;
  toggleLocale: () => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  locale: "pt",
  setLocale: () => {},
  toggleLocale: () => {},
});

const STORAGE_KEY = "mr_portfolio_locale";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("pt");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "pt" || saved === "en") {
        setLocaleState(saved);
        document.documentElement.lang = saved === "en" ? "en" : "pt-BR";
      }
    } catch {
      // Ignore storage access errors in restricted contexts
    }
  }, []);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    if (typeof document !== "undefined") {
      document.documentElement.lang = next === "en" ? "en" : "pt-BR";
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore storage write errors
    }
  };

  const toggleLocale = () => {
    setLocale(locale === "pt" ? "en" : "pt");
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, toggleLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
