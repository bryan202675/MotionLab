"use client";

import { SurfaceStudy, type SurfaceStudyProps } from "./studies/surface-study";

export type MagazineSpreadProps = Omit<SurfaceStudyProps, "variant">;

export function MagazineSpread(props: MagazineSpreadProps) {
  return <SurfaceStudy variant="magazine-spread" {...props} />;
}
