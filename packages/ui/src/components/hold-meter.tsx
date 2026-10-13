"use client";

import { ControlStudy, type ControlStudyProps } from "./studies/control-study";

export type HoldMeterProps = Omit<ControlStudyProps, "variant">;

export function HoldMeter(props: HoldMeterProps) {
  return <ControlStudy variant="hold-meter" {...props} />;
}
