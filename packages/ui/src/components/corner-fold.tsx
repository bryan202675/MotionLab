"use client";

import { SurfaceStudy, type SurfaceStudyProps } from "./studies/surface-study";

export type CornerFoldProps = Omit<SurfaceStudyProps, "variant">;

export function CornerFold(props: CornerFoldProps) {
  return <SurfaceStudy variant="corner-fold" {...props} />;
}
