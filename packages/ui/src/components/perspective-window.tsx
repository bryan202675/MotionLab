"use client";

import { SurfaceStudy, type SurfaceStudyProps } from "./studies/surface-study";

export type PerspectiveWindowProps = Omit<SurfaceStudyProps, "variant">;

export function PerspectiveWindow(props: PerspectiveWindowProps) {
  return <SurfaceStudy variant="perspective-window" {...props} />;
}
