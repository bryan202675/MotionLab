"use client";

import { FieldStudy, type FieldStudyProps } from "./studies/field-study";

export type RibbonVectorProps = Omit<FieldStudyProps, "variant">;

export function RibbonVector(props: RibbonVectorProps) {
  return <FieldStudy variant="ribbon-vector" {...props} />;
}
