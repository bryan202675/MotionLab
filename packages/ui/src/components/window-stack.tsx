"use client";

import { SurfaceStudy, type SurfaceStudyProps } from "./studies/surface-study";

export type WindowStackProps = Omit<SurfaceStudyProps, "variant">;

export function WindowStack(props: WindowStackProps) {
  return <SurfaceStudy variant="window-stack" {...props} />;
}
