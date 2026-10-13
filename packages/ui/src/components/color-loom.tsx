"use client";

import { FieldStudy, type FieldStudyProps } from "./studies/field-study";

export type ColorLoomProps = Omit<FieldStudyProps, "variant">;

export function ColorLoom(props: ColorLoomProps) {
  return <FieldStudy variant="color-loom" {...props} />;
}
