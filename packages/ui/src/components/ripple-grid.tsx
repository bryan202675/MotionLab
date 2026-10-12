"use client";

import { FieldStudy, type FieldStudyProps } from "./studies/field-study";

export type RippleGridProps = Omit<FieldStudyProps, "variant">;

export function RippleGrid(props: RippleGridProps) {
  return <FieldStudy variant="ripple-grid" {...props} />;
}
