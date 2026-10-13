"use client";

import { TextStudy, type TextStudyProps } from "./studies/text-study";

export type TypeLatticeProps = Omit<TextStudyProps, "variant">;

export function TypeLattice(props: TypeLatticeProps) {
  return <TextStudy variant="type-lattice" {...props} />;
}
