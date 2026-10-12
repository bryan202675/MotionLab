"use client";

import { SurfaceStudy, type SurfaceStudyProps } from "./studies/surface-study";

export type DepthWindowProps = Omit<SurfaceStudyProps, "variant">;

export function DepthWindow(props: DepthWindowProps) {
  return <SurfaceStudy variant="depth-window" {...props} />;
}
