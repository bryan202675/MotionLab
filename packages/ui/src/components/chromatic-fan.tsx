"use client";

import { FieldStudy, type FieldStudyProps } from "./studies/field-study";

export type ChromaticFanProps = Omit<FieldStudyProps, "variant">;

export function ChromaticFan(props: ChromaticFanProps) {
  return <FieldStudy variant="chromatic-fan" {...props} />;
}
