"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, Command, Moon, Search, Sun } from "lucide-react";
import { RevealMenu } from "@motionlab/ui/reveal-menu";
import { componentRegistry } from "@/lib/component-registry";
import { repositoryUrl } from "@/lib/site-config";
import { useTheme } from "./theme-provider";

const links = [
  { label: "Components", href: "/components" },
  { label: "Playground", href: "/playground" },
  { label: "Docs", href: "/docs" },
  { label: "Showcase", href: "/showcase" },
];

export function SiteHeader() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const themeLabel =
    theme === "system" ? "System theme" : theme === "dark" ? "Dark theme" : "Light theme";
  const cycleTheme = () =>
    setTheme(theme === "system" ? "dark" : theme === "dark" ? "light" : "system");
  const pages = [
    ...links,
    { label: "Installation guide", href: "/docs/installation" },
    { label: "Motion accessibility", href: "/docs/accessibility" },
  ];
  const pageResults = pages.filter((link) =>
    link.label.toLowerCase().includes(query.toLowerCase()),
  );
  const componentResults = query.trim()
    ? componentRegistry
        .filter((entry) =>
          [entry.name, entry.category, entry.description, ...entry.tags]
            .join(" ")
            .toLowerCase()
            .includes(query.toLowerCase()),
        )
        .slice(0, 6)
    : [];

  return (
    <>
      <header className="site-header">
        <Link href="/" className="brand-lockup" aria-label="MotionLab home">
          <span className="brand-name">
            MOTIONLAB<span className="brand-reg">®</span>
          </span>
          <span className="brand-version mono">VOL. 001</span>
        </Link>
        <nav aria-label="Main navigation" className="desktop-nav">
          {links.map((link) => (
            <Link href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <button
            className="icon-action theme-action"
            aria-label={`Change theme. Current: ${themeLabel}`}
            onClick={cycleTheme}
            type="button"
          >
            {theme === "dark" ? <Moon size={16} /> : <Sun size={16} />}
            <span className="theme-indicator mono">
              {theme === "system" ? "AUTO" : theme.toUpperCase()}
            </span>
          </button>
          <button
            className="search-trigger"
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Search MotionLab"
          >
            <Search size={16} />
            <span>Search</span>
            <kbd>
              <Command size={11} /> K
            </kbd>
          </button>
          {repositoryUrl ? (
            <a className="github-link" href={repositoryUrl} target="_blank" rel="noreferrer">
              GitHub <ArrowUpRight size={14} />
            </a>
          ) : (
            <span className="github-link is-unpublished">LOCAL SOURCE</span>
          )}
          <div className="mobile-menu">
            <RevealMenu items={links} />
          </div>
        </div>
      </header>
      <a href="/components" className="header-cta">
        EXPLORE COMPONENTS <ArrowUpRight size={15} />
      </a>
      <dialog
        className="command-dialog"
        onClose={() => setSearchOpen(false)}
        ref={(node) => {
          if (node && searchOpen && !node.open) node.showModal();
          if (node && !searchOpen && node.open) node.close();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
      >
        <div className="command-head">
          <span className="mono">FIND AN EXPERIMENT</span>
          <button onClick={() => setSearchOpen(false)} aria-label="Close search">
            ESC
          </button>
        </div>
        <label className="command-input-wrap">
          <Search size={18} />
          <span className="sr-only">Search components and docs</span>
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search components and docs…"
          />
        </label>
        <div className="command-results">
          {pageResults.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setSearchOpen(false)}>
              {link.label}
              <ArrowUpRight size={14} />
            </Link>
          ))}
          {componentResults.map((entry) => (
            <Link
              key={entry.slug}
              href={`/components/${entry.slug}`}
              onClick={() => setSearchOpen(false)}
            >
              <span>
                {entry.name}
                <small className="command-category">{entry.category}</small>
              </span>
              <ArrowUpRight size={14} />
            </Link>
          ))}
          {query && pageResults.length === 0 && componentResults.length === 0 && (
            <p className="empty-search">
              No matching pages. Try a component name, category, or tag.
            </p>
          )}
        </div>
      </dialog>
    </>
  );
}
