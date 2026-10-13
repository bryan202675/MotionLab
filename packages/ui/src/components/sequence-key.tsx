"use client";

import { ControlStudy, type ControlStudyProps } from "./studies/control-study";

export type SequenceKeyProps = Omit<ControlStudyProps, "variant">;

export function SequenceKey(props: SequenceKeyProps) {
  return <ControlStudy variant="sequence-key" {...props} />;
}
