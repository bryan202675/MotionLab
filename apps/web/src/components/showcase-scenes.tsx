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
import { useLanguage } from "./language-provider";

export function ShowcaseScenes() {
  const [tab, setTab] = useState("overview");
  const { language, t } = useLanguage();
  const sc = t.showcase;

  return (
    <div className="showcase-page page-wrap">
      <div className="showcase-intro">
        <span className="section-kicker">{sc.kicker}</span>
        <h1 className="display">
          {sc.title1}
          <br />
          <span>{sc.title2}</span>
        </h1>
        <p>{sc.desc}</p>
      </div>

      <article className="showcase-experience">
        <div className="experience-meta">
          <span className="mono">{sc.exp1.badge}</span>
          <h2>{sc.exp1.title}</h2>
          <span className="mono">{sc.exp1.tag}</span>
        </div>
        <div className="product-scene">
          <div className="scene-nav mono">
            <b>FIELDNOTES®</b>
            <span>{sc.exp1.navObj}</span>
            <button type="button" aria-label="Open scene menu">
              <Menu size={18} />
            </button>
          </div>
          <div className="product-scene-main">
            <span className="mono">{sc.exp1.kicker}</span>
            <KineticHeadline
              text={sc.exp1.headline}
              stagger={0.07}
              className="product-headline display"
            />
            <p>{sc.exp1.desc}</p>
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
                {sc.exp1.exploreBtn} ↗
              </MagneticButton>
              <Link href="/components/magnetic-button">{sc.exp1.seeMagnetic}</Link>
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
                {sc.exp1.cardTitle}
                <br />
                {sc.exp1.cardNo}
              </TiltCard>
              <div className="scene-art-caption mono">{sc.exp1.cardCaption}</div>
            </div>
          </div>
          <InfiniteMarquee className="scene-marquee" duration={20}>
            <span className="mono">
              {sc.exp1.ticker.join(" — ")} —
            </span>
          </InfiniteMarquee>
        </div>
        <div className="experience-components">
          <span className="mono">{sc.exp1.componentsUsed}</span>
          <Link href="/components/kinetic-headline">KineticHeadline</Link>
          <Link href="/components/magnetic-button">MagneticButton</Link>
          <Link href="/components/infinite-marquee">InfiniteMarquee</Link>
          <Link href="/components/tilt-card">TiltCard</Link>
        </div>
      </article>

      <article className="showcase-experience">
        <div className="experience-meta">
          <span className="mono">{sc.exp2.badge}</span>
          <h2>{sc.exp2.title}</h2>
          <span className="mono">{sc.exp2.tag}</span>
        </div>
        <div className="portfolio-scene">
          <CursorTrail color="#dfff00" />
          <div className="portfolio-top mono">
            <span>{language === "es" ? "MOTIONLAB / INGENIERÍA CREATIVA" : "MOTIONLAB / CREATIVE ENGINEER"}</span>
            <span>{language === "es" ? "DISPONIBLE PARA PROYECTOS SELECTOS" : "AVAILABLE FOR SELECT PROJECTS"}</span>
          </div>
          <div className="portfolio-hero">
            <span className="mono">{language === "es" ? "SISTEMAS DE DISEÑO × MOVIMIENTO" : "DESIGN SYSTEMS × MOTION"}</span>
            <SplitReveal
              text={language === "es" ? "Haz que las ideas\nse sientan vivas." : "Make ideas\nfeel alive."}
              className="portfolio-headline display"
            />
            <p>{sc.exp2.desc}</p>
            <ScrambleText
              className="portfolio-signal mono"
              trigger="hover"
              text={language === "es" ? "PASA EL CURSOR PARA DESCIFRAR → TRABAJOS SELECCIONADOS" : "HOVER TO DECODE → SELECTED WORKS"}
            />
          </div>
          <SpotlightCard className="portfolio-card" color="rgba(223,255,0,.22)">
            <span className="mono">FEATURED / 001</span>
            <h3>
              {language === "es" ? (
                <>
                  Señales
                  <br />
                  en movimiento.
                </>
              ) : (
                <>
                  Signals
                  <br />
                  in motion.
                </>
              )}
            </h3>
            <Link href="/components/spotlight-card">
              {language === "es" ? "ABRIR CASO DE ESTUDIO" : "OPEN CASE STUDY"} <ArrowUpRight size={14} />
            </Link>
          </SpotlightCard>
        </div>
        <div className="experience-components">
          <span className="mono">{sc.exp2.componentsUsed}</span>
          <Link href="/components/split-reveal">SplitReveal</Link>
          <Link href="/components/scramble-text">ScrambleText</Link>
          <Link href="/components/spotlight-card">SpotlightCard</Link>
          <Link href="/components/cursor-trail">CursorTrail</Link>
        </div>
      </article>

      <article className="showcase-experience">
        <div className="experience-meta">
          <span className="mono">{sc.exp3.badge}</span>
          <h2>{sc.exp3.title}</h2>
          <span className="mono">{sc.exp3.tag}</span>
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
            <button type="button" aria-label="Toggle dashboard menu">⌘</button>
          </aside>
          <div className="dashboard-main">
            <div className="dashboard-heading">
              <div>
                <span className="mono">
                  {language === "es" ? "LUNES / 12 OCT 2026" : "MONDAY / 12 OCT 2026"}
                </span>
                <h3>{language === "es" ? "Buenos días, equipo." : "Good morning, team."}</h3>
              </div>
              <PressableButton variant="acid" size="sm">
                {language === "es" ? "NUEVO REPORTE +" : "NEW REPORT +"}
              </PressableButton>
            </div>
            <SlidingTabs
              label="Dashboard sections"
              value={tab}
              onValueChange={setTab}
              tabs={[
                {
                  id: "overview",
                  label: language === "es" ? "Visión general" : "Overview",
                  content: (
                    <DashboardPanel
                      title={language === "es" ? "Tu semana, en movimiento." : "Your week, in motion."}
                      subtitle={language === "es" ? "Mantén el trabajo clave en marcha." : "Keep the important work moving."}
                    />
                  ),
                },
                {
                  id: "activity",
                  label: language === "es" ? "Actividad" : "Activity",
                  content: (
                    <DashboardPanel
                      title={language === "es" ? "Actividad reciente." : "Recent activity."}
                      subtitle={language === "es" ? "Registros de eventos en tiempo real." : "Real-time event feeds."}
                    />
                  ),
                },
                {
                  id: "team",
                  label: language === "es" ? "Equipo" : "Team",
                  content: (
                    <DashboardPanel
                      title={language === "es" ? "Señales del equipo." : "Team signals."}
                      subtitle={language === "es" ? "Disponibilidad y sincronización continua." : "Continuous availability and sync."}
                    />
                  ),
                },
              ]}
            />
            <div className="dashboard-bottom">
              <ExpandableCard
                title={language === "es" ? "Esta semana" : "This week"}
                summary={language === "es" ? "4 proyectos activos" : "4 active projects"}
              >
                <p>
                  {language === "es"
                    ? "Tres hitos avanzan a tiempo. Uno requiere revisión."
                    : "Three milestones are on track. One needs a review."}
                </p>
              </ExpandableCard>
              <div>
                <span className="mono">{language === "es" ? "VISTA PREVIA DE MOVIMIENTO" : "MOTION PREVIEW"}</span>
                <MorphingToggle
                  label={language === "es" ? "Activar movimiento" : "Enable motion"}
                  defaultChecked
                />
              </div>
            </div>
            <BrutalistAccordion
              items={[
                {
                  id: "note",
                  title: language === "es" ? "Nota del sistema" : "System note",
                  content: (
                    <p>
                      {language === "es"
                        ? "Las transiciones respetan la configuración de movimiento reducido del usuario."
                        : "Transitions honor the viewer’s reduced-motion setting."}
                    </p>
                  ),
                },
              ]}
            />
          </div>
        </div>
        <div className="experience-components">
          <span className="mono">{sc.exp3.componentsUsed}</span>
          <Link href="/components/sliding-tabs">SlidingTabs</Link>
          <Link href="/components/pressable-button">PressableButton</Link>
          <Link href="/components/morphing-toggle">MorphingToggle</Link>
          <Link href="/components/expandable-card">ExpandableCard</Link>
        </div>
      </article>
    </div>
  );
}

function DashboardPanel({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="dashboard-panel">
      <div>
        <span className="mono">FOCUS WINDOW / 07 DAYS</span>
        <h4>{title}</h4>
        <p>{subtitle}</p>
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
