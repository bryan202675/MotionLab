"use client";

import { ControlStudy, type ControlStudyProps } from "./studies/control-study";

export type SegmentedSwitchProps = Omit<ControlStudyProps, "variant">;

export function SegmentedSwitch(props: SegmentedSwitchProps) {
  return <ControlStudy variant="segmented-switch" {...props} />;
}
