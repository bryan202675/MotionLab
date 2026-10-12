"use client";

import { ControlStudy, type ControlStudyProps } from "./studies/control-study";

export type RepeatButtonProps = Omit<ControlStudyProps, "variant">;

export function RepeatButton(props: RepeatButtonProps) {
  return <ControlStudy variant="repeat-button" {...props} />;
}
