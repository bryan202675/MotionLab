"use client";

import { LayoutStudy, type LayoutStudyProps } from "./studies/layout-study";

export type SequenceGridProps = Omit<LayoutStudyProps, "variant">;

export function SequenceGrid(props: SequenceGridProps) {
  return <LayoutStudy variant="sequence-grid" {...props} />;
}
