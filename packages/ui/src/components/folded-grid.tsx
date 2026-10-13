"use client";

import { FieldStudy, type FieldStudyProps } from "./studies/field-study";

export type FoldedGridProps = Omit<FieldStudyProps, "variant">;

export function FoldedGrid(props: FoldedGridProps) {
  return <FieldStudy variant="folded-grid" {...props} />;
}
