"use client";

import { FieldStudy, type FieldStudyProps } from "./studies/field-study";

export type MoireWindowProps = Omit<FieldStudyProps, "variant">;

export function MoireWindow(props: MoireWindowProps) {
  return <FieldStudy variant="moire-window" {...props} />;
}
