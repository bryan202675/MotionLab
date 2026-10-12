"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState, useSyncExternalStore } from "react";
import { ArrowUpRight, Grid2X2, List, Search, Star, X } from "lucide-react";
import { ComponentDemo } from "./component-demo";
import { categories, componentRegistry } from "@/lib/component-registry";

const FAVORITES_KEY = "motionlab-favorites";
const FAVORITES_EVENT = "motionlab-favorites-change";
let fallbackFavorites = "[]";

function getFavoritesSnapshot() {
  if (typeof window === "undefined") return "[]";
  try {
    return window.localStorage.getItem(FAVORITES_KEY) ?? fallbackFavorites;
  } catch {
    return fallbackFavorites;
  }
}

function subscribeFavorites(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(FAVORITES_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(FAVORITES_EVENT, onChange);
  };
}

function parseFavorites(snapshot: string) {
  try {
    const saved: unknown = JSON.parse(snapshot);
    return Array.isArray(saved) && saved.every((item) => typeof item === "string") ? saved : [];
  } catch {
    return [];
  }
}

function persistFavorites(favorites: string[]) {
  fallbackFavorites = JSON.stringify(favorites);
  try {
    localStorage.setItem(FAVORITES_KEY, fallbackFavorites);
  } catch {
    // Private browsing can deny storage; the in-memory snapshot remains usable.
  }
  window.dispatchEvent(new Event(FAVORITES_EVENT));
}

export function ComponentCatalog() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const category = searchParams.get("category") ?? "all";
  const favoritesSnapshot = useSyncExternalStore(
    subscribeFavorites,
    getFavoritesSnapshot,
    () => "[]",
  );
  const favorites = useMemo(() => parseFavorites(favoritesSnapshot), [favoritesSnapshot]);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [layout, setLayout] = useState<"grid" | "list">("grid");

  const updateFilters = (next: { q?: string; category?: string }) => {
    const params = new URLSearchParams(searchParams.toString());
    if (next.q !== undefined) {
      if (next.q) params.set("q", next.q);
      else params.delete("q");
    }
    if (next.category !== undefined) {
      if (next.category !== "all") params.set("category", next.category);
      else params.delete("category");
    }
    const suffix = params.toString();
    router.replace(suffix ? `${pathname}?${suffix}` : pathname, { scroll: false });
  };

  const toggleFavorite = (slug: string) => {
    const next = favorites.includes(slug)
      ? favorites.filter((favorite) => favorite !== slug)
      : [...favorites, slug];
    persistFavorites(next);
  };

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return componentRegistry.filter((entry) => {
      const matchesQuery =
        !needle ||
        [entry.name, entry.category, entry.description, ...entry.tags]
          .join(" ")
          .toLowerCase()
          .includes(needle);
      const matchesCategory = category === "all" || entry.category === category;
      const matchesFavorites = !favoritesOnly || favorites.includes(entry.slug);
      return matchesQuery && matchesCategory && matchesFavorites;
    });
  }, [category, favorites, favoritesOnly, query]);

  return (
    <section className="catalog-shell page-wrap">
      <div className="catalog-intro">
        <div>
          <span className="section-kicker">VOL. 001 / THE COMPONENT INDEX</span>
          <h1 className="display">
            FIND YOUR
            <br />
            <span>NEW MOVE.</span>
          </h1>
        </div>
        <p>
          24 original studies, ready to pull apart. Search the source by name, category,
          description, or tag.
        </p>
      </div>
      <div className="catalog-toolbar">
        <label className="catalog-search">
          <Search size={18} />
          <span className="sr-only">Search components</span>
          <input
            value={query}
            onChange={(event) => updateFilters({ q: event.target.value })}
            placeholder="Search the index…"
          />
          <kbd>⌘ K</kbd>
        </label>
        <label className="catalog-select-label">
          <span className="mono">CATEGORY</span>
          <select
            aria-label="Filter by category"
            value={category}
            onChange={(event) => updateFilters({ category: event.target.value })}
          >
            <option value="all">All categories</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <button
          className={`filter-toggle ${favoritesOnly ? "is-active" : ""}`}
          type="button"
          aria-pressed={favoritesOnly}
          onClick={() => setFavoritesOnly((active) => !active)}
        >
          <Star size={15} fill={favoritesOnly ? "currentColor" : "none"} /> FAVORITES
        </button>
        <div className="view-toggle" aria-label="Catalog layout">
          <button
            type="button"
            aria-label="Grid view"
            aria-pressed={layout === "grid"}
            onClick={() => setLayout("grid")}
          >
            <Grid2X2 size={15} />
          </button>
          <button
            type="button"
            aria-label="List view"
            aria-pressed={layout === "list"}
            onClick={() => setLayout("list")}
          >
            <List size={16} />
          </button>
        </div>
      </div>
      <div className="catalog-summary">
        <span className="mono">{String(results.length).padStart(2, "0")} / 24 STUDIES</span>
        <span className="mono">SORTED BY INDEX</span>
      </div>
      {results.length ? (
        <div className={`component-grid ${layout === "list" ? "is-list" : ""}`}>
          {results.map((entry) => {
            const favorite = favorites.includes(entry.slug);
            return (
              <article className="component-card" key={entry.slug}>
                <div
                  className={`component-preview ${entry.category.startsWith("Backgrounds") ? "is-background" : ""}`}
                >
                  <span className="component-index mono">
                    {String(componentRegistry.indexOf(entry) + 1).padStart(2, "0")}
                  </span>
                  <button
                    type="button"
                    className={`favorite-button ${favorite ? "is-favorite" : ""}`}
                    aria-label={`${favorite ? "Remove" : "Add"} ${entry.name} ${favorite ? "from" : "to"} favorites`}
                    aria-pressed={favorite}
                    onClick={() => toggleFavorite(entry.slug)}
                  >
                    <Star size={15} fill={favorite ? "currentColor" : "none"} />
                  </button>
                  <ComponentDemo
                    slug={entry.slug}
                    label={
                      entry.name === "TypingLoop"
                        ? "GOOD INTERFACES MOVE"
                        : entry.name.toUpperCase()
                    }
                    pace={1}
                    intensity={12}
                    accent="#dfff00"
                  />
                </div>
                <div className="component-card-info">
                  <div className="component-card-meta">
                    <span className="mono">{entry.category}</span>
                    <span className="mono">
                      {String(componentRegistry.indexOf(entry) + 1).padStart(2, "0")} / 24
                    </span>
                  </div>
                  <h2>{entry.name}</h2>
                  <p>{entry.description}</p>
                  <div className="component-card-bottom">
                    <div className="tag-list">
                      {entry.tags.slice(0, 2).map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    <Link href={`/components/${entry.slug}`} aria-label={`Explore ${entry.name}`}>
                      <ArrowUpRight size={17} />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-mark">∅</div>
          <h2 className="display">NO SIGNAL.</h2>
          <p>No components match those filters. Clear one or search a different motion study.</p>
          <button
            className="button button-ink"
            type="button"
            onClick={() => {
              updateFilters({ q: "", category: "all" });
              setFavoritesOnly(false);
            }}
          >
            CLEAR FILTERS <X size={14} />
          </button>
        </div>
      )}
    </section>
  );
}
