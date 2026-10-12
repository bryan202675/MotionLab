"use client";

import { ControlStudy, type ControlStudyProps } from "./studies/control-study";

export type ScrubRailProps = Omit<ControlStudyProps, "variant">;

export function ScrubRail(props: ScrubRailProps) {
  return <ControlStudy variant="scrub-rail" {...props} />;
}
