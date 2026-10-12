"use client";

import { LayoutStudy, type LayoutStudyProps } from "./studies/layout-study";

export type StageSelectorProps = Omit<LayoutStudyProps, "variant">;

export function StageSelector(props: StageSelectorProps) {
  return <LayoutStudy variant="stage-selector" {...props} />;
}
