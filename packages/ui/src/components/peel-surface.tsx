"use client";

import { SurfaceStudy, type SurfaceStudyProps } from "./studies/surface-study";

export type PeelSurfaceProps = Omit<SurfaceStudyProps, "variant">;

export function PeelSurface(props: PeelSurfaceProps) {
  return <SurfaceStudy variant="peel-surface" {...props} />;
}
