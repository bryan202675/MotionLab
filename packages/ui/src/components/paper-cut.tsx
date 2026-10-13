"use client";

import { TextStudy, type TextStudyProps } from "./studies/text-study";

export type PaperCutProps = Omit<TextStudyProps, "variant">;

export function PaperCut(props: PaperCutProps) {
  return <TextStudy variant="paper-cut" {...props} />;
}
