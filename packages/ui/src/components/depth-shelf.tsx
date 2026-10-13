"use client";

import { SurfaceStudy, type SurfaceStudyProps } from "./studies/surface-study";

export type DepthShelfProps = Omit<SurfaceStudyProps, "variant">;

export function DepthShelf(props: DepthShelfProps) {
  return <SurfaceStudy variant="depth-shelf" {...props} />;
}
