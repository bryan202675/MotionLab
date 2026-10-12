import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { docsNavigation, docsPages, getDoc } from "@/lib/docs";

interface DocsPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return docsNavigation.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: DocsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getDoc(slug);
  return page ? { title: page.title.replaceAll(".", ""), description: page.description } : {};
}

export default async function DocsArticle({ params }: DocsPageProps) {
  const { slug } = await params;
  const page = getDoc(slug);
  if (!page) notFound();
  const pageIndex = docsPages.indexOf(page);
  const previous = docsPages[pageIndex - 1];
  const next = docsPages[pageIndex + 1];
  return (
    <div className="docs-layout page-wrap">
      <aside className="docs-sidebar">
        <span className="mono">THE MANUAL</span>
        <nav aria-label="Documentation">
          <Link className="docs-overview" href="/docs">
            Overview
          </Link>
          {docsNavigation.map((item, index) => (
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
          SOURCE FIRST
          <br />
          MIT / VOL. 001
        </div>
      </aside>
      <article className="docs-article">
        <span className="section-kicker">{page.eyebrow}</span>
        <h1 className="display">{page.title}</h1>
        <p className="docs-lede">{page.description}</p>
        <nav className="toc" aria-label="On this page">
          <span className="mono">ON THIS PAGE</span>
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
                <small>PREVIOUS</small>
                {previous.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link href={`/docs/${next.slug}`}>
              <span>
                <small>NEXT</small>
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
