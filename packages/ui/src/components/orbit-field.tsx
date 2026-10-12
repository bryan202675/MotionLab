"use client";

import { FieldStudy, type FieldStudyProps } from "./studies/field-study";

export type OrbitFieldProps = Omit<FieldStudyProps, "variant">;

export function OrbitField(props: OrbitFieldProps) {
  return <FieldStudy variant="orbit-field" {...props} />;
}
