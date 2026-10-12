"use client";

import { SurfaceStudy, type SurfaceStudyProps } from "./studies/surface-study";

export type FocusTileProps = Omit<SurfaceStudyProps, "variant">;

export function FocusTile(props: FocusTileProps) {
  return <SurfaceStudy variant="focus-tile" {...props} />;
}
