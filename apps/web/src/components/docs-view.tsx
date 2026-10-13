"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { docsNavigationEn, docsNavigationEs, docsPagesEn, docsPagesEs, type DocPage } from "@/lib/docs";
import { useLanguage } from "./language-provider";

export function DocsView({ slug }: { slug: string }) {
  const { language, t } = useLanguage();
  const navigation = language === "es" ? docsNavigationEs : docsNavigationEn;
  const pages = language === "es" ? docsPagesEs : docsPagesEn;

  const fallbackPage = pages[0] as DocPage;
  const page = pages.find((p) => p.slug === slug) ?? fallbackPage;
  const pageIndex = pages.indexOf(page);
  const previous = pages[pageIndex - 1];
  const next = pages[pageIndex + 1];

  return (
    <div className="docs-layout page-wrap">
      <aside className="docs-sidebar">
        <span className="mono">{t.docs.sidebarTitle}</span>
        <nav aria-label={language === "es" ? "Documentación" : "Documentation"}>
          <Link className="docs-overview" href="/docs">
            {t.docs.overview}
          </Link>
          {navigation.map((item, index) => (
            <Link
              key={item.slug}
              href={`/docs/${item.slug}`}
              aria-current={item.slug === slug ? "page" : undefined}
            >
              <span className="mono">{String(index + 1).padStart(2, "0")}</span>
              {item.title}
            </Link>
          ))}
        </nav>
        <div className="docs-sidebar-note mono">
          {t.docs.sourceFirst}
          <br />
          {t.docs.mitLicense}
        </div>
      </aside>
      <article className="docs-article">
        <span className="section-kicker">{page.eyebrow}</span>
        <h1 className="display">{page.title}</h1>
        <p className="docs-lede">{page.description}</p>
        <nav className="toc" aria-label={t.docs.onThisPage}>
          <span className="mono">{t.docs.onThisPage}</span>
          {page.sections.map((section) => (
            <a key={section.id} href={`#${section.id}`}>
              {section.title}
            </a>
          ))}
        </nav>
        {page.sections.map((section, index) => (
          <section className="docs-section" id={section.id} key={section.id}>
            <span className="mono">
              {String(index + 1).padStart(2, "0")} / {section.id.toUpperCase()}
            </span>
            <h2>{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.bullets && (
              <ul>
                {section.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            )}
            {section.code && (
              <pre>
                <code>{section.code}</code>
              </pre>
            )}
          </section>
        ))}
        <div className="docs-pager">
          {previous ? (
            <Link href={`/docs/${previous.slug}`}>
              <ArrowLeft size={14} />
              <span>
                <small>{t.docs.previous.toUpperCase()}</small>
                {previous.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link href={`/docs/${next.slug}`}>
              <span>
                <small>{t.docs.next.toUpperCase()}</small>
                {next.title}
              </span>
              <ArrowRight size={14} />
            </Link>
          )}
        </div>
      </article>
    </div>
  );
}
