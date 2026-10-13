"use client";

import { TextStudy, type TextStudyProps } from "./studies/text-study";

export type AxisCaptionProps = Omit<TextStudyProps, "variant">;

export function AxisCaption(props: AxisCaptionProps) {
  return <TextStudy variant="axis-caption" {...props} />;
}
