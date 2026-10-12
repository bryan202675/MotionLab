"use client";

import { FieldStudy, type FieldStudyProps } from "./studies/field-study";

export type PetalArrayProps = Omit<FieldStudyProps, "variant">;

export function PetalArray(props: PetalArrayProps) {
  return <FieldStudy variant="petal-array" {...props} />;
}
