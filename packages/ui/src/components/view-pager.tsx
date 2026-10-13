"use client";

import { LayoutStudy, type LayoutStudyProps } from "./studies/layout-study";

export type ViewPagerProps = Omit<LayoutStudyProps, "variant">;

export function ViewPager(props: ViewPagerProps) {
  return <LayoutStudy variant="view-pager" {...props} />;
}
