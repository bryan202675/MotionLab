"use client";

import { ControlStudy, type ControlStudyProps } from "./studies/control-study";

export type StepperControlProps = Omit<ControlStudyProps, "variant">;

export function StepperControl(props: StepperControlProps) {
  return <ControlStudy variant="stepper-control" {...props} />;
}
