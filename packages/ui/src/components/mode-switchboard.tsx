"use client";

import { LayoutStudy, type LayoutStudyProps } from "./studies/layout-study";

export type ModeSwitchboardProps = Omit<LayoutStudyProps, "variant">;

export function ModeSwitchboard(props: ModeSwitchboardProps) {
  return <LayoutStudy variant="mode-switchboard" {...props} />;
}
