"use client";

import { SurfaceStudy, type SurfaceStudyProps } from "./studies/surface-study";

export type TensionPanelProps = Omit<SurfaceStudyProps, "variant">;

export function TensionPanel(props: TensionPanelProps) {
  return <SurfaceStudy variant="tension-panel" {...props} />;
}
