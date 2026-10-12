"use client";

import { LayoutStudy, type LayoutStudyProps } from "./studies/layout-study";

export type AnchorIndexProps = Omit<LayoutStudyProps, "variant">;

export function AnchorIndex(props: AnchorIndexProps) {
  return <LayoutStudy variant="anchor-index" {...props} />;
}
