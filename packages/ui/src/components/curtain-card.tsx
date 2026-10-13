"use client";

import { SurfaceStudy, type SurfaceStudyProps } from "./studies/surface-study";

export type CurtainCardProps = Omit<SurfaceStudyProps, "variant">;

export function CurtainCard(props: CurtainCardProps) {
  return <SurfaceStudy variant="curtain-card" {...props} />;
}
