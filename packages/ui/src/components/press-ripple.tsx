"use client";

import { ControlStudy, type ControlStudyProps } from "./studies/control-study";

export type PressRippleProps = Omit<ControlStudyProps, "variant">;

export function PressRipple(props: PressRippleProps) {
  return <ControlStudy variant="press-ripple" {...props} />;
}
