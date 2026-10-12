"use client";

import { FieldStudy, type FieldStudyProps } from "./studies/field-study";

export type CrosshairFieldProps = Omit<FieldStudyProps, "variant">;

export function CrosshairField(props: CrosshairFieldProps) {
  return <FieldStudy variant="crosshair-field" {...props} />;
}
