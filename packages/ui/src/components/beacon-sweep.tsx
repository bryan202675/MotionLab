"use client";

import { FieldStudy, type FieldStudyProps } from "./studies/field-study";

export type BeaconSweepProps = Omit<FieldStudyProps, "variant">;

export function BeaconSweep(props: BeaconSweepProps) {
  return <FieldStudy variant="beacon-sweep" {...props} />;
}
