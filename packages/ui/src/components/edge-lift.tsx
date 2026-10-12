"use client";

import { SurfaceStudy, type SurfaceStudyProps } from "./studies/surface-study";

export type EdgeLiftProps = Omit<SurfaceStudyProps, "variant">;

export function EdgeLift(props: EdgeLiftProps) {
  return <SurfaceStudy variant="edge-lift" {...props} />;
}
