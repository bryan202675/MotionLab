"use client";

import { ControlStudy, type ControlStudyProps } from "./studies/control-study";

export type StepDialProps = Omit<ControlStudyProps, "variant">;

export function StepDial(props: StepDialProps) {
  return <ControlStudy variant="step-dial" {...props} />;
}
