"use client";

import { ControlStudy, type ControlStudyProps } from "./studies/control-study";

export type ToggleBankProps = Omit<ControlStudyProps, "variant">;

export function ToggleBank(props: ToggleBankProps) {
  return <ControlStudy variant="toggle-bank" {...props} />;
}
