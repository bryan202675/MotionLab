"use client";

import { ControlStudy, type ControlStudyProps } from "./studies/control-study";

export type RangeDuoProps = Omit<ControlStudyProps, "variant">;

export function RangeDuo(props: RangeDuoProps) {
  return <ControlStudy variant="range-duo" {...props} />;
}
