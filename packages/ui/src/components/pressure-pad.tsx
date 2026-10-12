"use client";

import { ControlStudy, type ControlStudyProps } from "./studies/control-study";

export type PressurePadProps = Omit<ControlStudyProps, "variant">;

export function PressurePad(props: PressurePadProps) {
  return <ControlStudy variant="pressure-pad" {...props} />;
}
