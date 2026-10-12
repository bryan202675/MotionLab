"use client";

import { LayoutStudy, type LayoutStudyProps } from "./studies/layout-study";

export type PaginationStripProps = Omit<LayoutStudyProps, "variant">;

export function PaginationStrip(props: PaginationStripProps) {
  return <LayoutStudy variant="pagination-strip" {...props} />;
}
