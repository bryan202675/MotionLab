"use client";

import { LayoutStudy, type LayoutStudyProps } from "./studies/layout-study";

export type StepperRailProps = Omit<LayoutStudyProps, "variant">;

export function StepperRail(props: StepperRailProps) {
  return <LayoutStudy variant="stepper-rail" {...props} />;
}
