"use client";

import { FieldStudy, type FieldStudyProps } from "./studies/field-study";

export type SoftGridlightProps = Omit<FieldStudyProps, "variant">;

export function SoftGridlight(props: SoftGridlightProps) {
  return <FieldStudy variant="soft-gridlight" {...props} />;
}
