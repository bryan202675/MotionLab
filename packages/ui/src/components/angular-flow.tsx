"use client";

import { FieldStudy, type FieldStudyProps } from "./studies/field-study";

export type AngularFlowProps = Omit<FieldStudyProps, "variant">;

export function AngularFlow(props: AngularFlowProps) {
  return <FieldStudy variant="angular-flow" {...props} />;
}
