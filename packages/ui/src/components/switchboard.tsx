"use client";

import { LayoutStudy, type LayoutStudyProps } from "./studies/layout-study";

export type SwitchboardProps = Omit<LayoutStudyProps, "variant">;

export function Switchboard(props: SwitchboardProps) {
  return <LayoutStudy variant="switchboard" {...props} />;
}
