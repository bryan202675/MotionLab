"use client";

import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { InfiniteMarquee } from "@motionlab/ui/infinite-marquee";
import { componentRegistry } from "@/lib/component-registry";
import { ComponentDemo } from "@/components/component-demo";
import { CopyButton } from "@/components/copy-button";
import { registryItemUrl } from "@/lib/site-config";
import { useLanguage } from "@/components/language-provider";

const featured = [
  "kinetic-headline",
  "magnetic-button",
  "spotlight-card",
  "infinite-marquee",
  "sliding-tabs",
  "cursor-trail",
];
const installCommand = `pnpm dlx shadcn@latest add ${registryItemUrl("magnetic-button")}`;

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <>
      <section className="hero page-wrap">
        <div className="hero-meta mono">
          <span>{t.hero.metaCategory}</span>
          <span>{t.hero.metaTag}</span>
        </div>
        <div className="hero-layout">
          <div className="hero-title-wrap">
            <span className="hero-side mono">{t.hero.sideText}</span>
            <h1 className="hero-title display">
              <span className="title-line">{t.hero.make}</span>
              <span className="title-line title-it">{t.hero.it}</span>
              <span className="title-line title-move">
                {t.hero.move}
                <span className="hero-period">{t.hero.period}</span>
              </span>
            </h1>
            <div className="hero-stamp mono">
              <span>01</span>
              <span>
                {t.hero.stampTitle}
              </span>
              <span>↘</span>
            </div>
          </div>
          <div className="hero-aside">
            <div className="hero-asterisk" aria-hidden="true">
              ✳
            </div>
            <p>{t.hero.description}</p>
            <div className="hero-actions">
              <Link className="button button-acid hard-shadow" href="/components">
                {t.hero.exploreBtn} <ArrowUpRight size={15} />
              </Link>
              <Link className="text-link" href="/docs/installation">
                {t.hero.manualBtn} <ArrowRight size={14} />
              </Link>
            </div>
            <div className="hero-live">
              <div className="hero-live-top mono">
                <span>{t.hero.liveStudy} / 014</span>
                <span>{t.hero.hoverAlter}</span>
              </div>
              <div className="hero-live-stage">
                <ComponentDemo
                  slug="scramble-text"
                  label="BUILT TO MOVE"
                  pace={1}
                  intensity={12}
                  accent="#dfff00"
                />
              </div>
              <div className="hero-live-bottom mono">
                <span>SCRAMBLE / TEXT</span>
                <span>01—{componentRegistry.length}</span>
              </div>
            </div>
          </div>
        </div>
        <a className="scroll-note mono" href="#index">
          <span>{t.hero.scrollToExplore}</span>
          <ArrowDown size={13} />
        </a>
      </section>

      <div
        className="manifesto-ticker"
        aria-label={t.ticker.join(". ")}
      >
        <InfiniteMarquee duration={35} pauseOnHover className="ticker-track" repeat={4} gap={0}>
          <span className="ticker-segment">
            {t.ticker.map((item, idx) => (
              <span key={idx} className="ticker-chunk">
                <span>{item}</span>
                <b aria-hidden="true">✳</b>
              </span>
            ))}
          </span>
        </InfiniteMarquee>
      </div>

      <section id="index" className="featured-section page-wrap">
        <div className="section-heading">
          <div>
            <span className="section-kicker">{t.catalog.kicker}</span>
            <h2 className="display">
              {t.featured.title}
            </h2>
          </div>
          <p>{t.featured.desc}</p>
          <Link
            href="/components"
            className="round-link"
            aria-label="Open the full component index"
          >
            <ArrowUpRight />
          </Link>
        </div>
        <div className="featured-grid">
          {featured.map((slug, index) => {
            const entry = componentRegistry.find((item) => item.slug === slug);
            if (!entry) return null;
            return (
              <article className={`featured-card featured-card-${index + 1}`} key={entry.slug}>
                <Link
                  href={`/components/${entry.slug}`}
                  className="featured-preview"
                  aria-label={`Explore ${entry.name}`}
                >
                  <span className="preview-index mono">
                    {String(index + 1).padStart(2, "0")} / 06
                  </span>
                  <ComponentDemo
                    slug={entry.slug}
                    label={
                      entry.name === "KineticHeadline"
                        ? "MOVE WITH INTENT"
                        : entry.name === "InfiniteMarquee"
                          ? "NO BORING UI"
                          : entry.name === "CursorTrail"
                            ? "FOLLOW THE SIGNAL"
                            : "MAKE IT MOVE"
                    }
                    pace={1}
                    intensity={12}
                    accent={index === 2 ? "#5038ff" : "#dfff00"}
                  />
                  <span className="preview-open mono">OPEN STUDY ↗</span>
                </Link>
                <div className="featured-card-info">
                  <div>
                    <span className="mono">{t.categories[entry.category] ?? entry.category}</span>
                    <h3>{entry.name}</h3>
                  </div>
                  <Link href={`/components/${entry.slug}`} aria-label={`View ${entry.name}`}>
                    <ArrowUpRight size={17} />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="manifesto-section page-wrap">
        <div className="manifesto-label mono">
          <span>{t.manifesto.kicker}</span>
          <span>02 / 04</span>
        </div>
        <h2 className="manifesto-title display">
          {t.manifesto.title}
        </h2>
        <div className="manifesto-bottom">
          <p>{t.manifesto.desc}</p>
          <div className="principles-grid">
            {t.manifesto.principles.map((item) => (
              <div key={item.num}>
                <b>{item.num}</b>
                <strong>{item.title}</strong>
                <span>{item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="showcase-band page-wrap">
        <div className="showcase-header">
          <span className="section-kicker">MOTION IN CONTEXT</span>
          <Link href="/showcase">
            VIEW THE SHOWCASE <ArrowUpRight size={14} />
          </Link>
        </div>
        <div className="showcase-strip">
          <div className="strip-cell strip-cell-acid">
            <ComponentDemo
              slug="kinetic-headline"
              label="MAKE IT MOVE"
              pace={1}
              intensity={12}
              accent="#dfff00"
            />
          </div>
          <div className="strip-cell strip-cell-violet">
            <ComponentDemo
              slug="magnetic-button"
              label="TRY THE PULL ↗"
              pace={1}
              intensity={16}
              accent="#dfff00"
            />
          </div>
          <div className="strip-cell strip-cell-paper">
            <ComponentDemo
              slug="morphing-toggle"
              label="LIVE STATE"
              pace={1}
              intensity={12}
              accent="#dfff00"
            />
          </div>
        </div>
      </section>

      <section className="install-section page-wrap">
        <div className="install-copy">
          <span className="section-kicker">{t.install.kicker}</span>
          <h2 className="display">
            {t.install.title}
          </h2>
          <p>{t.install.desc}</p>
          <Link className="text-link" href="/docs/installation">
            HOW INSTALLATION WORKS <ArrowRight size={14} />
          </Link>
        </div>
        <div className="install-panel">
          <div className="code-panel-head mono">
            <span>TERMINAL / 01</span>
            <span>SHADCN REGISTRY</span>
          </div>
          <div className="install-code">
            <div className="install-command-wrap">
              <span className="code-prompt">$</span>
              <code>{installCommand}</code>
            </div>
            <CopyButton
              value={installCommand}
              label={t.install.copyCommand}
              className="copy-button"
            />
          </div>
          <hr />
          <pre>
            <code>{`import { MagneticButton } from "@/components/ui/magnetic-button";\n\nexport function HeroAction() {\n  return <MagneticButton>Explore components ↗</MagneticButton>;\n}`}</code>
          </pre>
          <span className="install-note mono">SOURCE FIRST / NO ACCOUNT REQUIRED</span>
        </div>
      </section>

      <section className="closing-cta page-wrap">
        <span className="mono">{componentRegistry.length} STUDIES / OPEN SOURCE / MIT</span>
        <p className="display">
          {t.closing.title}
        </p>
        <Link href="/playground" className="button button-ink">
          {t.closing.playgroundBtn} <ArrowUpRight size={15} />
        </Link>
      </section>
    </>
  );
}
