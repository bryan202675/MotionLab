"use client";

import { LayoutStudy, type LayoutStudyProps } from "./studies/layout-study";

export type BreadcrumbTrailProps = Omit<LayoutStudyProps, "variant">;

export function BreadcrumbTrail(props: BreadcrumbTrailProps) {
  return <LayoutStudy variant="breadcrumb-trail" {...props} />;
}
