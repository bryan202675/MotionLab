"use client";

import { FieldStudy, type FieldStudyProps } from "./studies/field-study";

export type WaveGridProps = Omit<FieldStudyProps, "variant">;

export function WaveGrid(props: WaveGridProps) {
  return <FieldStudy variant="wave-grid" {...props} />;
}
