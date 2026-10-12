"use client";

import { SurfaceStudy, type SurfaceStudyProps } from "./studies/surface-study";

export type StackRevealProps = Omit<SurfaceStudyProps, "variant">;

export function StackReveal(props: StackRevealProps) {
  return <SurfaceStudy variant="stack-reveal" {...props} />;
}
