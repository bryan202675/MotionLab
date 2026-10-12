"use client";

import { SurfaceStudy, type SurfaceStudyProps } from "./studies/surface-study";

export type DepthFrameProps = Omit<SurfaceStudyProps, "variant">;

export function DepthFrame(props: DepthFrameProps) {
  return <SurfaceStudy variant="depth-frame" {...props} />;
}
