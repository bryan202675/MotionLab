"use client";

import { FieldStudy, type FieldStudyProps } from "./studies/field-study";

export type ContourPaperProps = Omit<FieldStudyProps, "variant">;

export function ContourPaper(props: ContourPaperProps) {
  return <FieldStudy variant="contour-paper" {...props} />;
}
