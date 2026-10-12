"use client";

import { LayoutStudy, type LayoutStudyProps } from "./studies/layout-study";

export type SplitNavigationProps = Omit<LayoutStudyProps, "variant">;

export function SplitNavigation(props: SplitNavigationProps) {
  return <LayoutStudy variant="split-navigation" {...props} />;
}
