"use client";

import { LayoutStudy, type LayoutStudyProps } from "./studies/layout-study";

export type ProgressPathProps = Omit<LayoutStudyProps, "variant">;

export function ProgressPath(props: ProgressPathProps) {
  return <LayoutStudy variant="progress-path" {...props} />;
}
