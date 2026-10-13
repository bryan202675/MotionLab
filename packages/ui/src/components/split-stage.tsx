"use client";

import { LayoutStudy, type LayoutStudyProps } from "./studies/layout-study";

export type SplitStageProps = Omit<LayoutStudyProps, "variant">;

export function SplitStage(props: SplitStageProps) {
  return <LayoutStudy variant="split-stage" {...props} />;
}
