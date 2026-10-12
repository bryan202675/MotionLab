"use client";

import { SurfaceStudy, type SurfaceStudyProps } from "./studies/surface-study";

export type MagneticSurfaceProps = Omit<SurfaceStudyProps, "variant">;

export function MagneticSurface(props: MagneticSurfaceProps) {
  return <SurfaceStudy variant="magnetic-surface" {...props} />;
}
