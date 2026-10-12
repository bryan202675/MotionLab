"use client";

import { FieldStudy, type FieldStudyProps } from "./studies/field-study";

export type ContourDriftProps = Omit<FieldStudyProps, "variant">;

export function ContourDrift(props: ContourDriftProps) {
  return <FieldStudy variant="contour-drift" {...props} />;
}
