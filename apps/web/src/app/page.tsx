import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { InfiniteMarquee } from "@motionlab/ui/infinite-marquee";
import { componentRegistry } from "@/lib/component-registry";
import { ComponentDemo } from "@/components/component-demo";
import { CopyButton } from "@/components/copy-button";
import { registryItemUrl } from "@/lib/site-config";

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
  return (
    <>
      <section className="hero page-wrap">
        <div className="hero-meta mono">
          <span>REACT MOTION COMPONENT LIBRARY</span>
          <span>VOL. 001 — BUILT TO MOVE</span>
        </div>
        <div className="hero-layout">
          <div className="hero-title-wrap">
            <span className="hero-side mono">GOOD INTERFACES MOVE</span>
            <h1 className="hero-title display">
              <span className="title-line">MAKE</span>
              <span className="title-line title-it">
                IT<span className="acid-cut">IT</span>
              </span>
              <span className="title-line title-move">
                MOVE<span className="hero-period">.</span>
              </span>
            </h1>
            <div className="hero-stamp mono">
              <span>01</span>
              <span>
                EXPERIMENT
                <br />
                WITH INTENT
              </span>
              <span>↘</span>
            </div>
          </div>
          <div className="hero-aside">
            <div className="hero-asterisk" aria-hidden="true">
              ✳
            </div>
            <p>
              A collection of unapologetically animated React components. Built to experiment. Ready
              to ship.
            </p>
            <div className="hero-actions">
              <Link className="button button-acid hard-shadow" href="/components">
                EXPLORE COMPONENTS <ArrowUpRight size={15} />
              </Link>
              <Link className="text-link" href="/docs/installation">
                READ THE MANUAL <ArrowRight size={14} />
              </Link>
            </div>
            <div className="hero-live">
              <div className="hero-live-top mono">
                <span>LIVE STUDY / 014</span>
                <span>HOVER TO ALTER</span>
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
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown size={13} />
        </a>
      </section>

      <div
        className="manifesto-ticker"
        aria-label="No boring UI. Built for interaction. Copy, customize, ship. Open source motion."
      >
        <InfiniteMarquee duration={25} pauseOnHover className="ticker-track">
          <span>
            NO BORING UI <b>✳</b> BUILT FOR INTERACTION <b>✳</b> COPY. CUSTOMIZE. SHIP. <b>✳</b>{" "}
            OPEN SOURCE MOTION <b>✳</b>
          </span>
        </InfiniteMarquee>
      </div>

      <section id="index" className="featured-section page-wrap">
        <div className="section-heading">
          <div>
            <span className="section-kicker">THE COMPONENT INDEX</span>
            <h2 className="display">
              PICK A<br />
              <span>FEELING.</span>
            </h2>
          </div>
          <p>Twenty-four original motion studies. One source of truth. Every preview is alive.</p>
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
                    <span className="mono">{entry.category}</span>
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
          <span>OUR MANIFESTO</span>
          <span>02 / 04</span>
        </div>
        <h2 className="manifesto-title display">
          STATIC
          <br />
          IS NOT
          <br />
          <span>ENOUGH.</span>
        </h2>
        <div className="manifesto-bottom">
          <p>
            Motion is a material. Use it to direct attention, explain state, and make an interface
            feel considered.
          </p>
          <div className="principles-grid">
            <div>
              <b>01</b>
              <strong>Expression</strong>
              <span>Motion with a point of view.</span>
            </div>
            <div>
              <b>02</b>
              <strong>Performance</strong>
              <span>Only work that earns its frames.</span>
            </div>
            <div>
              <b>03</b>
              <strong>Access</strong>
              <span>Reduced motion is a first-class state.</span>
            </div>
            <div>
              <b>04</b>
              <strong>Reuse</strong>
              <span>Source you can own and change.</span>
            </div>
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
          <span className="section-kicker">COPY. CUSTOMIZE. SHIP.</span>
          <h2 className="display">
            YOUR CODE.
            <br />
            <span>YOUR RULES.</span>
          </h2>
          <p>
            Install individual components as source from this registry. Run MotionLab locally to use
            the command below, or set NEXT_PUBLIC_SITE_URL to its public address before building.
          </p>
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
            <span className="code-prompt">$</span>
            <code>{installCommand}</code>
            <CopyButton
              value={installCommand}
              label="Copy install command"
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
          GO BUILD
          <br />
          SOMETHING
          <br />
          <span>THAT MOVES.</span>
        </p>
        <Link href="/playground" className="button button-ink">
          BREAK IT. TUNE IT. SHIP IT. <ArrowUpRight size={15} />
        </Link>
      </section>
    </>
  );
}
