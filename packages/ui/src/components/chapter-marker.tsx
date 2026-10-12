"use client";

import { LayoutStudy, type LayoutStudyProps } from "./studies/layout-study";

export type ChapterMarkerProps = Omit<LayoutStudyProps, "variant">;

export function ChapterMarker(props: ChapterMarkerProps) {
  return <LayoutStudy variant="chapter-marker" {...props} />;
}
