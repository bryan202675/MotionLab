import type { Metadata } from "next";

export const metadata: Metadata = { title: "Changelog", description: "MotionLab release notes." };

export default function ChangelogPage() {
  return (
    <article className="docs-layout page-wrap">
      <div className="docs-sidebar">
        <span className="mono">RELEASE NOTES</span>
        <p>VOL. 001 / PRE-RELEASE</p>
      </div>
      <div className="docs-article">
        <span className="section-kicker">CHANGELOG / 2026</span>
        <h1 className="display">
          WHAT
          <br />
          MOVED.
        </h1>
        <p className="docs-lede">A factual record of the work shipped to this repository.</p>
        <section className="docs-section">
          <span>0.2.0 / MOTION STUDY TOOLKIT</span>
          <h2>More ways to shape a system.</h2>
          <ul>
            <li>Added 14 original MotionLab controls, timing references, and preview utilities.</li>
            <li>Added keyboard and reduced-motion support to the new interactive studies.</li>
            <li>Expanded the component catalog and generated install registry to 38 items.</li>
          </ul>
        </section>
        <section className="docs-section">
          <span>0.1.0 / FIRST WORKING EDITION</span>
          <h2>The lab is open.</h2>
          <ul>
            <li>Added 24 original React motion components with independent source files.</li>
            <li>
              Added the catalog, component API pages, live preview controls, and global playground.
            </li>
            <li>Added three live composition studies and seven documentation routes.</li>
            <li>
              Added a shadcn-compatible GitHub registry and local static registry payload builder.
            </li>
            <li>Added clear, dark, and system theme selection with reduced-motion behavior.</li>
          </ul>
        </section>
      </div>
    </article>
  );
}
