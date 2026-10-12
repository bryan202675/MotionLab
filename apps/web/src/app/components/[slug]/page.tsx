import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { CopyButton } from "@/components/copy-button";
import { LivePreview } from "@/components/live-preview";
import { componentRegistry, getComponent } from "@/lib/component-registry";
import { registryItemUrl } from "@/lib/site-config";

interface ComponentPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return componentRegistry.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ComponentPageProps): Promise<Metadata> {
  const { slug } = await params;
  const component = getComponent(slug);
  return component
    ? {
        title: component.name,
        description: component.description,
        openGraph: { title: `${component.name} — MotionLab`, description: component.description },
      }
    : {};
}

export default async function ComponentPage({ params }: ComponentPageProps) {
  const { slug } = await params;
  const component = getComponent(slug);
  if (!component) notFound();
  const index = componentRegistry.indexOf(component) + 1;
  const related = componentRegistry
    .filter((item) => item.category === component.category && item.slug !== slug)
    .slice(0, 3);
  const install = `pnpm dlx shadcn@latest add ${registryItemUrl(component.slug)}`;
  return (
    <article className="component-detail page-wrap">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/components">Components</Link>
        <span>/</span>
        <span aria-current="page">{component.name}</span>
      </nav>
      <div className="detail-heading">
        <div>
          <span className="section-kicker">
            {component.category} / {String(index).padStart(2, "0")} OF {componentRegistry.length}
          </span>
          <h1 className="display">{component.name.replace(/([A-Z])/g, " $1").toUpperCase()}</h1>
          <p>{component.description}</p>
        </div>
        <span className="ready-tag mono">
          <Check size={13} /> READY / SOURCE INCLUDED
        </span>
      </div>
      <LivePreview component={component} />
      <div className="detail-columns">
        <section className="detail-code-section">
          <div className="section-subhead">
            <div>
              <span className="mono">01 / INSTALL</span>
              <h2>TAKE THE SOURCE.</h2>
            </div>
            <span className="detail-dep mono">
              {component.dependencies.length
                ? component.dependencies.join(" + ")
                : "NO RUNTIME DEPENDENCY"}
            </span>
          </div>
          <div className="terminal-panel">
            <code>
              <span>$</span> {install}
            </code>
            <CopyButton value={install} className="copy-button" label="Copy install command" />
          </div>
          <p className="detail-note">
            This command points to MotionLab&apos;s published registry. Start the site locally to
            install from your local registry.
          </p>
          <div className="source-panel">
            <div className="code-panel-head mono">
              <span>USAGE / TSX</span>
              <CopyButton
                value={component.example}
                label="Copy example code"
                className="copy-button"
              />
            </div>
            <pre>
              <code>{component.example}</code>
            </pre>
          </div>
        </section>
        <section className="api-section">
          <div className="section-subhead">
            <div>
              <span className="mono">02 / API REFERENCE</span>
              <h2>THE CONTRACT.</h2>
            </div>
          </div>
          <div className="api-table-wrap">
            <table className="api-table">
              <thead>
                <tr>
                  <th>PROP</th>
                  <th>TYPE / DEFAULT</th>
                  <th>DESCRIPTION</th>
                </tr>
              </thead>
              <tbody>
                {component.props.map((prop) => (
                  <tr key={prop.name}>
                    <th scope="row">
                      <code>{prop.name}</code>
                    </th>
                    <td>
                      <code>{prop.type}</code>
                      <small>default: {prop.defaultValue}</small>
                    </td>
                    <td>{prop.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="tech-notes">
            <span className="mono">ENGINEERING NOTES</span>
            <ul>
              {component.dependencies.includes("motion") ? (
                <li>Motion&apos;s reduced-motion preference is respected where this component animates.</li>
              ) : (
                <li>No animation runtime dependency is required by this component.</li>
              )}
              <li>
                {component.dependencies.length
                  ? `Direct runtime dependencies: ${component.dependencies.join(", ")}.`
                  : "The component uses native React and browser primitives."}
              </li>
              <li>Source can be edited after installation; no runtime service is required.</li>
            </ul>
          </div>
        </section>
      </div>
      <div className="detail-footer-nav">
        <Link href="/components">
          <ArrowLeft size={15} /> BACK TO THE INDEX
        </Link>
        <Link href={`/playground?component=${component.slug}`}>
          TUNE IN THE PLAYGROUND <ArrowRight size={15} />
        </Link>
      </div>
      <section className="related-section">
        <div className="section-subhead">
          <div>
            <span className="mono">KEEP EXPLORING</span>
            <h2>RELATED STUDIES.</h2>
          </div>
          <Link href="/components">
            FULL INDEX <ArrowUpRight size={14} />
          </Link>
        </div>
        <div className="related-grid">
          {related.map((item) => (
            <Link href={`/components/${item.slug}`} key={item.slug}>
              <span className="mono">{item.category}</span>
              <strong>{item.name}</strong>
              <ArrowUpRight size={15} />
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
