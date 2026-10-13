"use client";

import { ControlStudy, type ControlStudyProps } from "./studies/control-study";

export type TempoFaderProps = Omit<ControlStudyProps, "variant">;

export function TempoFader(props: TempoFaderProps) {
  return <ControlStudy variant="tempo-fader" {...props} />;
}
