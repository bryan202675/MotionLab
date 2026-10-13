"use client";

import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { translations, type Language } from "@/lib/translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (typeof translations)["es"];
}

const LanguageContext = createContext<LanguageContextType>({
  language: "es",
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: translations.es,
});

const STORAGE_KEY = "motionlab-lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("es");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Language | null;
      if (saved && (saved === "es" || saved === "en")) {
        setLanguageState(saved);
      } else if (typeof navigator !== "undefined") {
        const browserLang = navigator.language.toLowerCase();
        if (browserLang.startsWith("en")) {
          setLanguageState("en");
        } else {
          setLanguageState("es");
        }
      }
    } catch {
      // Fallback
    }
    setMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Ignore storage errors
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === "es" ? "en" : "es");
  };

  const t = useMemo(() => translations[language], [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
