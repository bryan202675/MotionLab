"use client";

import { FieldStudy, type FieldStudyProps } from "./studies/field-study";

export type RippleBasinProps = Omit<FieldStudyProps, "variant">;

export function RippleBasin(props: RippleBasinProps) {
  return <FieldStudy variant="ripple-basin" {...props} />;
}
