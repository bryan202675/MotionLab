"use client";

import { TextStudy, type TextStudyProps } from "./studies/text-study";

export type FoldlineProps = Omit<TextStudyProps, "variant">;

export function Foldline(props: FoldlineProps) {
  return <TextStudy variant="foldline" {...props} />;
}
