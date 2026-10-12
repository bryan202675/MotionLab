"use client";

import { TextStudy, type TextStudyProps } from "./studies/text-study";

export type DriftCaptionProps = Omit<TextStudyProps, "variant">;

export function DriftCaption(props: DriftCaptionProps) {
  return <TextStudy variant="drift-caption" {...props} />;
}
