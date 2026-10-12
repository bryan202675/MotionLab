"use client";

import { ControlStudy, type ControlStudyProps } from "./studies/control-study";

export type HoldConfirmProps = Omit<ControlStudyProps, "variant">;

export function HoldConfirm(props: HoldConfirmProps) {
  return <ControlStudy variant="hold-confirm" {...props} />;
}
