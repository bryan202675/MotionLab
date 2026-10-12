"use client";

import { SurfaceStudy, type SurfaceStudyProps } from "./studies/surface-study";

export type HingePanelProps = Omit<SurfaceStudyProps, "variant">;

export function HingePanel(props: HingePanelProps) {
  return <SurfaceStudy variant="hinge-panel" {...props} />;
}
