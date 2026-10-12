"use client";

import { SurfaceStudy, type SurfaceStudyProps } from "./studies/surface-study";

export type FlipPanelProps = Omit<SurfaceStudyProps, "variant">;

export function FlipPanel(props: FlipPanelProps) {
  return <SurfaceStudy variant="flip-panel" {...props} />;
}
