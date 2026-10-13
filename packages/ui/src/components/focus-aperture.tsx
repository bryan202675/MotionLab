"use client";

import { SurfaceStudy, type SurfaceStudyProps } from "./studies/surface-study";

export type FocusApertureProps = Omit<SurfaceStudyProps, "variant">;

export function FocusAperture(props: FocusApertureProps) {
  return <SurfaceStudy variant="focus-aperture" {...props} />;
}
