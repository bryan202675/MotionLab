"use client";

import { FieldStudy, type FieldStudyProps } from "./studies/field-study";

export type SignalConstellationProps = Omit<FieldStudyProps, "variant">;

export function SignalConstellation(props: SignalConstellationProps) {
  return <FieldStudy variant="signal-constellation" {...props} />;
}
