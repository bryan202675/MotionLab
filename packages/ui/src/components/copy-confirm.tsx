"use client";

import { ControlStudy, type ControlStudyProps } from "./studies/control-study";

export type CopyConfirmProps = Omit<ControlStudyProps, "variant">;

export function CopyConfirm(props: CopyConfirmProps) {
  return <ControlStudy variant="copy-confirm" {...props} />;
}
