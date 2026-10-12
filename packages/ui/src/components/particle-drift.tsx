"use client";

import { FieldStudy, type FieldStudyProps } from "./studies/field-study";

export type ParticleDriftProps = Omit<FieldStudyProps, "variant">;

export function ParticleDrift(props: ParticleDriftProps) {
  return <FieldStudy variant="particle-drift" {...props} />;
}
