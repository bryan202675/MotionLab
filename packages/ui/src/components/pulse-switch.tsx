"use client";

import { ControlStudy, type ControlStudyProps } from "./studies/control-study";

export type PulseSwitchProps = Omit<ControlStudyProps, "variant">;

export function PulseSwitch(props: PulseSwitchProps) {
  return <ControlStudy variant="pulse-switch" {...props} />;
}
