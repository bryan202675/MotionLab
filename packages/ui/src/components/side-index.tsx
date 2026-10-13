"use client";

import { LayoutStudy, type LayoutStudyProps } from "./studies/layout-study";

export type SideIndexProps = Omit<LayoutStudyProps, "variant">;

export function SideIndex(props: SideIndexProps) {
  return <LayoutStudy variant="side-index" {...props} />;
}
