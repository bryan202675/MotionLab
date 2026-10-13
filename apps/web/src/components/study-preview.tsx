"use client";

import { FieldStudy, type FieldStudyVariant } from "@motionlab/ui/studies/field-study";
import { ControlStudy, type ControlStudyVariant } from "@motionlab/ui/studies/control-study";
import { LayoutStudy, type LayoutStudyVariant } from "@motionlab/ui/studies/layout-study";
import { SurfaceStudy, type SurfaceStudyVariant } from "@motionlab/ui/studies/surface-study";
import { TextStudy, type TextStudyVariant } from "@motionlab/ui/studies/text-study";
import type { DemoProps } from "./component-demo";

interface StudyPreviewProps extends DemoProps {
  study: { family: string; variant: string };
}

export function StudyPreview({ study, label, pace, intensity, accent }: StudyPreviewProps) {
  const visibleAccent = accent.toLowerCase() === "#dfff00" ? "#5038ff" : accent;
  const shared = { label, pace, intensity, accent: visibleAccent };

  if (study.family === "text") {
    return <TextStudy {...shared} variant={study.variant as TextStudyVariant} />;
  }
  if (study.family === "control") {
    return <ControlStudy {...shared} variant={study.variant as ControlStudyVariant} />;
  }
  if (study.family === "surface") {
    return <SurfaceStudy {...shared} variant={study.variant as SurfaceStudyVariant} />;
  }
  if (study.family === "layout") {
    return <LayoutStudy {...shared} variant={study.variant as LayoutStudyVariant} />;
  }
  if (study.family === "field") {
    return <FieldStudy {...shared} variant={study.variant as FieldStudyVariant} />;
  }
  return <p role="status">Preview unavailable for this study.</p>;
}
