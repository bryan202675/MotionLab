"use client";

import { ControlStudy, type ControlStudyProps } from "./studies/control-study";

export type RangeMarkerProps = Omit<ControlStudyProps, "variant">;

export function RangeMarker(props: RangeMarkerProps) {
  return <ControlStudy variant="range-marker" {...props} />;
}
