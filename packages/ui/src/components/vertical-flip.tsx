"use client";

import { TextStudy, type TextStudyProps } from "./studies/text-study";

export type VerticalFlipProps = Omit<TextStudyProps, "variant">;

export function VerticalFlip(props: VerticalFlipProps) {
  return <TextStudy variant="vertical-flip" {...props} />;
}
