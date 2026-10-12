"use client";

import { ControlStudy, type ControlStudyProps } from "./studies/control-study";

export type KeycapGridProps = Omit<ControlStudyProps, "variant">;

export function KeycapGrid(props: KeycapGridProps) {
  return <ControlStudy variant="keycap-grid" {...props} />;
}
