"use client";

import { LayoutStudy, type LayoutStudyProps } from "./studies/layout-study";

export type ChapterDotsProps = Omit<LayoutStudyProps, "variant">;

export function ChapterDots(props: ChapterDotsProps) {
  return <LayoutStudy variant="chapter-dots" {...props} />;
}
