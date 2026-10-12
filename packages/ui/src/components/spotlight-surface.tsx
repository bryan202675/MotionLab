"use client";

import { SurfaceStudy, type SurfaceStudyProps } from "./studies/surface-study";

export type SpotlightSurfaceProps = Omit<SurfaceStudyProps, "variant">;

export function SpotlightSurface(props: SpotlightSurfaceProps) {
  return <SurfaceStudy variant="spotlight-surface" {...props} />;
}
