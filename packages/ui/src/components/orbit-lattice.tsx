"use client";

import { FieldStudy, type FieldStudyProps } from "./studies/field-study";

export type OrbitLatticeProps = Omit<FieldStudyProps, "variant">;

export function OrbitLattice(props: OrbitLatticeProps) {
  return <FieldStudy variant="orbit-lattice" {...props} />;
}
