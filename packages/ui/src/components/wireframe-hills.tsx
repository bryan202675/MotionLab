"use client";

import { FieldStudy, type FieldStudyProps } from "./studies/field-study";

export type WireframeHillsProps = Omit<FieldStudyProps, "variant">;

export function WireframeHills(props: WireframeHillsProps) {
  return <FieldStudy variant="wireframe-hills" {...props} />;
}
