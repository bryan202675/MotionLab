"use client";

import { ControlStudy, type ControlStudyProps } from "./studies/control-study";

export type MeterTriggerProps = Omit<ControlStudyProps, "variant">;

export function MeterTrigger(props: MeterTriggerProps) {
  return <ControlStudy variant="meter-trigger" {...props} />;
}
