"use client";

import { FieldStudy, type FieldStudyProps } from "./studies/field-study";

export type SignalHorizonProps = Omit<FieldStudyProps, "variant">;

export function SignalHorizon(props: SignalHorizonProps) {
  return <FieldStudy variant="signal-horizon" {...props} />;
}
