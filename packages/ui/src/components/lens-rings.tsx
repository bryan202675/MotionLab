"use client";

import { FieldStudy, type FieldStudyProps } from "./studies/field-study";

export type LensRingsProps = Omit<FieldStudyProps, "variant">;

export function LensRings(props: LensRingsProps) {
  return <FieldStudy variant="lens-rings" {...props} />;
}
