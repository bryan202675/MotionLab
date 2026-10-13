"use client";

import { ControlStudy, type ControlStudyProps } from "./studies/control-study";

export type PrecisionScrubProps = Omit<ControlStudyProps, "variant">;

export function PrecisionScrub(props: PrecisionScrubProps) {
  return <ControlStudy variant="precision-scrub" {...props} />;
}
