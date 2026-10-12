"use client";

import { ControlStudy, type ControlStudyProps } from "./studies/control-study";

export type GainRailProps = Omit<ControlStudyProps, "variant">;

export function GainRail(props: GainRailProps) {
  return <ControlStudy variant="gain-rail" {...props} />;
}
