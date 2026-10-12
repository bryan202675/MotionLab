"use client";

import { FieldStudy, type FieldStudyProps } from "./studies/field-study";

export type LineTopographyProps = Omit<FieldStudyProps, "variant">;

export function LineTopography(props: LineTopographyProps) {
  return <FieldStudy variant="line-topography" {...props} />;
}
