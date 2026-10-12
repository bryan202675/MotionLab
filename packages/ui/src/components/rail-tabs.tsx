"use client";

import { LayoutStudy, type LayoutStudyProps } from "./studies/layout-study";

export type RailTabsProps = Omit<LayoutStudyProps, "variant">;

export function RailTabs(props: RailTabsProps) {
  return <LayoutStudy variant="rail-tabs" {...props} />;
}
