"use client";

import { ControlStudy, type ControlStudyProps } from "./studies/control-study";

export type ConfirmToggleProps = Omit<ControlStudyProps, "variant">;

export function ConfirmToggle(props: ConfirmToggleProps) {
  return <ControlStudy variant="confirm-toggle" {...props} />;
}
