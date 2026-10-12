"use client";

import { LayoutStudy, type LayoutStudyProps } from "./studies/layout-study";

export type FocusRailProps = Omit<LayoutStudyProps, "variant">;

export function FocusRail(props: FocusRailProps) {
  return <LayoutStudy variant="focus-rail" {...props} />;
}
