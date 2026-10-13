"use client";

import { LayoutStudy, type LayoutStudyProps } from "./studies/layout-study";

export type PillNavigationProps = Omit<LayoutStudyProps, "variant">;

export function PillNavigation(props: PillNavigationProps) {
  return <LayoutStudy variant="pill-navigation" {...props} />;
}
