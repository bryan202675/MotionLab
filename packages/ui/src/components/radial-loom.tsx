"use client";

import { FieldStudy, type FieldStudyProps } from "./studies/field-study";

export type RadialLoomProps = Omit<FieldStudyProps, "variant">;

export function RadialLoom(props: RadialLoomProps) {
  return <FieldStudy variant="radial-loom" {...props} />;
}
