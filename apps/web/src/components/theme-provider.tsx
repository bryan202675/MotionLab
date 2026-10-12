"use client";

import { createContext, useContext, useEffect, useMemo, useSyncExternalStore } from "react";
import type { ReactNode } from "react";

export type ThemePreference = "system" | "light" | "dark";

interface ThemeContextValue {
  theme: ThemePreference;
  setTheme: (theme: ThemePreference) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);
const THEME_KEY = "motionlab-theme";
const THEME_EVENT = "motionlab-theme-change";
let fallbackTheme: ThemePreference = "system";

function parseTheme(value: string | null): ThemePreference {
  return value === "light" || value === "dark" || value === "system" ? value : "system";
}

function getThemeSnapshot(): ThemePreference {
  if (typeof window === "undefined") return "system";
  try {
    const stored = window.localStorage.getItem(THEME_KEY);
    return stored === null ? fallbackTheme : parseTheme(stored);
  } catch {
    return fallbackTheme;
  }
}

function subscribeTheme(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(THEME_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(THEME_EVENT, onChange);
  };
}

function setThemePreference(theme: ThemePreference) {
  fallbackTheme = theme;
  try {
    window.localStorage.setItem(THEME_KEY, theme);
  } catch {
    // The in-memory preference still applies when storage is unavailable.
  }
  window.dispatchEvent(new Event(THEME_EVENT));
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore<ThemePreference>(
    subscribeTheme,
    getThemeSnapshot,
    () => "system",
  );
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const applyTheme = () => {
      const active = theme === "system" ? (media.matches ? "dark" : "light") : theme;
      document.documentElement.dataset.theme = active;
    };
    applyTheme();
    if (theme !== "system") return;
    media.addEventListener("change", applyTheme);
    return () => media.removeEventListener("change", applyTheme);
  }, [theme]);
  const value = useMemo(() => ({ theme, setTheme: setThemePreference }), [theme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");
  return context;
}
