"use client";

import { SurfaceStudy, type SurfaceStudyProps } from "./studies/surface-study";

export type PerspectiveDeckProps = Omit<SurfaceStudyProps, "variant">;

export function PerspectiveDeck(props: PerspectiveDeckProps) {
  return <SurfaceStudy variant="perspective-deck" {...props} />;
}
