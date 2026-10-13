"use client";

import { SurfaceStudy, type SurfaceStudyProps } from "./studies/surface-study";

export type DriftPanelProps = Omit<SurfaceStudyProps, "variant">;

export function DriftPanel(props: DriftPanelProps) {
  return <SurfaceStudy variant="drift-panel" {...props} />;
}
