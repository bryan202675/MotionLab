"use client";

import { FieldStudy, type FieldStudyProps } from "./studies/field-study";

export type ScanMatrixProps = Omit<FieldStudyProps, "variant">;

export function ScanMatrix(props: ScanMatrixProps) {
  return <FieldStudy variant="scan-matrix" {...props} />;
}
