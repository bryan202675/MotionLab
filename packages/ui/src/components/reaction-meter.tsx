"use client";

import { ControlStudy, type ControlStudyProps } from "./studies/control-study";

export type ReactionMeterProps = Omit<ControlStudyProps, "variant">;

export function ReactionMeter(props: ReactionMeterProps) {
  return <ControlStudy variant="reaction-meter" {...props} />;
}
