"use client";

import { FieldStudy, type FieldStudyProps } from "./studies/field-study";

export type OrbitClockProps = Omit<FieldStudyProps, "variant">;

export function OrbitClock(props: OrbitClockProps) {
  return <FieldStudy variant="orbit-clock" {...props} />;
}
