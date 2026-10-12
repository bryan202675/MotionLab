"use client";

import { LayoutStudy, type LayoutStudyProps } from "./studies/layout-study";

export type StepTrackProps = Omit<LayoutStudyProps, "variant">;

export function StepTrack(props: StepTrackProps) {
  return <LayoutStudy variant="step-track" {...props} />;
}
