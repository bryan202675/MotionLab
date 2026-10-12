"use client";

import { ControlStudy, type ControlStudyProps } from "./studies/control-study";

export type ModePillsProps = Omit<ControlStudyProps, "variant">;

export function ModePills(props: ModePillsProps) {
  return <ControlStudy variant="mode-pills" {...props} />;
}
