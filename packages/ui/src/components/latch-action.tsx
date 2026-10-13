"use client";

import { ControlStudy, type ControlStudyProps } from "./studies/control-study";

export type LatchActionProps = Omit<ControlStudyProps, "variant">;

export function LatchAction(props: LatchActionProps) {
  return <ControlStudy variant="latch-action" {...props} />;
}
