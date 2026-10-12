"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Menu } from "lucide-react";
import { BrutalistAccordion } from "@motionlab/ui/brutalist-accordion";
import { CursorTrail } from "@motionlab/ui/cursor-trail";
import { ExpandableCard } from "@motionlab/ui/expandable-card";
import { InfiniteMarquee } from "@motionlab/ui/infinite-marquee";
import { KineticHeadline } from "@motionlab/ui/kinetic-headline";
import { MagneticButton } from "@motionlab/ui/magnetic-button";
import { MorphingToggle } from "@motionlab/ui/morphing-toggle";
import { PressableButton } from "@motionlab/ui/pressable-button";
import { SlidingTabs } from "@motionlab/ui/sliding-tabs";
import { SpotlightCard } from "@motionlab/ui/spotlight-card";
import { SplitReveal } from "@motionlab/ui/split-reveal";
import { TiltCard } from "@motionlab/ui/tilt-card";
import { ScrambleText } from "@motionlab/ui/scramble-text";

export function ShowcaseScenes() {
  const [tab, setTab] = useState("overview");
  return (
    <div className="showcase-page page-wrap">
      <div className="showcase-intro">
        <span className="section-kicker">THREE COMPOSITIONS / ALL LIVE</span>
        <h1 className="display">
          SHOW, DON’T
          <br />
          <span>SCREENSHOT.</span>
        </h1>
        <p>
          Complete scenes made from working MotionLab components. Pull one apart, then use the
          pieces in your own interface.
        </p>
      </div>
      <article className="showcase-experience">
        <div className="experience-meta">
          <span className="mono">EXPERIENCE / 01</span>
          <h2>BRUTALIST PRODUCT LANDING</h2>
          <span className="mono">PRODUCT / MOTION</span>
        </div>
        <div className="product-scene">
          <div className="scene-nav mono">
            <b>FIELDNOTES®</b>
            <span>OBJECTS / 001—024</span>
            <button aria-label="Open scene menu">
              <Menu size={18} />
            </button>
          </div>
          <div className="product-scene-main">
            <span className="mono">TOOLS FOR THE RESTLESS</span>
            <KineticHeadline
              text="Make a mark."
              stagger={0.07}
              className="product-headline display"
            />
            <p>
              Small instruments for big ideas. Built from curiosity. Ready for whatever comes next.
            </p>
            <div className="scene-actions">
              <MagneticButton
                strength={0.18}
                style={{
                  padding: "14px 20px",
                  border: "2px solid #101010",
                  background: "#dfff00",
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                Explore the set ↗
              </MagneticButton>
              <Link href="/components/magnetic-button">SEE THE MAGNETIC BUTTON</Link>
            </div>
            <div className="product-scene-art">
              <TiltCard
                intensity={9}
                style={{
                  width: 180,
                  height: 170,
                  padding: 18,
                  display: "flex",
                  alignItems: "end",
                  border: "2px solid #101010",
                  background: "#5038ff",
                  color: "white",
                  font: "900 30px/0.9 var(--font-display)",
                }}
              >
                OBJECT
                <br />
                NO. 01
              </TiltCard>
              <div className="scene-art-caption mono">FORM FOLLOWS FEELING / 2026</div>
            </div>
          </div>
          <InfiniteMarquee className="scene-marquee" duration={20}>
            <span className="mono">DESIGNED TO BE USED — MADE TO BE KEPT —</span>
          </InfiniteMarquee>
        </div>
        <div className="experience-components">
          <span className="mono">COMPONENTS USED</span>
          <Link href="/components/kinetic-headline">KineticHeadline</Link>
          <Link href="/components/magnetic-button">MagneticButton</Link>
          <Link href="/components/infinite-marquee">InfiniteMarquee</Link>
          <Link href="/components/tilt-card">TiltCard</Link>
        </div>
      </article>

      <article className="showcase-experience">
        <div className="experience-meta">
          <span className="mono">EXPERIENCE / 02</span>
          <h2>EXPERIMENTAL PORTFOLIO HERO</h2>
          <span className="mono">PORTFOLIO / CREATIVE</span>
        </div>
        <div className="portfolio-scene">
          <CursorTrail color="#dfff00" />
          <div className="portfolio-top mono">
            <span>MOTIONLAB / CREATIVE ENGINEER</span>
            <span>AVAILABLE FOR SELECT PROJECTS</span>
          </div>
          <div className="portfolio-hero">
            <span className="mono">DESIGN SYSTEMS × MOTION</span>
            <SplitReveal text={"Make ideas\nfeel alive."} className="portfolio-headline display" />
            <p>Experiments in interaction, identity, and the space between them.</p>
            <ScrambleText
              className="portfolio-signal mono"
              trigger="hover"
              text="HOVER TO DECODE → SELECTED WORKS"
            />
          </div>
          <SpotlightCard className="portfolio-card" color="rgba(223,255,0,.22)">
            <span className="mono">FEATURED / 001</span>
            <h3>
              Signals
              <br />
              in motion.
            </h3>
            <Link href="/components/spotlight-card">
              OPEN CASE STUDY <ArrowUpRight size={14} />
            </Link>
          </SpotlightCard>
        </div>
        <div className="experience-components">
          <span className="mono">COMPONENTS USED</span>
          <Link href="/components/split-reveal">SplitReveal</Link>
          <Link href="/components/scramble-text">ScrambleText</Link>
          <Link href="/components/spotlight-card">SpotlightCard</Link>
          <Link href="/components/cursor-trail">CursorTrail</Link>
        </div>
      </article>

      <article className="showcase-experience">
        <div className="experience-meta">
          <span className="mono">EXPERIENCE / 03</span>
          <h2>INTERACTIVE DASHBOARD HEADER</h2>
          <span className="mono">DASHBOARD / PRODUCT</span>
        </div>
        <div className="dashboard-scene">
          <aside className="dashboard-rail">
            <b className="mono">UNIT/08</b>
            <span className="dashboard-avatar">B</span>
            <span className="mono">
              PROJECT
              <br />
              ORBIT
            </span>
            <button aria-label="Toggle dashboard menu">⌘</button>
          </aside>
          <div className="dashboard-main">
            <div className="dashboard-heading">
              <div>
                <span className="mono">MONDAY / 12 OCT 2026</span>
                <h3>Good morning, team.</h3>
              </div>
              <PressableButton variant="acid" size="sm">
                NEW REPORT +
              </PressableButton>
            </div>
            <SlidingTabs
              label="Dashboard sections"
              value={tab}
              onValueChange={setTab}
              tabs={[
                {
                  id: "overview",
                  label: "Overview",
                  content: <DashboardPanel title="Your week, in motion." />,
                },
                {
                  id: "activity",
                  label: "Activity",
                  content: <DashboardPanel title="Recent activity." />,
                },
                { id: "team", label: "Team", content: <DashboardPanel title="Team signals." /> },
              ]}
            />
            <div className="dashboard-bottom">
              <ExpandableCard title="This week" summary="4 active projects">
                <p>Three milestones are on track. One needs a review.</p>
              </ExpandableCard>
              <div>
                <span className="mono">MOTION PREVIEW</span>
                <MorphingToggle label="Enable motion" defaultChecked />
              </div>
            </div>
            <BrutalistAccordion
              items={[
                {
                  id: "note",
                  title: "System note",
                  content: <p>Transitions honor the viewer’s reduced-motion setting.</p>,
                },
              ]}
            />
          </div>
        </div>
        <div className="experience-components">
          <span className="mono">COMPONENTS USED</span>
          <Link href="/components/sliding-tabs">SlidingTabs</Link>
          <Link href="/components/pressable-button">PressableButton</Link>
          <Link href="/components/morphing-toggle">MorphingToggle</Link>
          <Link href="/components/expandable-card">ExpandableCard</Link>
        </div>
      </article>
    </div>
  );
}

function DashboardPanel({ title }: { title: string }) {
  return (
    <div className="dashboard-panel">
      <div>
        <span className="mono">FOCUS WINDOW / 07 DAYS</span>
        <h4>{title}</h4>
        <p>Keep the important work moving.</p>
      </div>
      <div className="dashboard-bars" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
        <i />
        <i />
        <i />
      </div>
    </div>
  );
}
