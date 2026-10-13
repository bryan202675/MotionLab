"use client";

import { LayoutStudy, type LayoutStudyProps } from "./studies/layout-study";

export type ScrollChapterProps = Omit<LayoutStudyProps, "variant">;

export function ScrollChapter(props: ScrollChapterProps) {
  return <LayoutStudy variant="scroll-chapter" {...props} />;
}
