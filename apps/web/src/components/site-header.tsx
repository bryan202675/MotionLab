"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Command, Languages, Moon, Search, Sun } from "lucide-react";
import { RevealMenu } from "@motionlab/ui/reveal-menu";
import { componentRegistry } from "@/lib/component-registry";
import { repositoryUrl } from "@/lib/site-config";
import { useTheme } from "./theme-provider";
import { useLanguage } from "./language-provider";

export function SiteHeader() {
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { theme, setTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();

  const links = [
    { label: t.nav.components, href: "/components" },
    { label: t.nav.playground, href: "/playground" },
    { label: t.nav.docs, href: "/docs" },
    { label: t.nav.showcase, href: "/showcase" },
  ];

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
    theme === "system" ? t.nav.themeSystem : theme === "dark" ? t.nav.themeDark : t.nav.themeLight;
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
        <div className="site-header-inner">
          <Link href="/" className="brand-lockup" aria-label="MotionLab home">
            <span className="brand-name">
              MOTIONLAB<span className="brand-reg">®</span>
            </span>
          </Link>
          <nav aria-label="Main navigation" className="desktop-nav">
            {links.map((link) => (
              <a
                href={`#${link.href.replace(/^\//, "")}`}
                key={link.href}
                onClick={(event) => {
                  event.preventDefault();
                  router.push(link.href);
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <button
              className="icon-action lang-action"
              aria-label={t.nav.changeLanguage}
              onClick={toggleLanguage}
              type="button"
            >
              <Languages size={15} />
              <span className="lang-indicator mono">{language.toUpperCase()}</span>
            </button>
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
              <span>{t.nav.search}</span>
              <kbd>
                <Command size={11} /> K
              </kbd>
            </button>
            {repositoryUrl ? (
              <a className="github-link" href={repositoryUrl} target="_blank" rel="noreferrer">
                GitHub <ArrowUpRight size={14} />
              </a>
            ) : null}
            <div className="mobile-menu">
              <RevealMenu items={links} onSelect={(href) => router.push(href)} />
            </div>
          </div>
        </div>
      </header>
      <a
        href="#components"
        className="header-cta"
        onClick={(event) => {
          event.preventDefault();
          router.push("/components");
        }}
      >
        {t.hero.exploreBtn} <ArrowUpRight size={15} />
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
