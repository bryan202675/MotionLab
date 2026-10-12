"use client";

import { SurfaceStudy, type SurfaceStudyProps } from "./studies/surface-study";

export type StackedDeckProps = Omit<SurfaceStudyProps, "variant">;

export function StackedDeck(props: StackedDeckProps) {
  return <SurfaceStudy variant="stacked-deck" {...props} />;
}
