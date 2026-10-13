"use client";

import { LayoutStudy, type LayoutStudyProps } from "./studies/layout-study";

export type FocusStepsProps = Omit<LayoutStudyProps, "variant">;

export function FocusSteps(props: FocusStepsProps) {
  return <LayoutStudy variant="focus-steps" {...props} />;
}
