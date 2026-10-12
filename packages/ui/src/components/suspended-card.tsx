"use client";

import { SurfaceStudy, type SurfaceStudyProps } from "./studies/surface-study";

export type SuspendedCardProps = Omit<SurfaceStudyProps, "variant">;

export function SuspendedCard(props: SuspendedCardProps) {
  return <SurfaceStudy variant="suspended-card" {...props} />;
}
