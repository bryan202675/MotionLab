"use client";

import { createContext, useContext, useMemo, useSyncExternalStore } from "react";
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
const LANGUAGE_CHANGE_EVENT = "motionlab-language-change";
let fallbackLanguage: Language | null = null;

function getLanguageSnapshot(): Language {
  if (fallbackLanguage) return fallbackLanguage;

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "es" || saved === "en") return saved;
  } catch {
    // Fall back to the browser language when storage is unavailable.
  }

  return navigator.language.toLowerCase().startsWith("en") ? "en" : "es";
}

function subscribeToLanguage(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(LANGUAGE_CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(LANGUAGE_CHANGE_EVENT, onChange);
  };
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const language = useSyncExternalStore(
    subscribeToLanguage,
    getLanguageSnapshot,
    (): Language => "es",
  );

  const setLanguage = (lang: Language) => {
    fallbackLanguage = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Ignore storage errors
    }
    window.dispatchEvent(new Event(LANGUAGE_CHANGE_EVENT));
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
