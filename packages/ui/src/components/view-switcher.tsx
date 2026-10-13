"use client";

import { LayoutStudy, type LayoutStudyProps } from "./studies/layout-study";

export type ViewSwitcherProps = Omit<LayoutStudyProps, "variant">;

export function ViewSwitcher(props: ViewSwitcherProps) {
  return <LayoutStudy variant="view-switcher" {...props} />;
}
