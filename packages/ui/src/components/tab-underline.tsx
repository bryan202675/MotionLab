"use client";

import { LayoutStudy, type LayoutStudyProps } from "./studies/layout-study";

export type TabUnderlineProps = Omit<LayoutStudyProps, "variant">;

export function TabUnderline(props: TabUnderlineProps) {
  return <LayoutStudy variant="tab-underline" {...props} />;
}
