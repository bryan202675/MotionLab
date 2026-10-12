"use client";

import { LayoutStudy, type LayoutStudyProps } from "./studies/layout-study";

export type TimelineStopsProps = Omit<LayoutStudyProps, "variant">;

export function TimelineStops(props: TimelineStopsProps) {
  return <LayoutStudy variant="timeline-stops" {...props} />;
}
