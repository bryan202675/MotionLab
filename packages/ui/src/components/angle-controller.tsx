"use client";

import { ControlStudy, type ControlStudyProps } from "./studies/control-study";

export type AngleControllerProps = Omit<ControlStudyProps, "variant">;

export function AngleController(props: AngleControllerProps) {
  return <ControlStudy variant="angle-controller" {...props} />;
}
