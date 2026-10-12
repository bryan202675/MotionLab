"use client";

import { FieldStudy, type FieldStudyProps } from "./studies/field-study";

export type RibbonMeshProps = Omit<FieldStudyProps, "variant">;

export function RibbonMesh(props: RibbonMeshProps) {
  return <FieldStudy variant="ribbon-mesh" {...props} />;
}
