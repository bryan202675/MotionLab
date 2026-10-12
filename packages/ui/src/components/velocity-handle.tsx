"use client";

import { ControlStudy, type ControlStudyProps } from "./studies/control-study";

export type VelocityHandleProps = Omit<ControlStudyProps, "variant">;

export function VelocityHandle(props: VelocityHandleProps) {
  return <ControlStudy variant="velocity-handle" {...props} />;
}
