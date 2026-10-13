"use client";

import { LayoutStudy, type LayoutStudyProps } from "./studies/layout-study";

export type MenuMatrixProps = Omit<LayoutStudyProps, "variant">;

export function MenuMatrix(props: MenuMatrixProps) {
  return <LayoutStudy variant="menu-matrix" {...props} />;
}
