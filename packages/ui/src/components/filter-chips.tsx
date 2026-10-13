"use client";

import { LayoutStudy, type LayoutStudyProps } from "./studies/layout-study";

export type FilterChipsProps = Omit<LayoutStudyProps, "variant">;

export function FilterChips(props: FilterChipsProps) {
  return <LayoutStudy variant="filter-chips" {...props} />;
}
