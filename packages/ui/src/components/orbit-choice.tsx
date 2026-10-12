"use client";

import { ControlStudy, type ControlStudyProps } from "./studies/control-study";

export type OrbitChoiceProps = Omit<ControlStudyProps, "variant">;

export function OrbitChoice(props: OrbitChoiceProps) {
  return <ControlStudy variant="orbit-choice" {...props} />;
}
