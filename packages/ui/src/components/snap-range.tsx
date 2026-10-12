"use client";

import { ControlStudy, type ControlStudyProps } from "./studies/control-study";

export type SnapRangeProps = Omit<ControlStudyProps, "variant">;

export function SnapRange(props: SnapRangeProps) {
  return <ControlStudy variant="snap-range" {...props} />;
}
